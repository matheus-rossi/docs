# Useful packages
![Pyton Packages](./python-packages.jpeg)
## HTTP

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