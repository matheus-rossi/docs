# Functions
Commonly used functions in Python, working as a data engineer.

::: tip
Work in progress
:::

## List Comprehension

## Dict Comprehension

## Json

## Yaml

## Datetime

## Multiprocessing

### Threads

Threading is a package that allows us to run multiple threads (tasks, function calls) at the same time. 

```python
from threading import Thread
import os

def square_numbers():
    for i in range(100):
        i * i

threads = []
num_threads = 10

for i in range(num_threads):
    t = Thread(target=square_numbers)
    threads.append(t)

#start
for t in threads:
    t.start()

#join
for t in threads:
    t.join()

print('end main')
```

### Process

Multiprocessing is a package that supports spawning processes using an API similar to the threading module. 

```python
from multiprocessing import Process
import os

def square_numbers():
    for i in range(100):
        i * i

processes = []
num_processes = os.cpu_count()

for i in range(num_processes):
    p = Process(target=square_numbers)
    processes.append(p)

# start
for p in processes:
    p.start()

# join
for p in processes:
    p.join()

print('end main')
```

### Differences

| Api | Number of threads | Number of processes | 
| --- | --- | --- |
| Threading | 10 | 1 |
| Multiprocessing | 1 | 10 |