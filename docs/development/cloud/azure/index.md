# Azure

## Python Office 365 Library

:::tip Important Links
[Github](https://github.com/O365/python-o365)

[Docs](https://o365.github.io/python-o365/latest/api.html)
:::

Interact with all Office 365 services from Python

## Examples

### Sharepoint Access 
```python
from O365 import Account

credentials = ('client_id', 'client_secret')
account = Account(
  credentials,
  auth_flow_type='credentials',
  tenant_id='your_tenant_id.onmicrosoft.com'
)

if account.is_authenticated:
  print('Authenticated')

# Get the Sharepoint site
site_url = 'https://your_tenant_id.sharepoint.com/sites/my-site'
site = account.sharepoint().get_site(site_url)

# Access the Sharepoint site
drive = site.get_default_document_library()
folder = drive.get_item_by_path('Shared Documents/Test')

# list files in the folder
for item in folder:
  print(f'Name: {item.name} - URL: {item.web_url}')
```








