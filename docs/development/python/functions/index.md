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

## XML

### Read

```python
import xml.etree.ElementTree as ET
import dicttoxml

# Read XML
tree = ET.parse('file_1.xml')
root = tree.getroot()

# Find all "item" in xml
for elem in root:
    for subelem in elem.findall('item'):
        # if we don't need to know the name of the attribute(s), get the dict     
        # Attributes
        print(subelem.attrib)
        
        # Text
        print(subelem.text)

        # if we know the name of the attribute, access it directly
        print(subelem.get('name'))
```
### Save

First, install the package:

```bash
poerty add dicttoxml
```

```python
import xml.etree.ElementTree as ET
import dicttoxml

# Save XML
data = {
    'name': 'Lewis Hamilton',
    'nationality': 'British',
    'team': 'Mercedes'
}

xml = dicttoxml.dicttoxml(data)

with open("file2.xml", "w") as f:
    f.write(str(xml,"utf-8"))
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