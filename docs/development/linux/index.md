# Linux
::: info
Work in progress
:::

# Useful terminal commands


## wget
```bash
wget --quiet  https://sourceforge.net/projects/pentaho/files/Pentaho-9.2/server/pentaho-server-ce-9.2.0.0-290.zip/download -O pentaho.zip
```

## nohup

Execute process and exit.
    
```bash
nohup ./process.sh &
```

## Ctrl+R (Reverse Search)
Press `Ctrl+R` to search through your command history. Type part of a command to find and reuse it.


## find
Search for files in a directory hierarchy.

```bash
find /path/to/search -name "*.txt"
```

## grep
Search for patterns in files or output.

```bash
grep "pattern" file.txt
grep -r "pattern" /path/to/directory
```

## ps
Display information about active processes.

```bash
ps aux | grep "process_name"
```

## scp

Securely copy files between hosts on a network.

```bash
scp file.txt user@remote:/path/to/destination
```