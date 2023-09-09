# Optimization

## _SUCCESS
::: tip
Ommit _SUCCESS files from being written to S3
:::

- mapreduce.fileoutputcommitter.marksuccessfuljobs = false

## Parameters

- spark.sql.adaptive.enabled = true
- spark.sql.adaptive.coalescePartitions.enabled = true
- spark.sql.adaptive.skewJoin.enabled = true
- spark.sql.adaptive.localShuffleReader.enabled = true
- spark.sql.autoBroadcastJoinThreshold = 100*1024*1024
- spark.sql.join.preferSortMergeJoin = false

- spark.executor.heartbeatInterval
- spark.sql.broadcastTimeout
- spar.default.parallelism

- spark.dynamicAllocation.enabled = true
- spark.dynamicAllocation.executorIdleTimeout
- spark.dynamicAllocation.minExecutors
- spark.dynamicAllocation.initialExecutors
- spark.dynamicAllocation.maxExecutors

## Joins

- Shuffle Hash
- Broadcast Hash
- Sort Merge


