# Gitlab

## CI/CD

### Variables

Variables store information, like passwords and secret keys, that you can use in job scripts.

Variables can be:

* Protected: Only exposed to protected branches or tags.
* Masked: Hidden in job logs. Must match masking requirements.

You can use as shown in the example bellow AIRFLOW_PEM.

### CI file

Inside root level of the repo, create a file named `.gitlab-ci.yml`

#### Template Ubuntu

```yml
image: 
  ubuntu:20.04

before_script:
  - apt update
  - apt install gettext-base
  - 'command -v ssh-agent >/dev/null || ( apt-get update -y && apt-get install openssh-client -y )'
  - eval $(ssh-agent -s)

stages:
  - prod
  - dev

prod:
  stage: prod
  script:
    - echo "$AIRFLOW_PEM" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - scp -o StrictHostKeyChecking=no -r * user@ip:.
    - ssh -o StrictHostKeyChecking=no user@ip 'bash -s' < run.sh
    - ssh -o StrictHostKeyChecking=no user@ip 'sudo chown ubuntu:ubuntu -R dags/'
  when: manual
  only:
    - master

dev:
  stage: dev
  script:
    - echo "$DEV_AIRFLOW_PEM" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - scp -o StrictHostKeyChecking=no -r * user@ip:.
    - ssh -o StrictHostKeyChecking=no user@ip 'bash -s' < run.sh
    - ssh -o StrictHostKeyChecking=no user@ip 'sudo chown ubuntu:ubuntu -R dags/'
  when: manual
  only:
    - dev
```

#### Template Terraform

```yml
image:
  name: hashicorp/terraform:light
  entrypoint:
    - "/usr/bin/env"
    - "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

variables:
  TF_STATE_NAME: default
  TF_CACHE_KEY: default

stages:
  - dev
  - plan
  - destroy

dev:
  stage: dev

  variables:
    STAGE: dev
    AWS_ACCESS_KEY_ID: "${DEV_AWS_ACCESS_KEY_ID}"
    AWS_SECRET_ACCESS_KEY: "${DEV_AWS_SECRET_ACCESS_KEY}"

    TF_VAR_aws_access_key_id: ${DEV_AWS_ACCESS_KEY_ID}
    TF_VAR_aws_secret_access_key: ${DEV_AWS_SECRET_ACCESS_KEY}

  script:
    - cd environments/$STAGE
    - terraform init
    - terraform plan
    - terraform apply -auto-approve

  when: manual

  only:
    - dev

plan:

  variables:
    STAGE: dev
    AWS_ACCESS_KEY_ID: "${DEV_AWS_ACCESS_KEY_ID}"
    AWS_SECRET_ACCESS_KEY: "${DEV_AWS_SECRET_ACCESS_KEY}"

    TF_VAR_aws_access_key_id: "${DEV_AWS_ACCESS_KEY_ID}"
    TF_VAR_aws_secret_access_key: "${DEV_AWS_SECRET_ACCESS_KEY}"

  stage: plan

  script:
    - cd environments/$STAGE
    - terraform init
    - terraform plan

  except:
    - dev
    - prod

destroy:

  variables:
    STAGE: dev
    AWS_ACCESS_KEY_ID: "${DEV_AWS_ACCESS_KEY_ID}"
    AWS_SECRET_ACCESS_KEY: "${DEV_AWS_SECRET_ACCESS_KEY}"

    TF_VAR_aws_access_key_id: "${DEV_AWS_ACCESS_KEY_ID}"
    TF_VAR_aws_secret_access_key: "${DEV_AWS_SECRET_ACCESS_KEY}"

  stage: destroy

  script:
    - cd environments/$STAGE
    - terraform init
    - terraform destroy -auto-approve

  when: manual

  only:
    - dev

```