# General Concepts

## Hash 

Hash is a function that takes a string and returns a fixed-length string based on the input.

The output is called a hash value. 

Hash functions are used in hash tables, password hashing, and cryptographic applications.

```bash
$ echo -n "Hello World" | md5sum
```

## Checksum

Checksum is a small-sized datum derived from a block of digital data for the purpose of detecting errors which may have been introduced during its transmission or storage.

It is usually applied to an installation file after it is received from the download server.

```bash
$ sha256sum <file>
```