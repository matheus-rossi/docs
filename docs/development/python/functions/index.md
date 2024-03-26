# Functions
Commonly used functions in Python, working as a data engineer.

::: tip WIP
Work in progress
:::

## List Comprehension

## Dict Comprehension

## Datetime

## Logging

## ZIP

### Unzip Files

```python
import zipfile

# if needed, set password with pwd
with zipfile.ZipFile('./files.zip', 'r') as zip_ref:
    zip_ref.extractall('./extracted', pwd=None)
```
### Zip Files

```python
import shutil

# Destination, Format, Folder
shutil.make_archive('./files_2', 'zip', './to_zip')
```

::: tip
if you need to set password on the zip file see pyminizip
:::


## Yaml
Read yml changing variables to mapped values

```yaml
path: 's3://bucket-$ENV/data'
```

```python
# poetry add PyYAML
import string, yaml

def load_yaml(file_path:str, context=None) -> dict:

    def string_constructot(loader, node):
        t = string.Template(node.value)
        value = t.substitute(context)
        return value
    
    l = yaml.SafeLoader
    l.add_constructor('tag:yaml.org,2002:str', string_constructor)

    token_re = string.Template.pattern
    l.add_implicit_resolver('tag:yaml.org,2002:str', token_re, None)

    with open (file_path, 'r') as file:
        x = yamli.safe_load(file_path)
    
    return x
```

To use it, just declare a dict where the key is the variable to be replaced, and the desired value

```
context = {
    'ENV': 'VALUE'
}

yaml_with_values = load_yaml('./file.yaml', context)
```

## Json

### Read

```python
import json

with open('file_1.json', 'r') as file:
    data = json.load(file)
    print(f"tipo do dado: {type(data)}")
    print('-----')
    print(data)
```

### Save

```python
import json

data = {
    'name': 'Lewis Hamilton',
    'nationality': 'British',
    'team': 'Mercedes'
}

with open('file_2.json', 'w') as file:
    json.dump(data, file)
```

## Csv

### Read

Pure Python, no external libraries.

```python
import csv

with open('file_1.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

### Save
```python
import csv

data = [
    ['name', 'area', 'country_code2', 'country_code3'],
    ['Albania', 28748, 'AL', 'ALB'],
    ['Algeria', 2381741, 'DZ', 'DZA'],
]

with open('file_2.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)
```

## Txt

### Read single line
```python
with open('file.txt', 'r') as file:
    contents = file.read()
    print(contents)
```

### Read multiple lines
```python
with open('file.txt', 'r') as file:
    contents = file.read().splitlines()

    for line in contents:
        print(line)
```

### Write
```python
with open('file.txt', 'w') as file:
    file.write('Hello\nWorld!')
```