# AWS Lambda

## Aws-SDK-Pandas

Make it easy to use pandas with AWS services.

[Aws-SDK-Pandas](../aws-sdk-pandas/index.md)

## Create

Create the new lambda function and give the rights permissions to the role.

## Configuration
::: tip
Error: Runtime exited with error: signal: killed Runtime.ExitError

Provide more memory to the lambda function.
:::

::: tip
Error: Task timed out after 3.05 seconds

Increase the timeout of the lambda function.
:::

## Development

When using python with lambda, follow this pattern:

1. Python File Name: `lambda_function.py`

2. Invoke Function
```json
{
    "first_name": "John",
    "last_name": "Smith"
}
```

3. Handler Name: `lambda_handler`

```python
def hello(event):
    return message = 'Hello {} {}!'.format(event['first_name'], event['last_name']) 


def lambda_handler(event, context):
    message = hello_world(event)
    print(message)
    
    return { 
        'message' : message
    }
```

## Python Layers

1. Create new local folder

```bash
mkdir python
cd python
```

2. Install desired package

:::tip
Your zip file should have a folder named python with all content inside
:::

```bash
pip3 install --platform manylinux2014_x86_64 --only-binary=:all: --upgrade -t python pyyaml
```

3. Create zip file


```bash
zip -r pandas_layer.zip .
```

4. AWS

Navigate to Lambda > Layers and create a layer. 

Don`t forget to reference the compatibles runtimes, this will help you to add easily your layer to your function.