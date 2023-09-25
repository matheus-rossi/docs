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

### Enable

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

### Testing

First, insert, update or delete some data, then:

```sql
USE [db];

SELECT * FROM [cdc].[dbo_table1_CT];
```
### Jobs

```sql
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
### Useful Commands

```sql
exec sys.sp_cdc_help_change_data_capture

exec sys.sp_cdc_help_jobs

select * from cdc.change_tables

select * from sys.dm_cdc_errors
 
select * from sys.dm_cdc_log_scan_sessions
```

### Procedures

After enabling CDC, some procedures are automatically created:

#### fn_cdc_get_all_changes_

One row for each change.

` <row_filter_option> ::= { all | all update old } `

#### fn_cdc_get_net_changes_

Just the last change.

```
<row_filter_option> ::=  
{ all  
 | all with mask  
 | all with merge  
}
```
#### Operations

function                    | description                         | delete | insert | update old | update new | merge 
--------------------------- | ----------------------------------- | ------ | ------ | ---------- | ---------- | ------
cdc.fn_cdc_get_all_changes_ | one row for each change             | 1      | 2      | 3          | 4          |  
cdc.fn_cdc_get_net_changes_ | just the las change for each row    | 1      | 2      | 3          | 4          | 5


### Query CDC tables

You can use automatically created functions to query CDC tables. For example:

```sql
DECLARE @begin_time DATETIME, @end_time DATETIME, @from_lsn BINARY(10), @to_lsn BINARY(10);

SELECT @begin_time = GETDATE()-1, @end_time = GETDATE();

SET @from_lsn = sys.fn_cdc_map_time_to_lsn('smallest greater than', @begin_time);
SET @to_lsn = sys.fn_cdc_map_time_to_lsn('largest less than or equal', @end_time);

SELECT sys.fn_cdc_map_lsn_to_time([__$start_lsn]), *
  FROM cdc.fn_cdc_get_net_changes_dbo_table1( @from_lsn, @to_lsn, 'all with merge' );
```