# Spark Helpers

## Verify is path exists

```python
def path_exists(path, spark:SparkSession):
    """
    Verify if path exists in S3
    """
    sc = spark.sparkContext
    fs = sc._jvm.org.apache.hadoop.fs.FileSystem.get(
        sc._jvm.java.net.URI.create("s3://" + path.split("/")[2]),
        sc._jsc.hadoopConfiguration(),
    )
    return fs.exists(sc._jvm.org.apache.hadoop.fs.Path(path))
```

## List all files inside bucket
```python
def get_files(spark:SparkSession, path:str):
    """
    List all files inside the provided path
    """

    files = spark.sparkContext._jvm.org.apache.hadoop.fs.FileSystem.get(
        spark.sparkContext._jvm.jaba.net.URI.create(path),
        spark.sparkContext._jsc.hadoopConfiguration()
    ).listStatus(spark.sparkContext._jvm.org.apache.hadoop.fs.Path(path))

    files_list = []
    for file in files:
        files_list.append(file.getPath().getName())
    
    return files_list
```

## Generate list of partitions to read

```python
def create_date_list(begin_date:str ,end_date:str ):
    begin_date_obj = datetime.strptime(begin_date, '%y/%m/%d %H:%M:%S')
    end_date_obj = datetime.strptime(end_date, '%y/%m/%d %H:%M:%S')
    
    date_list = []
    date_time = begin_date_obj

    while date_time < end_date_obj:
        date_list.append(date_time)
        date_time += timedelta(hours=1)
    
    return date_list

def create_spark_load_list(spark:SparkSession, basePath:str, date_list:list):
    list = []

    for date in date_list:
        load_path = f"{basePath}year={date.year}/month={date.month:02d}/day={date.day:02d}/hour={date.hour:02d}/"
        load_path_exists = path_exists(load_path, spark)
        
        if load_path_exists:
            list.append(load_path)

    return list

def get_data(spark:SparkSession, base_path:str, date_list_load_path:list):
    """
    Carrega Dataframe filtrando os dados do bucket de referência conforme 
    lista de paths a serem carregados
    """
    df = ( 
        spark.read
            .format('json')
            .option('basePath', base_path)
            .load(date_list_load_path)
    )

    return df

# list of datetimes to import
date_list_to_import = create_date_list('BEGIN_DATE', 'END_DATE')

# list of paths to spark .load()
date_list_load_path = create_spark_load_list(spark, 'base_path', date_list_to_import)

logger.info('Reading landing data')
df_table = get_data(spark, 'base_path', date_list_load_path)

```

## Rename all columns

```python
df = df.select(
    [ F.col(c).alias('prefix' + c + 'suffix') for c in df.columns ]
)
```