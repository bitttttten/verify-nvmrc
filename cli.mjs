#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const message = (...messages) => messages.filter(Boolean).join(" ");
const log = (...messages) => console.log(message(...messages));
const warn = (...messages) => console.warn(message(...messages));

function runCommand(command) {
  try {
    return execSync(command).toString().trim();
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
  }
}

async function birdUp() {
  let directory = path.resolve();
  const { root } = path.parse(directory);

  while (true) {
    try {
      const lookingAt = path.resolve(directory, ".nvmrc");
      const foundPath = await fs.promises.stat(lookingAt);
      const contents = fs.readFileSync(lookingAt, "utf8");

      if (foundPath) {
        return {
          path: lookingAt,
          version: contents.startsWith("v") ? contents : `v${contents}`,
        };
      }
    } catch (e) {
      if (e.code !== "ENOENT") {
        console.error(e);
      }

      directory = path.dirname(directory);

      if (directory === root) {
        return "unknown";
      }
    }
  }
}

async function main() {
  const args = new Set(process.argv);
  const supportEmojis = args.has("-e") || args.has("--emoji");

  const currentNodeVersion = runCommand("node --version");
  const closestNvmrcFile = await birdUp();

  if (args.has("-v") || args.has("--verbose")) {
    log(supportEmojis && "ℹ️", `Current node version ${currentNodeVersion}`);
    if (closestNvmrcFile !== "unknown") {
      log(
        supportEmojis && "ℹ️",
        `Found .nvmrc file with ${closestNvmrcFile.version} at ${closestNvmrcFile.path}`
      );
    }
  }

  if (closestNvmrcFile === "unknown") {
    warn(
      supportEmojis && "🚨",
      "Cannot find an .nvmrc file in this directory or in any it's parent directories"
    );

    return;
  }

  if (currentNodeVersion !== closestNvmrcFile.version) {
    warn(supportEmojis && "🚨", "Node version is NOT correct");

    return;
  }

  log("Node version is correct", supportEmojis && "🎉");
}

main();
