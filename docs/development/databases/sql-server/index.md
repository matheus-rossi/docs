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

### Considerations

- CDC is disabled by default
- CDC is enabled at database level and at table level
- CDC is enabled for each table individually

### Terms

####  capture instance

A table that contains the changes for a source table

#### LSN

LSN = Log Sequence Number

Every record in the SQL Server transaction log is uniquely identified by a log sequence number (LSN). 

LSNs are ordered such that if LSN2 is greater than LSN1, the change described by the log record referred to by LSN2 occurred after the change described by the log record LSN.

LSN's can be mapped to timestamps using the function `sys.fn_cdc_map_lsn_to_time`

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

get_all function returns one row for each change applied to the source table.

```
<row_filter_option> ::= 
{
     all
     | all update old
}
```

#### fn_cdc_get_net_changes_

Get_net function returns the just the last value of each row, after all changes have been applied to the row.

```
<row_filter_option> ::=  
{ 
     all  
     | all with mask  
     | all with merge  
}
```
#### Operations

function                | delete | insert | update old | update new | merge 
----------------------- | ------ | ------ | ---------- | ---------- | ------
fn_cdc_get_all_changes_ | 1      | 2      | 3          | 4          |  
fn_cdc_get_net_changes_ | 1      | 2      | 3          | 4          | 5


### Query CDC tables

You can use automatically created functions to query CDC tables. For example:

```sql
CREATE PROCEDURE dbo.usp_GetCDCChanges
    @functionName NVARCHAR(100),
    @begin_time_string NVARCHAR(50),
    @end_time_string NVARCHAR(50)
AS
BEGIN
    DECLARE @begin_time DATETIME, @end_time DATETIME, @from_lsn BINARY(10), @to_lsn BINARY(10);

    -- Convert string timestamps to DATETIME
    SET @begin_time = CONVERT(DATETIME, @begin_time_string, 120);
    SET @end_time = CONVERT(DATETIME, @end_time_string, 120);

    -- Map time to LSN
    SET @from_lsn = sys.fn_cdc_map_time_to_lsn('smallest greater than', @begin_time);
    SET @to_lsn = sys.fn_cdc_map_time_to_lsn('largest less than or equal', @end_time);

    -- Execute the dynamic CDC function
    DECLARE @sql NVARCHAR(MAX);
    SET @sql = N'
        SELECT sys.fn_cdc_map_lsn_to_time([__$start_lsn]) as cdc_timestamp,
               *
               FROM cdc.fn_cdc_get_net_changes_' + @functionName + N'(@from_lsn, @to_lsn, ''all with merge'')
          ORDER BY 1 DESC;
    ';

    EXEC sp_executesql @sql, N'@from_lsn BINARY(10), @to_lsn BINARY(10)', @from_lsn, @to_lsn;
END;


EXEC dbo.usp_GetCDCChanges 'dbo_table1', '2023-09-24 00:00:00', '2023-09-25 00:00:00';

```

::: tip
If you are using spark with jdbc, you can't use the procedures. <br>
You need to query the tables directly.
:::

```sql
SELECT sys.fn_cdc_map_lsn_to_time([__$start_lsn]) as CDC_TIMESTAMP, 
	   * 
  from gkoscf.cdc.dbo_table1_CT
 where sys.fn_cdc_map_lsn_to_time([__$start_lsn]) > CONVERT(datetime, '2023-09-27 08:00:00', 120)
```