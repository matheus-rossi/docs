# Golang

## Install

```bash
brew update&& brew install golang
```

## Setup Workspace

```bash
mkdir -p $HOME/go/{bin,src,pkg}
```

## Setup Environment

We’ll need to add to .bashrc or .zshrc (if you’re using zsh) with the following info. 

`nano ~/.bashrc ` or `nano ~/.zshrc`

```bash
export GOPATH=$HOME/go
export GOROOT="$(brew --prefix golang)/libexec"
export PATH="$PATH:${GOPATH}/bin:${GOROOT}/bin"
```

Reload the shell

`source $HOME/.bashrc` or `source $HOME/.zshrc`