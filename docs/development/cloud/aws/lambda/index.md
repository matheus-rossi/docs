# AWS Lambda

## Aws-SDK-Pandas

[Aws-SDK-Pandas](../aws-sdk-pandas/index.md)

## Create

Create the new lambda function and give the rights permissions to the role.

## Configuration
::: TIP
Error: Runtime exited with error: signal: killed Runtime.ExitError

Provide more memory to the lambda function.
:::

::: TIP
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
def hello_world():
    return 'lambda working!'

def lambda_handler(event, context):
    test = hello_world()
    print(test)

    message = 'Hello {} {}!'.format(event['first_name'], event['last_name']) 
    return { 
        'message' : message
    }
```