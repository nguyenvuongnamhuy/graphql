<p align="center">
  <a href="https://graphql.org" target="blank">
    <img
        width="200"
        src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg"
        alt="GraphQL Logo"
    />
  </a>
</p>

<h3 align="center">
  <a href="https://docs.nestjs.com/graphql/quick-start" target="_blank">GraphQL</a>
  is a query language for APIs
</h3>

# Agenda

- [What is GraphQL ?](#what-is-graphql)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)
- [Core Concepts](#core-concepts)
  - [Query](#query)
  - [Mutation](#mutation)
  - [Resolver](#resolver)
  - [Subscription](#subscription)
  - [Schema Definition](#schema-definition)

# What is GraphQL ?

- GraphQL is a query language
- Developed by Facebook in 2012 and released as an open-source project in 2015
- Designed to request ONLY the data you need
- Returned data is JSON

# Benefits

1. Single endpoint for querying and mutating data
2. Client-oriented architecture
3. Reduced over-fetching and under-fetching
4. Saves development time, no need to create/modify endpoints
5. Reduced round-trips
6. No require versioning, clients can request new fields without breaking existing queries
7. Self-documenting APIs

# Disadvantages

1. No support HTTP caching
2. Nested queries can make it challenging to track and optimize data fetching
3. Response only JSON

# Core Concepts

## Query

- Request data from server
- Analogous to the HTTP GET method in REST

```bash
query {
  getAllEmployee {
    id
    name
    email
    address
  }
}
```

- Nested queries

```bash
query {
  getAllCompany {
    id
    name
    address
    employees {
      name
      email
    }
  }
}
```

- Batched requests

```bash
# combine multiple queries
query {
  getAllEmployee {
    id
    name
    email
    address
  }
  companies: getAllCompany {
    id
    name
    address
  }
}
```

- Alias for renaming fields
- Filter, order and paginate data

## Mutation

- Using to interact with data
- Analogous to the HTTP POST, PUT, PATCH, DELETE methods in REST

## Resolver

- Responsible for mapping the query or mutation from the GraphQL schema to the execution logic

## Subscription

- GraphQL subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server
- Using Pub/Sub and Web Socket mechanism

# Schema Definition

- Managing data structures in separate .graphql or .gql files

---
