# Fast Python

::: tip
Best blog about Python concurrency: 

[SuperFastPython](https://superfastpython.com/)
:::

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

#### Thread

* Uses native threads, not a native process.
* Thread belongs to a process.
* Shared memory, not inter-process communication.
* Subject to the GIL, not true parallel execution.
* Suited to IO-bound tasks, not CPU bound tasks.
* Create 10s to 1,000s of threads, not really constrained.

#### Process

* Uses native processes, not native threads.
* Process has threads, and has child processes.
* Heavyweight and slower to start, not lightweight and fast to start.
* Inter-process communication, not shared memory.
* Suited to CPU-bound tasks, probably not IO-bound tasks.
* Create 10s of processes, not 100s or 1,000s of tasks.

## Async

::: info WIP
Work in progress
:::