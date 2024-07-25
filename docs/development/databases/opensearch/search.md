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
:::tip
Engine and Methods recommendations.

[OpenSearch Docs](https://opensearch.org/docs/latest/search-plugins/vector-search/#engine-recommendations)
:::

### Create

```python
document_body_vector = {
  "settings": {
    "index": {
      "knn": True,
      "knn.algo_param.ef_search": 100
    }
  },
  "mappings": {
    "properties": {
      "embedding": {
        "type": "knn_vector",
        "dimension": 1536, # embedding model size
        "method": {
          "name": "hnsw",
          "space_type": "l2",
          "engine": "nmslib",
          "parameters": {
            "ef_construction": 128,
            "m": 24
          }
        }
      }
    }
  }
}

try:
    response = client.indices.create(
        index='INDEX_NAME',
        body=document_body_vector
    )
    print(f"Created index: {response}")
except Exception as e:
    print(f"Error creating index: {e}")
```

### Insert

Example:

```python
_embeddings = {
    "cat": embeddings.embed_query("cat"),
    "tiger": embeddings.embed_query("tiger"),
    "dog": embeddings.embed_query("dog"),
    "train": embeddings.embed_query("train"),
    "airplane": embeddings.embed_query("airplane")
}

documents = [
    {"name": "cat", "embedding": _embeddings["cat"]},
    {"name": "tiger", "embedding": _embeddings["tiger"]},
    {"name": "dog", "embedding": _embeddings["dog"]},
    {"name": "train", "embedding": _embeddings["train"]},
    {"name": "airplane", "embedding": _embeddings["airplane"]}
]

try:
    for doc in documents:
        response = client.index(
            index='zoomcamp-db-vector',
            body=doc,
            refresh=True
        )
        print(f"Indexed document ID: {response['_id']}")
except Exception as e:
    print(f"Error indexing document: {e}")
```

### Query

```python
query_vector = documents[0].get('embedding') # your vector to use in similarity search

# k-NN search request
knn_search_query = {
  "size": 5,
  "query": {
    "knn": {
      "embedding": {
        "vector": query_vector,
        "k": 3
      }
    }
  }
}

try:
    response = client.search(
        index='zoomcamp-db-vector',
        body=knn_search_query
    )
    for hit in response['hits']['hits']:
        print(f"Document ID: {hit['_id']}, Score: {hit['_score']}, Name: {hit['_source']['name']}")
except Exception as e:
    print(f"Error during k-NN search: {e}")
```

## K-NN Search

## Neural Search

## Semantic Search

## Multimodal Search

## Neural Sparse Search

## Hybrid Search