# AWS EMR

## Executors Size

```bash
--conf "spark.yarn.heterogeneousExecutors.enabled=false
```

The reason for allocating larger executors is that since EMR 5.32 and EMR 6.2 there is a Spark option spark.yarn.heterogeneousExecutors.enabled (exists in EMR only, does not exist in OSS Spark) that is set to true by default that combines multiple executor creation requests on the same node into a larger executor container.

So as the result you have fewer executor containers than you expected, each of them has more memory and cores that you specified.

If you disable this option `(--conf "spark.yarn.heterogeneousExecutors.enabled=false")`, EMR will create containers with the specified spark.executor.memory and spark.executor.cores settings and will not coalesce them into larger containers.

## Args

```python
args = [
    'spark-submit',
    '--deploy-mode',
    'cluster',
    '--master',
    'yarn',
    '--conf', 'spark.jars.packages=io.delta:delta-core_2.12:2.2.0',
    '--conf', 'spark.sql.extensions=io.delta.sql.DeltasparkSessionExtension',
    '--conf', 'spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog',  # noqa: E501
    '--conf', 'spark.default.parallelism=32', 
    '--conf', 'spark.sql.sources.partitionOverwriteMode=dynamic',
    '--conf', 'spark.driver.cores=4',
    '--conf', 'spark.driver.memory=9g',
    '--conf', 'spark.driver.memoryOverhead=1g',
    '--conf', 'spark.executor.instances=5',
    '--conf', 'spark.executor.cores=5',
    '--conf', 'spark.executor.memory=9g',
    '--conf', 'spark.executor.memoryOverhead=1g',
    '--conf', 'spark.scheduler.mode=FAIR',
    '--conf', 'spark.serializer=org.apache.spark.serializer.KryoSerializer',
    '--conf', 'spark.kryoserializer.buffer=1024k',
    '--conf', 'spark.kryoserializer.buffer.max=1024m',
    '--conf', 'spark.yarn.heterogeneousExecutors.enabled=false',
    '--py-files', py_files,
    '--files', files,
    f"s3://bucket/{spark_job_filename}",
]
```

## Files

You can pass a yml for example with all your configs and upload it to S3.

```python
files = 's3://bucket/config.yml'
```

## PyFiles

Create a .zip file with all your python files and upload it to S3.

```python
py_files = 's3://bucket/python_files.zip'
```

## Quotas

If you get the following error:

```bash
botocore.exceptions.ClientError: 
An error occurred (ThrottlingException) when calling the DescribeStep operation
(reached max retries: 4): Rate exceeded
```

It may be necessary to increase the quota in aws service quotas.