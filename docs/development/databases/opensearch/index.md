# OpenSearch

![Open Search Logo](./os-logo.png)

OpenSearch is the flexible, scalable, open-source way to build solutions for data-intensive applications. 
Explore, enrich, and visualize your data with built-in performance, developer-friendly tools, and powerful integrations for machine learning, data processing, and more.

## Connect
```python
from opensearchpy import OpenSearch

host = 'localhost'
port = 9200
auth = ('admin', 'Open@159x357')

# Initialize the OpenSearch client
client = OpenSearch(
    hosts=[{'host': host, 'port': port}],
    http_compress=True,
    http_auth=auth,
    use_ssl=True,
    verify_certs=False,
    ssl_show_warn=False
)

response = client.cluster.health()
print(response)
```
## Index
### Create

```python
# Create an index with non-default settings.
index_name = 'INDEX_NAME'
index_body = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}

response = client.indices.create(index_name, body=index_body)
print(response)
```

## Insert
::: tip
If you do not provide a key, openserach will create on for you
:::

```python
document_body = {
    'key1': value1,
    'key2': value2,
    'key3': value3
}

try:
    response = client.index(
        index='INDEX_NAME',
        body=document_body,
        refresh=True
    )
    print(f"Indexed document ID: {response['_id']}")
except Exception as e:
    print(f"Error indexing document: {e}")

```
## Search Data
:::tip
Learn about all the possible ways to search data.

[Search Docs Here](./search.md)
:::

* Keyword Search
* K-NN Search
* Vector Search
* Neural Search
* Semantic Search
* Multimodal Search
* Neural Sparse Search
* Hybrid Search

## Local Deploy

```yaml
services:
  opensearch:
    image: opensearchproject/opensearch:latest
    container_name: opensearch
    environment:
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=Open@159x357
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./opensearch-data:/usr/share/opensearch/data
    ports:
      - 9200:9200
      - 9600:9600
    hostname: opensearch-node
    networks:
      - opensearch-net

  opensearch-dashboards:
      image: opensearchproject/opensearch-dashboards:latest # Make sure the version of opensearch-dashboards matches the version of opensearch installed on other nodes
      container_name: opensearch-dashboards
      ports:
        - 5601:5601
      expose:
        - "5601"
      environment:
        OPENSEARCH_HOSTS: '["https://opensearch-node:9200"]' # Define the OpenSearch nodes that OpenSearch Dashboards will query
      networks:
        - opensearch-net

networks:
  opensearch-net:
    driver: bridge
```