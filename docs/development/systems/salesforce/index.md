# Salesforce

## Simple-Salesforce

Project Page
[Github](https://github.com/simple-salesforce/simple-salesforce)


### Python Read

```python
from simple_salesforce import Salesforce

import json
import yaml

class SalesForceIngestion:
    def __init__(self) -> None:
        self.domain = 'test'
        self.username = '<USER>'
        self.password = '<PASSWORD>'
        self.security_token = '<SECURITY_TOKEN>'

        self.conn = Salesforce(
            instance_url='https://<ENDPOINT>.sandbox.my.salesforce.com',
            domain=self.domain,
            username=self.username,
            password=self.password,
            security_token=self.security_token
        )

    def _get_table_props(self) -> dict:
        with open('./tables.yml', 'r') as yaml_file:
            data = yaml.safe_load(yaml_file)
        
        return data

    def _crate_soql(self, props:list, incremental_filter:dict = None) -> str:
        fields = ', '.join(props['fields_name'])

        field_to_filter = incremental_filter.get('field', None)
        value_to_filter = incremental_filter.get('value', None)

        if incremental_filter:
            query = f"select { fields } from { props['object_name'] } where { field_to_filter } >= { value_to_filter } "
        else:          
            query = f"select { fields } from { props['object_name'] } "

        return query

    def _get_last_datetime(self, table:str):
        # ToDo
        incremental_filter = {
            'field': 'LastModifiedDate',
            'value': '2024-01-01T00:00:00.000+0000'
        }
        return incremental_filter

    def query_all(self) -> None:
        tables = self._get_table_props()

        for table, props in tables.items():      
            last_datetime = self._get_last_datetime(table)      
            query = self._crate_soql(props, last_datetime)

            dataset = self.conn.query_all(query)

            dataset_name = f"./dataset_json_{table}.json"

            with open(dataset_name, 'w') as json_file:
                json.dump(dataset, json_file, indent=4)


if __name__ == '__main__':

    salesforce = SalesForceIngestion()
    salesforce.query_all()
```

### Example of tables.yml

```yaml
lead:
  object_name: Lead
  incremental: True
  incremental_field: LastModifiedDate
  fields_name: 
    - Id
    - IsDeleted
    - MasterRecordId
    - LastName
    - FirstName
    - Salutation
    - Name
    - RecordTypeId
    - Title
    - Company
    - Street
    - City
    - State
```

## API Access

### Get token

```python
import requests

# Define sensitive data
ENDPOINT = "<YOUR_ENDPOINT>"
CLIENT_ID = "<YOUR_CLIENT_ID>"
CLIENT_SECRET = "<YOUR_CLIENT_SECRET>"
USERNAME = "<YOUR_USERNAME>"
PASSWORD = "<YOUR_PASSWORD>"

# URL for authentication
url = f"https://example.sandbox.my.salesforce.com//services/oauth2/token"

# Payload for authentication request
payload = {
    "grant_type": "password",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "username": USERNAME,
    "password": PASSWORD
}

# Headers for authentication request
headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "insomnia/8.4.5"
}

# Make the authentication request
response = requests.post(url, data=payload, headers=headers)

# Print the response
print(response.text)

```

```json
{
	"access_token": "<TOKEN>",
	"instance_url": "https://example.sandbox.my.salesforce.com",
	"id": "https://test.salesforce.com/idsdfsdfds004NsljYAC",
	"token_type": "Bearer",
	"issued_at": "1705328632217",
	"signature": "fnvlDo8POjWVtMp56aNWptDMZiec3Qf1vE4m5zqv3hk="
}
```

### Use your token to make requests to the api

### Get table info (metadata)

```python
import requests

url = f"https://example.sandbox.my.salesforce.com/services/data/v54.0/sobjects/Lead/describe"

headers = {
    "Authorization": "Bearer your_access_token_here"
}

response = requests.get(url, headers=headers)

print(response.text)

```
### Get Lead Data

```python
import requests

url = "https://example.salesforce.com/services/data/v54.0/query"
query_params = {
    "q": "select FIELDS(ALL) from Lead where LastModifiedDate >= '2023-11-01T00:00:00Z' limit 200"
}

headers = {
    "User-Agent": "Your_User_Agent",
    "Authorization": "Bearer Your_Bearer_Token"
}

response = requests.get(url, headers=headers, params=query_params)

print(response.text)

```