# Search In OpenSearch
::: tip WIP
Work In Progress
:::

## Keyword Search
### Match
Use the match query for full-text search on a specific document field. If you run a match query on a text field, the match query analyzes the provided search string and returns documents that match any of the string’s terms.

```python
q = 'parquet'

query = {
  "size": 2,
  "query": {
    "match": {
      "question": q
    }
  }
}

response = client.search(
    body = query,
    index = 'zoomcamp-db'
)

documents = response.get('hits').get('hits')
documents
```

### Multimatch
A multi-match operation functions similarly to the match operation. You can use a multi_match query to search multiple fields.

The ^ “boosts” certain fields. Boosts are multipliers that weigh matches in one field more heavily than matches in other fields. In the following example, a match for “parquet” in the question field influences _score four times as much as a match in the answer field:

```python
q = 'parquet'
query = {
  'size': 5,
  'query': {
    'multi_match': {
      'query': q,
      'fields': ['question^4', 'answer']
    }
  }
}

response = client.search(
    body = query,
    index = 'zoomcamp-db'
)

documents = response.get('hits').get('hits')
documents
```

## Vector Search

## K-NN Search

## Neural Search

## Semantic Search

## Multimodal Search

## Neural Sparse Search

## Hybrid Search