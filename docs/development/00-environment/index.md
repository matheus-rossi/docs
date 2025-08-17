# Environment

## Tools

My environment is a mix of tools and technologies, let's start with the basics.

### Brew

::: tip
If you are using Linux, you can also use homebrew.

If you are using Windows, you can use Windows Subsystem for Linux (WSL).

[Windows Docs](https://learn.microsoft.com/pt-br/windows/wsl/install)
::::

[Brew - Site](https://brew.sh/)

All steps here documented by default uses brew as a package manager.
Brew is famous in macOS, but can also be installed on linux machines, and windows (WSL).

![HomeBrew](./brew.png)

Brew really makes our life easier, installing and updating packages is a breeze.

#### Install Brew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Install packages
```bash
brew install package_name
```

#### Update packages
```bash
# Upgrade one package
brew upgrade package_name

# Upgrade all packages
brew upgrade
```

#### Remove packages
```bash
brew uninstall package_name
```