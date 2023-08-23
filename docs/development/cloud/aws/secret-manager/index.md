# AWS Secret Manager

The AWS Secret Manager is a service that allows you to store and retrieve secrets. 

Secrets are encrypted using KMS.

## Create a secret

## Retrieve a secret

```python
import boto3 
import json
from botocore.exceptions import ClientError

class SecretManager:
    def __init__(self, secret_name:str, region_name:str):
        self.secret_name = secret_name
        self.region_name = region_name
        self.client = boto3.client('secretsmanager', region_name=region_name)

    def get_secret(self):
        try:
            get_secret_value_response = self.client.get_secret_value(
                SecretId=self.secret_name
            )
        except ClientError as e:
            # For a list of exceptions thrown, see
            # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
            raise e

        secret = get_secret_value_response['SecretString']
        # if data is json
        # secret = json.loads(get_secret_value_response['SecretString'])

        return secret
    
    def create_secret(self, secret:str):
        try:
            create_secret_response = self.client.create_secret(
                Name=self.secret_name,
                SecretString=secret
            )
        except ClientError as e:
            # For a list of exceptions thrown, see
            # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_CreateSecret.html
            raise e

        return create_secret_response
```