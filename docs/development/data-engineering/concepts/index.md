# Data Engineering Concepts

## Concepts

Comparing Data Warehouse vs Data Lake vs Data Lakehouse

| Characteristic | Data Warehouse (DW) | Data Lake (DL) | Data Lakehouse (DLW) |
|---|---|---|---|
| **Data Structure** | Structured (Schema-on-Write) | Unstructured/Semi-structured (Schema-on-Read) | Both Structured & Unstructured |
| **Query Performance** | Fast (pre-aggregated, indexed) | Variable (depends on format/size) | Fast (metadata & caching optimized) |
| **Schema Evolution** | Rigid, expensive to change | Flexible, easy to adapt | Flexible with versioning support |
| **Data Quality** | High (enforced at ingestion) | Variable (depends on governance) | High (ACID transactions, validation) |
| **Use Cases** | BI, Reporting, Analytics | Data Science, ML, Exploration | BI, Analytics, ML, Real-time |
| **Scalability** | Vertical (limited) | Horizontal (unlimited) | Horizontal (unlimited) |
| **Governance** | Strong (built-in) | Weak (manual implementation) | Strong (built-in ACID, lineage) |
| **Examples** | Snowflake, Redshift, BigQuery | S3, HDFS, Azure Data Lake | Databricks, Delta Lake, Apache Iceberg |

## Ingestion Flow

```mermaid
flowchart TD
    A[Data Strategy] --> B[List Sources and Volumes]
    B --> C{Sources}
    C --> D[Databases]
    D --> E[Batch]
    E --> JC[JDBC]
    JC --> TB{DB Type}
    TB --> MB[MainDB]
    TB --> RR[Read Replica]
    RR --> LR{Load Type}
    MB --> LR
    LR --> FL[Full]
    LR --> |timestamp_col, CDC| IC[Incremental]
    FL --> BD[Bucket]
    IC --> BD
    BD --> ZNBR[raw]
    D --> F[Realtime]
    F --> CC[CDC]
    CC --> |Debezium, etc| ST[Streaming]
    ST --> |Kafka, Pulsar, etc| BS[Bucket]
    BS --> ZNDR[raw]
    C --> |External Systems| G[Bucket]
    G --> H[Batch]
    G --> I[Realtime]
    H --> |Spark, Polars| ZNB[raw]
    I --> |Spark Streaming | ZNB[raw]
    C --> |External Systems| J[Stream Topics]
    J --> K[Batch]
    J --> L[Realtime]
    K --> |Spark, Pulsar, Flink, etc| ZNS[raw]
    L --> |Kafka, Pulsar, Flink, etc| ZNS
```