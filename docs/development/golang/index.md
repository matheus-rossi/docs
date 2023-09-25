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

## Concurrency

### Goroutines

A goroutine is a lightweight thread managed by the Go runtime.

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")
}
```

### Channels

Channels are a typed conduit through which you can send and receive values with the channel operator, <-.

```go
package main

import (
	"fmt"
	"time"
)

func ping(c chan string) {
	for i := 0; ; i++ {
		c <- "ping"
	}
}

func pong(c chan string) {
	for i := 0; ; i++ {
		c <- "pong"
	}
}

func printer(c chan string) {
	for {
		msg := <-c
		fmt.Println(msg)
		time.Sleep(time.Second * 1)
	}
}

func main() {
	var c chan string = make(chan string)

	go ping(c)
	go pong(c)
	go printer(c)

	var input string
	fmt.Scanln(&input)
}
```

### Select

The select statement lets a goroutine wait on multiple communication operations.

```go
package main

import (
    "fmt"
    "time"
)

func fibonacci(c, quit chan int) {
    x, y := 0, 1
    for {
        select {
        case c <- x:
            x, y = y, x+y
        case <-quit:
            fmt.Println("quit")
            return
        default:
            fmt.Println("    .")
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    c := make(chan int)
    quit := make(chan int)
    go func() {
        for i := 0; i < 10; i++ {
            fmt.Println(<-c)
        }
        quit <- 0
    }()
    fibonacci(c, quit)
}
```