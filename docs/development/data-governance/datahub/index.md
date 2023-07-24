# Datahub

## GraphQL API

Example: [GraphiQL - Datahub](https://demo.datahubproject.io/api/graphiql)

```graphql
query getHighlights {
  getHighlights {
    value
    title
    body
    __typename
  }
}
```
```json
{
  "data": {
    "getHighlights": [
      {
        "value": 1683,
        "title": "Weekly Active Users",
        "body": "-0.36% decrease from last week",
        "__typename": "Highlight"
      },
      {
        "value": 5862,
        "title": "Monthly Active Users",
        "body": "-10.04% decrease from last month",
        "__typename": "Highlight"
      },
      {
        "value": 2044,
        "title": "Datasets",
        "body": "56.36% have owners, 8.90% have tags, 16.00% have glossary terms, 32.53% have description, 6.21% have domain assigned!",
        "__typename": "Highlight"
      },
      {
        "value": 45,
        "title": "Dashboards",
        "body": "86.67% have owners, 28.89% have tags, 28.89% have glossary terms, 100.00% have description, 20.00% have domain assigned!",
        "__typename": "Highlight"
      },
      {
        "value": 232,
        "title": "Charts",
        "body": "70.69% have owners, 5.60% have tags, 4.74% have glossary terms, 0.00% have description, 1.29% have domain assigned!",
        "__typename": "Highlight"
      },
      {
        "value": 9,
        "title": "Pipelines",
        "body": "66.67% have owners, 33.33% have tags, 55.56% have glossary terms, 66.67% have description, 55.56% have domain assigned!",
        "__typename": "Highlight"
      },
      {
        "value": 34,
        "title": "Tasks",
        "body": "41.18% have owners, 2.94% have tags, 11.76% have glossary terms, 2.94% have description, 5.88% have domain assigned!",
        "__typename": "Highlight"
      },
      {
        "value": 465,
        "title": "Domains",
        "body": "48.17% have owners, 0.00% have tags, 0.00% have glossary terms, 0.00% have description!",
        "__typename": "Highlight"
      }
    ]
  },
  "extensions": {}
}
```