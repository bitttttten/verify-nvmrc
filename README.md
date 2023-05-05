# verify-nvmrc

Script to help verify that the loaded node version matches what is set in the the closest .nvmrc file.

## Usage

You can run this script through `npx`.

```sh
npx verify-nvmrc
# Node version is correct
```

## Options

- `-e, --emoji`

Supports emojis.

- `-v, --verbose`

Logs out where it found the nvmrc file, if one is present. And logs out current node version.

- `-f, --fail`

Process exits with code 1 if node version mismatch.

```sh
npx verify-nvmrc -e -v
# ℹ️ Current node version v14.15.4
# ℹ️ Found .nvmrc file with v14.15.4 at /Users/bitttttten/github.com/verify-nvmrc/.nvmrc
# Node version is correct 🎉
```

## Caveats

Kind of ironically only supports node v12 and above since this script uses ES modules (for now, feel free to open a PR). To run with node v10, you should enable support for ES modules with the `--experimental-modules` flag: `npx verify-nvmrc --experimental-modules`. For node v8 and below, feel free to open a PR until a version of the script has been written that is v8 compatible.
