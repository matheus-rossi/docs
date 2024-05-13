# Kafka

## Concepts

:::tip
Kafka EcoSystem
:::

![Kafka EcoSysten](kafka-ecosystem.jpg){data-zoomable}

## Kafka Cluster

### Strimzi 

![Strimzi](strimzi_logo.png)

[[Official Docs](https://strimzi.io/)]

## Kafka Connect

### Sources

### Sinks

### Camel Tools

[Official Docs](https://camel.apache.org/camel-kafka-connector/4.0.x/)

## Ksql

:::tip Useful Docs
[Official Docs](https://docs.ksqldb.io/en/latest/) <br>
[Topic Tale](https://topictale.com/ksqldb/how-to-get-started/)
:::


### Queries (Pull vs Push)

### Streams

#### Get Headers

Sometimes, you need to get data from the header of the topic,
to help with that, ksql provides an interesting feature:

```sql
CREATE STREAM IF NOT EXISTS flights_stream (
  flight_id     STRING KEY,
  from_airport STRING,
  to_airport   STRING,
  produced_at  BYTES HEADER('producedAt')
) WITH (
  KAFKA_TOPIC  = 'source_topic',
  VALUE_FORMAT = 'JSON'
);
```

With that you get the header as bytes, that can be decoded in another stream.

```sql
CREATE OR REPLACE 
  flights_stream_decoded 
WITH ( VALUE_FORMAT = 'JSON' )
AS
  SELECT
    flight_id,
    from_airport,
    to_airport,
    FROM_BYTES(produced_at, 'utf-8') as produced_at
  FROM 
    flights_stream;
```

### Tables

### Joins