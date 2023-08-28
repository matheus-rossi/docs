# Airflow Operators

## PostgresOperator

```python
get_birth_date = PostgresOperator(
    task_id="get_birth_date",
    postgres_conn_id="postgres_default",
    sql="sql/birth_date.sql",
    params={"begin_date": "2020-01-01", "end_date": "2020-12-31"},
)
```
And inside your SQL file, you can use the `file` parameter like this:

```sql 
-- dags/sql/birth_date.sql
SELECT *
  FROM pet
 WHERE birth_date BETWEEN SYMMETRIC {{ params.begin_date }} AND {{ params.end_date }};
```

## EMR 

[Airflow EMR Official Docs](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/operators/emr/emr.html#wait-on-an-amazon-emr-job-flow-state)
