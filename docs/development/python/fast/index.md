# Fast Python

::: tip
Best blog about Python concurrency: 

[SuperFastPython](https://superfastpython.com/)
:::

## What to use?

| Feature                            | Processes             | Threads              | Async                 |
|------------------------------------|-----------------------|----------------------|-----------------------|
| Optimize waiting periods           | Yes (preemptive)      | Yes (preemptive)     | Yes (cooperative)     |
| Use all CPU cores                  | Yes                   | No                   | No                    |
| Scalability                        | Low (ones/tens)       | Medium (hundreds)    | High (thousands+)     |
| Use blocking std library functions | Yes                   | Yes                  | No                    |
| GIL interference                   | No                    | Some                 | No                    |


```python
if io_bound:
    if io_very_slow:
        print("Use Asyncio")
    else:
        print("Use Threads")
else:
    print("Multi Processing")
```

## Multithreading

Threading is a package that allows us to run multiple threads (tasks, function calls) at the same time. 

```python
import logging
from time import sleep
from concurrent.futures import ThreadPoolExecutor

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

tables = {
  'A': 1,
  'B': 2,
  'C': 5
}

def load_data(table):
    table_name = table[0]
    time_to_process = table[1]
    logging.info(f"Loading data from { table_name }")
    logging.info(f"Task will take { time_to_process } seconds")
    sleep(time_to_process)
    return time_to_process

with ThreadPoolExecutor() as executor:
    futures = [executor.submit(load_data, table) for table in tables.items()]
    results = [future.result() for future in futures]
    logging.info(results)
```

### Process

Multiprocessing is a package that supports spawning processes using an API similar to the threading module. 

```python
import os
import logging
from time import sleep
from concurrent.futures import ProcessPoolExecutor, as_completed

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def square_numbers(process_number):

    total = 0
    for i in range(100000000):
        total += i * i
    
    logging.info(f'Finished Process N {process_number}')
    return total


if __name__ == '__main__':
    num_processes = os.cpu_count()

    with ProcessPoolExecutor() as executor:
        # Submit tasks and store the Future objects
        futures = [executor.submit(square_numbers, i) for i in range(num_processes)]
        
        # Collect results as they complete
        results = []
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
            logging.info(f'Received result: {result}')

    # All results are now available
    logging.info(f'All results: {results}')
    logging.info(f'Sum of all results: {sum(results)}')
```

## Asyncio

Asyncio is a package that allows us to run multiple tasks at the same time.

```python
import asyncio
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

async def async_task(task_id, delay):
    logging.info(f"Task {task_id} starting")
    
    await asyncio.sleep(delay)
    logging.info(f"Task {task_id} completed after {delay} seconds")
    
    return delay

async def main():
    tasks = [
        async_task('A', 2),
        async_task('B', 1),
        async_task('C', 3)
    ]
    results = await asyncio.gather(*tasks)
    logging.info(f"All tasks completed. Results: {results}")

if __name__ == '__main__':
    asyncio.run(main())

```