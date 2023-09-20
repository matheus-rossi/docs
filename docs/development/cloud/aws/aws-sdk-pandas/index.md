# Aws Sdk Pandas

## Introduction

Pandas on AWS - Easy integration with Athena, Glue, Redshift, Timestream, Neptune, OpenSearch, QuickSight, Chime, CloudWatchLogs, DynamoDB, EMR, SecretManager, PostgreSQL, MySQL, SQLServer and S3 (Parquet, CSV, JSON and EXCEL).

[Official Docs](https://github.com/aws/aws-sdk-pandas)

## Usage

```python
import pandas as pd
import awswrangler as wr

df = pd.DataFrame(dataframe)

wr.s3.to_parquet(
    df=df,
    path=path,
    dataset=True,
    mode="overwrite"
)
```