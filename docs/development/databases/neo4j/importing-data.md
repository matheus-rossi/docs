# Importing Data

:::tip TIP
How to choose the better way to ingest data into neo4j...
:::

![Importing Data](./importing-data.png){data-zoomable}
Click on image to zoom

## Data Modeler
:::tip Tool
https://arrows.app/
:::

## Data Importer

The Neo4j Data Importer is a "no-code" tool that facilitates CSV data importing into Neo4j.
Its graphical user interface allows for simple data conversion into nodes and relationships.

## Cypher and LOAD CSV

Cypher has built-in support for importing data from CSV files using the LOAD CSV clause.

```cypher
LOAD CSV WITH HEADERS FROM 'file:///transactions.csv' AS row

MERGE (t:Transactions {id: row.id})
SET
    t.reference = row.reference,
    t.amount = toInteger(row.amount),
    t.timestamp = datetime(row.timestamp)
```

## neo4j-admin

The neo4j-admin import command line interface supports importing large data sets. neo4j-admin import converts CSV files into the internal binary format of Neo4j and can import millions of rows within minutes.

The neo4j-admin import command expects you to format the data in a specific way and requires the database to be offline during the import process.

## ETL (Extract, Transform, Load) Tool

An ETL tool, for example Apache Hop, is a good choice for importing data from multiple sources. ETL tools generally support various data sources, can transform data into the desired format, and have visualization tools.

## Custom integration using Neo4j drivers

Building a custom application to load data into the graph database is a good option if you have complex business rules or need to integrate with other systems. A custom application will allow you complete control over the import process and integration with other systems and data sources.

