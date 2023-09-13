# SQL Server

## CDC - Change Data Capture

Change Data Capture (CDC) is a feature that records insert, update, and delete activity applied to a SQL Server table. The SQL Server Database Engine uses the SQL Server log to track changes to user tables. 

CDC uses this information to record changes in an easily consumed relational format. The change tables used by CDC contain columns that mirror the column structure of a tracked source table, along with the metadata needed to understand the changes that have occurred.

### Versions Supported

| SqlServer | Version | Support for CDC |
| --------- | ------- | --------------- |
| Actual    | Standard     | Yes             |
| 2019      | Standard     | Yes             |
| 2017      | Standard     | Yes             |
| 2016      | Standard Sp1 | Yes             |
| 2014      | Enterprise   | Yes             |
| 2012      | Enterprise   | Yes             |

### How to enable CDC

### Database Level

First check if CDC is enabled

```sql
USE [db];

SELECT database_id,
       name,
       is_cdc_enabled
  FROM sys.databases;
```

Than, you can activate CDC at database level

```sql
USE [db];

EXEC sys.sp_cdc_enable_db;
```

### Table Level

Check if CDC is enabled for a table

```sql
USE [db];
SELECT s.name as 'schema',
       tb.name as 'table',
       tb.object_id,
       tb.type,
       tb.type_desc,
       tb.is_tracked_by_cdc
  FROM sys.tables tb
 INNER JOIN sys.schemas s
    ON s.schema_id = tb.schema_id
 WHERE tb.is_tracked_by_cdc = 1;
```

Enable CDC for a table

```sql
USE [db];

EXEC sys.sp_cdc_enable_table
     @source_schema = N'dbo',
     @source_name = N'table1',
     @role_name = NULL,
     @filegroup_name = N'PRIMARY'
```

Disable CDC for a table

```sql
USE [db];

EXEC sys.sp_cdc_disable_table
     @source_schema = N'dbo',
     @source_name = N'table1',
     @capture_instance = N'dbo_table1';
```

### Testing CDC

First, insert, update or delete some data, then:

```sql
USE [db];

SELECT * FROM [cdc].[dbo_table1_CT];
```
### Jobs

```sql
USE [dbo];
SELECT * FROM msdb.dbo.cdc_jobs;
```

### Retention Period

The default retention period is 3 days. You can change it to 07 days, for example:


```sql
USE [db];

EXEC sys.sp_cdc_change_job
     @job_type = N'cleanup',
     @retention = 10080;
```
