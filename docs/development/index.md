# Development
::: info
Tools, tips, tricks, studies, guides, etc.
:::

All development related topics are documented here. 
My personal development environment is based on macOS, but most of the tools here can and should be used on linux machines.

## Brew

[Brew - Site](https://brew.sh/)

All steps here documented by default uses brew as a package manager.
Brew is famous in macOS, but can also be installed on linux machines.

![HomeBrew](./brew.png)

### Install Brew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install packages
```bash
brew install package_name
```

### Update packages
```bash
# Upgrade one package
brew upgrade package_name

# Upgrade all packages
brew upgrade
```

### Remove packages
```bash
brew uninstall package_name
```