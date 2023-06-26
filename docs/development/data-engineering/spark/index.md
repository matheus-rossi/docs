# Apache Spark

![Apache Spark](./spark.png)

## Official Documentation

- [Apache Docs](https://spark.apache.org/docs/latest/api/python/reference/index.html)
- [Spark By Examples](https://sparkbyexamples.com/)

## Installation

### Local Installation

#### Step1: Java

Make sure you have Java 8 installed on your machine. If not, you can install it using brew:

```bash
brew install openjdk@8
```

#### Step2: New environment
```bash
poetry new spark-project-name
```

#### Step3: Pyspark dependency

Run steps 3, 4 and 5 inside the environment created by poetry

```bash
poetry shell
```

Then you can install the follwing dependencies:

```bash
poetry add pyspark
```

#### Step4: Install JupyterLab

```bash
poetry add jupyterlab
```

#### Step5: Start JupyterLab

```bash
jupyter-lab
```

#### Step6: Test PySpark

Create a new notebook inside jupyterlab, and run the following code:

### Local Container

Pre-requisites:

- Docker

```bash
docker run -p 8888:8888 jupyter/pyspark-notebook
```

Access the notebook at `http://localhost:8888/` and start coding.

### Spark on Kubernetes
::: tip
Work in progress
:::

## Testing Spark

```python
from pyspark.sql.types import StructType,StructField, StringType, IntegerType
from pyspark.sql import SparkSession

spark = (
    SparkSession
    .builder
    .appName('test')
    .getOrCreate()
)

spark.sparkContext.setLogLevel('WARN')

data = [
    ("James","","Smith","36636","M",3000),
    ("Michael","Rose","","40288","M",4000),
    ("Robert","","Williams","42114","M",4000),
    ("Maria","Anne","Jones","39192","F",4000),
    ("Jen","Mary","Brown","","F",-1)
]

schema = StructType([ \
    StructField("firstname",StringType(),True), \
    StructField("middlename",StringType(),True), \
    StructField("lastname",StringType(),True), \
    StructField("id", StringType(), True), \
    StructField("gender", StringType(), True), \
    StructField("salary", IntegerType(), True) \
])

df = spark.createDataFrame(data=data,schema=schema)

df.printSchema()

df.show(truncate=False)
```

## Useful Links

[Spark Datetime Patterns](https://spark.apache.org/docs/latest/sql-ref-datetime-pattern.html)

## Basic Operations

Basic operations are the most common operations that you will use in your day to day work with Spark.

[Basic Operations](./basic.md)

## Important Concepts

Important concepts that you should know when working with Spark.

[Important Concepts](./concepts.md)

## Optimization

Optimization techniques that you can use to improve the performance of your Spark jobs.

[Optimization](./optimization.md)