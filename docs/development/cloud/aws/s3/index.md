# S3

## Object Storage

S3 is a simple object storage service that can be used to store and retrieve any amount of data, at any time, from anywhere on the web. It is designed to deliver 99.999999999% durability, and scale past trillions of objects worldwide.

## Install

```bash
pip install boto3
```

## Download One File

* Bucket='bucket-name': This specifies the name of the S3 bucket from which you want to download the file.
* Key=f'path/to/file.txt': This specifies the object (file) key in the S3 bucket.
* Filename=f'/tmp/file.txt': This specifies the local file path where the downloaded file will be saved.

```python
import boto3

s3_client = boto3.client('s3')

s3_client.download_file(
    Bucket='bucket-name',
    Key=f'path/to/file.txt',
    Filename=f'/tmp/file.txt'
)
```