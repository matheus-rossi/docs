# Redshift

## Delta to Redshift

![Delta and Redshift](./redshift-delta.png)

## Create table

## Parquet to Redshift

```python
    def spark_to_redshift_type(self, spark_type:str):
        """
        - Convert spark type to redshift type
        """

        mapping = {
            "ByteType": "SMALLINT",
            "ShortType": "SMALLINT",
            "IntegerType": "INTEGER",
            "LongType": "BIGINT",
            "FloatType": "REAL",
            "DoubleType": "DOUBLE PRECISION",
            "DecimalType": "DECIMAL",
            "StringType": "VARCHAR",
            "BinaryType": "BYTEA",
            "BooleanType": "BOOLEAN",
            "TimestampType": "TIMESTAMP",
            "DateType": "DATE",
        }

        return mapping.get(spark_type, "VARCHAR")

    def generate_redshift_create_table(self, df: DataFrame, table_name: str) -> str:
        schema = df.schema
        columns = []
        for field in schema.fields:
            redshift_type = self.spark_to_redshift_type(field.dataType.typeName())
            columns.append(f"{field.name} {redshift_type}")
        columns_str = ", ".join(columns)
        create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_str});"

        logging.warning(f"create_table_sql: {create_table_sql}")
        return create_table_sql

    def execute_redshift_query(self, query: str, redshift_credentials: dict):
        conn = psycopg2.connect(
            dbname=redshift_credentials["dbname"],
            user=redshift_credentials["user"],
            password=redshift_credentials["password"],
            host=redshift_credentials["host"],
            port=redshift_credentials["port"],
        )
        with conn.cursor() as cursor:
            cursor.execute(query)
        conn.commit()
        conn.close()
```
And just use it like:

```python
schema_table = schema + "." + table_name
create_table_sql = self.generate_redshift_create_table(df, schema_table)
self.execute_redshift_query(create_table_sql, self.redshift_credentials)
```
