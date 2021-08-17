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

```sh
npx verify-nvmrc -e -v
# ℹ️ Current node version v14.15.4
# ℹ️ Found .nvmrc file with v14.15.4 at /Users/bitttttten/github.com/verify-nvmrc/.nvmrc
# Node version is correct 🎉
```
