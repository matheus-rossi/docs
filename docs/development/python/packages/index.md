# Useful packages

![Pyton Packages](./python-packages.jpeg)

## Data Processing

### Pandas

![Pandas](./pandas.png)

[Pandas Site](https://pandas.pydata.org/)

Probably the most popular Python library for data science and analytics, if working with data, you’ll most likely be using pandas somewhere along the line.

### Polars

::: tip
Worth learning if you are working with large datasets, but do not want to use PySpark.
:::

![Polars](./polars.png)

[Polars Site](https://www.pola.rs/)

Polars is a blazingly fast DataFrames library implemented in Rust and based on Apache Arrow, but has bindings to Python.

It is designed for speed and space-efficiency.

The new standard for DataFrames in Python (according to the docs).

### PySpark

![PySpark](./pyspark.png)

See apache spark section to learn more.

[PySpark Section](../../data-engineering/spark/index.md)

## Scheduling

### Rocketry

![Rocketry](./rocketry.png)

[Official Docs](https://rocketry.readthedocs.io/en/stable/)

### Airflow

![Airflow](../../data-engineering/airflow/airflow.png)

Airflow™ is a platform created by the community to programmatically author, schedule and monitor workflows.

See the [Airflow Section](../../data-engineering/airflow/index.md) to learn more.

## Http

![HTTP](./http.png)

### Sync - requests

Requests allows you to send HTTP/1.1 requests extremely easily.

There’s no need to manually add query strings to your URLs, or to form-encode your PUT & POST data — but nowadays, just use the json method!

[Docs](https://requests.readthedocs.io/en/latest/)

```bash
poetry add requests
```

Sync Example
```python
import requests

x = requests.get('https://w3schools.com/python/demopage.htm')

print(x.text)
```
### Async - httpx

HTTPX is a fully featured HTTP client for Python 3, which provides sync and async APIs, and support for both HTTP/1.1 and HTTP/2.

[Docs](https://www.python-httpx.org/)

```bash
poetry add httpx
```

Async Example

```python
async with httpx.AsyncClient() as client:
    r = await client.get('https://www.example.com/')

r 
<Response [200 OK]>
```

## YAML

### PyYAML

![PyYAML](./pyyaml.png)

[PyYAML - Docs](https://pyyaml.org/wiki/PyYAMLDocumentation)

#### Read

```python
import yaml

with open('file.yaml') as f:
    try:
        data = yaml.load(f, Loader=yaml.FullLoader)
        print(data)
    except Exception as e:
        print(e)
```

#### Write

```python
import yaml

data = {
    'list': [1, 42, 3.141, 1337, 'help'],
    'string': 'bla',
    'dict': {
        'foo': 'bar',
        'key': 'value',
        'bar': 50
    }
}

with open("file_3.yaml", "w") as f:
    yaml.dump(data, f)
```

## SFTP

### Paramiko

![Paramiko](./paramiko.png)

[Paramiko - Docs](http://www.paramiko.org/)

Paramiko is a pure python implementation of the SSHv2 protocol, providing both client and server functionality.

Main use cases are:

* controlling an SSH server
* transferring files with SFTP

## AWS

### SDK

![AWS](./aws.png)

To interact with AWS services, you can use the boto3 library.

```python
# Add boto3 to your environment
poetry add boto3
```

[Official Docs](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)

## Data Apps

### Streamlit

![Streamlit](./streamlit.png)

Streamlit turns data scripts into shareable web apps in minutes.
All in pure Python. No front‑end experience required.

[Streamlit - Site](https://streamlit.io/)