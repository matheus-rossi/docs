# Postgresql

## Docker Compose
    
```yaml
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_PASSWORD: "postgres"
    ports:
      - "5432:5432"
```

::: tip
user: postgres

password: postgres
:::

## K8s Operator

![CloudNativePG](./logo.png)

The best way to deploy a database on k8s, including best practices and backup.

[CloudNativePG](https://cloudnative-pg.io/)

## Partition on String Column

```sql
with cte as (
select abs(mod(hashtext("COLUMN"),5)) as partition_group,
	   *
  from people
)
select count(partition_group), partition_group 
  from cte 
 group by partition_group
 order by 2
```

Result on 2 milion rows and 5 partitions:

|count|partition_group|
|-----|---|
|400535|0|
|399090|1|
|400691|2|
|400376|3|
|399308|4|
