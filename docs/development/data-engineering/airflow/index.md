# Apache Airflow

![Apache Airflow](airflow.png)

## Install Locally

[Official Astro Docs](https://docs.astronomer.io/astro/cli/overview)

Astro CLI can be used to install Airflow locally. 

To do it, make sure you have Docker and Brew installed and running on your machine.

### Step 1: Install astro CLI

Install the latest version of the Astro CLI:

```bash
brew install astro
```

### Step 2: Create astro project

```bash
astro dev init
```

This command, will generate the following project structure:

```bash
.
├── .env # Local environment variables
├── dags # Where your DAGs go
│   ├── example-dag-basic.py # Example DAG that showcases a simple ETL data pipeline
│   └── example-dag-advanced.py # Example DAG that showcases more advanced Airflow features, such as the TaskFlow API
├── Dockerfile # For the Astro Runtime Docker image, environment variables, and overrides
├── include # For any other files you'd like to include
├── plugins # For any custom or community Airflow plugins
│   └── example-plugin.py
├── tests # For any DAG unit test files to be run with pytest
│   └── test_dag_integrity.py # Test that checks for basic errors in your DAGs
├── airflow_settings.yaml # For your Airflow connections, variables and pools (local only)
├── packages.txt # For OS-level packages
└── requirements.txt # For Python packages
```

### Step 3: Start astro (Airflow) locally

```bash
astro dev start
```

After that, you can access airflow in your browser at `http://localhost:8080`.

::: warning
You must restart your environment to apply changes from any of the following files:

packages.txt or Dockerfile or requirements.txt or airflow_settings.yaml
:::

```bash
astro dev restart
```

Step 4: Stop or Kill Airflow

::: warning
`astro dev stop` command stop the containers execution but keep the data (volumes).

`astro dev kill` command stop and remove all containers, including all data (volumes).
:::

## Install on kubernetes

We can use airflow helm chart to install airflow on Kubernetes. You can install Airflow with the following command:

::: tip ToDo
link to argocd deploying airflow helm chart
:::
