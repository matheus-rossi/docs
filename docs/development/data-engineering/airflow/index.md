# Apache Airflow

![Apache Airflow](airflow.png)

## Certifications
::: tip ToDo
Link to certifications
:::

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

We can use airflow helm chart to install airflow on Kubernetes.

Helm chart used to deploy Airflow on K8s:

[Airflow Helm Chart](https://airflow.apache.org/docs/helm-chart/stable/index.html)

### Deploy on ArgoCD

The helm chart need some changes to be deployed on ArgoCD. Inside values.yaml, when deploying into a kubernetes cluster, we need to change the following value:

::: warning
If you do not change these values, the deployment will fail. 

Do not forget to change other values you may need to.
:::

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: airflow
  namespace: argocd
spec:
  project: default
  source:
    repoURL: ${REPO_URL}
    targetRevision: ${REPO_BRANCH}
    path: ${REPO_PATH}
    directory:
      recursive: true
    helm:
      passCredentials: true
      chart: airflow
      parameters:
      - name: executor
        value: KubernetesExecutor
      - name: createUserJob.useHelmHooks
        value: "false" // [!code hl]
      - name: migrateDatabaseJob.useHelmHooks
        value: "false" // [!code hl]
```

## Install Managed Airflow on AWS, GCP, Azure

- AWS -> [MWAA](https://aws.amazon.com/pt/managed-workflows-for-apache-airflow/)
- GCP -> [Cloud Composer](https://cloud.google.com/composer)
- AZURE -> [Azure Data Factory](https://azure.microsoft.com/en-us/services/data-factory/)

## Important Concepts

Learn more about important Apache Airflow concepts:

[Concepts](concepts.md)


