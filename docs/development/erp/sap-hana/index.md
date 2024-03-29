# SAP HANA

## SAP DataSheet
::: info
[SAP HANA DataSheet](https://www.sapdatasheet.org/) 🎯
:::

## JDBC params

```python
self.source = "jdbc:sap://SERVER:PORT/?reconnect=TRUE&connectTimeout=0&communicationTimeout=0" 
```

## SQL Guide

List of all avaliable sql functions in SAP HANA.

[Official Docs](https://help.sap.com/docs/HANA_SERVICE_CF/7c78579ce9b14a669c1f3295b0d8ca16/f12b86a6284c4aeeb449e57eb5dd3ebd.html)

## Get Column Names

Select all columns from a table

```sql
SELECT *
  FROM M_CS_ALL_COLUMNS
 WHERE TABLE_NAME = 'TABLE_NAME'
   AND SCHEMA_NAME ='SCHEMA_NAME';
```

## Get primary key

```sql
SELECT * 
  FROM index_columns 
 WHERE schema_name = 'SCHEMA_NAME' 
   AND table_name = 'TABLE_NAME'
   AND CONSTRAINT = 'PRIMARY KEY'
```

## Internal SAP Columns

When ever a table is created in HANA, hana internally adds its own 3 columns to HANA internal purposes which we generally do not use in normal queries and also does not it gets displayed with normal “select * from <table_name>” query.

```sql

SELECT ("$rowid$") AS "rowid",
       ("$trex_udiv$") AS "trex_udiv",
       ("$trexexternalkey$") AS "trexexternalkey",
		   *
  FROM TABLE
```

More info: [SAP HANA Community Docs](https://blogs.sap.com/2020/09/13/hanas-default-internal-columns-per-tables/)

### $rowid$

Returns the internal row ID value for each row of the table. Whenever any new row is inserted in a Hana table new unique numeric ID is internally assigned to that row. This id is not available in the table in the form of any column, so we need to use $rowid$ function to see the id generated for each row in that table.

Can be used to perform DELTA reads from the table

More info: [SAP HANA Community Docs](https://blogs.sap.com/2023/03/12/rowid-function-in-hana/)

### $trex_udiv$

Just like row_number, but native. 

::: warning
Can't be used in spark JDBC partitioning
:::

### $trexexternalkey$

A unique key for each row in the table. Concatenates the values and size of all columns in the table.

Not available in all tables.


## Useful tables

```sql
SELECT IFNULL(CONSTRAINT,'NUNIQUE'),
       INDEX_NAME,COLUMN_NAME
  FROM INDEX_COLUMNS WHERE SCHEMA_NAME = '%s'
   AND TABLE_NAME = '%s'
ORDER BY INDEX_OID,POSITION

select * from TABLES;
select * from M_TABLES;
select * from M_CS_TABLES;
select * from M_RS_TABLES;
select * from TABLE_COLUMNS;
select * from M_CS_ALL_COLUMNS;
select * from M_TEMPORARY_TABLES;
```