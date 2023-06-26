# Apache Spark

![Apache Spark](./spark.png)

## Official Documentation

- [Apache Docs](https://spark.apache.org/docs/latest/api/python/reference/index.html)
- [Spark By Examples](https://sparkbyexamples.com/)

## Local Installation

### Step1: Java

Make sure you have Java 8 installed on your machine. If not, you can install it using brew:

```bash
brew install openjdk@8
```

### Step2: New environment
```bash
poetry new spark-project-name
```

### Step3: Pyspark dependency

Run steps 3, 4 and 5 inside the environment created by poetry

```bash
poetry shell
```

Then you can install the follwing dependencies:

```bash
poetry add pyspark
```

### Step4: Install JupyterLab

```bash
poetry add jupyterlab
```

### Step5: Start JupyterLab

```bash
jupyter-lab
```

### Step6: Test PySpark

Create a new notebook inside jupyterlab, and run the following code:

## Local Container

Pre-requisites:

- Docker

```bash
docker run -p 8888:8888 jupyter/pyspark-notebook
```

Access the notebook at `http://localhost:8888/` and start coding.

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

## Basic Operations

### Init 

The follwing code provides the installation of packages avro and delta. If you do not need them, you can remove them.

```python
# Import SparkSession
from pyspark.sql import SparkSession

# Create SparkSession 
spark = ( 
    SparkSession
    .builder
    .master("local[*]")
    .config("spark.jars.packages", "org.apache.spark:spark-avro_2.12:3.3.1")
    .config("spark.jars.packages", "io.delta:delta-core_2.12:2.1.0")
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")
    .getOrCreate() 
)
```

### Read

#### CSV

```python
df_csv = ( spark
	.read
    .option('delimiter', ';')
    .option('header', 'true')
    .option('inferSchema', 'true')
	.option('encoding', 'ISO-8859-1')
    .csv('data/filename.csv')
)
```

#### JSON

```python
df_json = (
    spark
    .read
    .json('data/filename.json')
)
```

#### Parquet

```python
df_parquet = (
    spark
    .read
    .parquet('data/parquet/')
)
```

#### Delta

```python
df_delta = (
    spark
    .read
    .format('delta')
    .load('data/delta/')
)
```

#### Avro

```python
# avro schema
schema = open('./data/avro/userdata.avsc', 'r').read()

df_avro = ( 
    spark
    .read
	.format('avro')
    .option('avroSchema', schema)
    .load('data/avro/*')
)
```

#### ORC

```python
df_orc = (
    spark
    .read
    .orc('./data/orc/')
)
```

#### JDBC

##### Simple JDBC:

```python
table = (
    spark
    .read
    .format("jdbc")
    .option("url", "<jdbc-url>")
    .option("dbtable", "<table-name>")
    .option("user", "<username>")
    .option("password", "<password>")
    .load()
)
```

##### Complex JDBC:

By default, Spark will store the data read from the JDBC connection in a single partition. As a consequence, only one executor in the cluster is used for the reading process. To increase the number of nodes reading in parallel, the data needs to be partitioned by passing all of the following four options:

- `partitioningColumn` determines which table column will be used to split the data into partitions. The data type of partitioning column needs to be `NUMERIC`, `DATE`or `TIMESTAMP`.
- `numPartitions` sets the desired number of partitions.
- `lowerBound` and `upperBound` are used to calculate the partition boundaries.

Under the hood, Spark will generate a SQL query for each partition with an individual filter on the partitioning column. The diagram below illustrates how data is divided into four partitions using the options above:

![JDBC Partitioning](./jdbc-partitioning.png)

###### Partitioning example:

Change COLUMN_NAME and TABLE_NAME to your values.

```python
query_min_max = f"""
SELECT Min(COLUMN_NAME),
       Max(COLUMN_NAME)
  FROM TABLE_NAME s
"""

# Determine min and maximum values
df_min_max = spark.read.jdbc(
    url="jdbc:postgresql://db/postgres",
    table=f"({query_min_max}) t ",
    properties=connection_properties,
).collect()

min, max = df_min_max[0][0], df_min_max[0][1]

query = """
SELECT category, value
  FROM TABLE_NAME
"""

# Partition the data
df = (
    spark
    .read
    .option("numPartitions", 30)
    .option("partitionColumn", "category")
    .option("lowerBound", min)
    .option("upperBound", max)
    .jdbc(
        url="jdbc:postgresql://db/postgres",
        table=f"({query}) t ",
        properties=connection_properties,
    )
)
```

### Process

#### Basic functions:

```python
# Show schema
dataframe.printSchema()

# Show first rows
# arg1 - number of rows
# arg2 - truncate column values
# arg3 - show dataframe in vertical orientation
dataframe.show(20, truncate=False, vertical=True) 

# Number of rows
dataframe.count()

# Number of columns
len(dataframe.columns)
```

### Join

```python
# Join two dataframes
(
    table1
    .join(
        table2, 
        ( table1['user_id'] == table2['user_id'] )
        &
        ( table1['company_id'] == table2['company_id'] ),
        'inner'
    )
    .show(5)
)
```

### SparkSQL

How to run SQL queries on spark dataframes:

```python
# Create or replace view to use SQL
dataframe.createOrReplaceTempView('dataframe')

# Spark SQL Example
spark.sql("""
    SELECT COLUMN_NAME,
           COLUMN_NAME2
      FROM dataframe
     LIMIT 5
""").show()

# Drop view after usage
spark.catalog.dropTempView('dataframe')
```