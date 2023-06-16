# Git
![Git](./git.png)

Free and open source distributed version control system.

[GIT - Docs](git/index.md)

## Install
```bash
brew install git
```

## Global properties

```bash
git config --global user.email "YOUR_EMAIL_HERE"
git config --global user.name "YOUR_NAME_HERE"
```

## Basic commands

```bash
# List branchs
git branch --list

# Create new branch
git branch <nome-do-branch>

# Change to desired branch
git checkout <nome-do-branch>

# Create new branch and change to it
git checkout -b <nome-do-branch>

# Push commits to remote branch
git push origin <nome-do-branch>

# Delete local branch
git branch -d <nome-do-branch>
```

### GitHub - CLI

```bash
# Install GitHub CLI
brew install --cask github

# Login into github
gh auth login

# Exit github account
gh auth logout
```