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


## Text Search in PostgreSQL

PostgreSQL provides powerful text search capabilities that allow you to search for words and phrases in text documents. Here are the first steps to get started with text search.

### How It Works

PostgreSQL's text search functionality is built on the concept of full-text indexing.

1. **Tokenization**: When you insert text into a `tsvector` column, PostgreSQL breaks the text into tokens (words) and removes common stop words (like "the", "is", etc.) that are not useful for searching.

2. **Stemming**: The text is then processed to reduce words to their base or root form. For example, "running" and "run" would be treated as the same word. This allows for more flexible searching.

3. **Indexing**: The `tsvector` type creates an inverted index, which allows for fast searching. This index maps each unique word to the documents that contain it, making searches efficient.

4. **Querying**: You can perform searches using the `@@` operator with `tsquery`, which allows you to specify the terms you want to search for. The query is processed similarly, where it is tokenized and stemmed before matching against the indexed `tsvector`.

5. **Ranking**: PostgreSQL can also rank the results based on relevance, allowing you to retrieve the most pertinent documents first.

By leveraging these features, PostgreSQL provides a robust solution for searching large volumes of text efficiently.

### Basic Setup

To use text search, you can create a table with a text column and then use the `tsvector` type for indexing.

```sql
CREATE TABLE documents (
    id serial PRIMARY KEY,
    content text,
    tsv_content tsvector
);

-- Populate the table
INSERT INTO documents (content, tsv_content) VALUES
('PostgreSQL is a powerful database system.', to_tsvector('PostgreSQL is a powerful database system.')),
('Text search is very useful.', to_tsvector('Text search is very useful.'));
```

### Searching

You can perform a search using the `@@` operator.

```sql
SELECT * FROM documents WHERE tsv_content @@ to_tsquery('powerful');
```

This query will return documents that contain the word "powerful".

### Full-Text Search Example

You can also use `plainto_tsquery` for more natural language queries.

```sql
SELECT * FROM documents WHERE tsv_content @@ plainto_tsquery('text search');
```

This will match documents containing the words "text" and "search".
