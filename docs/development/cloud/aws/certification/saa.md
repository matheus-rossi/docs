# Solutions Architect Associate

## Getting Started

### Regions

Regions -> Cluster of datacenters.

How to choose:

* Compliance
* Latency
* Services Avaliable on Region
* Pricing

### Availability Zones

Each region has a minimum of 3 az and a max od 6.

They are separated from each other, but connected with powerful network.

Ex: 
* ap-southeast-2a
* ap-southeast-2b
* ap-southeast-2c

### Edge Locations

More than 400+ Edge Locations, helping to deliver content with low latency all over ther globe.

### Global vs Region Scoped Services

* Examples of global services: IAM, Route53, CloudFront, WAF
* Examples of region scoped services: EC2, lambda, rekognition ...

### Aws Console Management

https://aws.amazon.com/console/

## IAM & AWS CLI

IAM - Identity and Access Management = Global Service

* Root account -> NEVER use on production. Some services can't even be deployed / used with root user.
* Users -> people within your organization
* Groups -> only contain users, not other groups.
* User can have zero, one, or multiple groups

Users and groups will have policies, describing permissions on cloud.

LEAST PRIVILEGE, always.

### Policies

Example of policy allowing acces to one bucket on s3

```javascript
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Effect":"Allow",
         "Action": "s3:ListAllMyBuckets",
         "Resource":"*"
      },
      {
         "Effect":"Allow",
         "Action":["s3:ListBucket","s3:GetBucketLocation"],
         "Resource":"arn:aws:s3:::DOC-EXAMPLE-BUCKET1"
      },
      {
         "Effect":"Allow",
         "Action":[
            "s3:PutObject",
            "s3:PutObjectAcl",
            "s3:GetObject",
            "s3:GetObjectAcl",
            "s3:DeleteObject"
         ],
         "Resource":"arn:aws:s3:::DOC-EXAMPLE-BUCKET1/*"
      }
   ]
}
```

### AWS MFA

Set password policy.

Always use Multiple Factor Authentication, security is mandatory

* Virtual - MFA (Google Authenticator, Authy, etc)
* Phisical - U2F - Universal 2nd Factor, like a usb stick ... 

###  CLI and SDK

To use CLI, you must generate Access Key to yout account. Be careful, NEVER sote it in github, they are just like passwords.

* AccessKeyId -> username
* SecretAccesskey -> password

With CLI you can interact with AWS using command line.

With SDK you can program how to interact with AWS, using form example python to create resources on Cloud.

Install CLI
```bash
brew install awscli
```

### AWS Cloud Shell

Not avaiable on all regions.

With cloud shell, you can ssh into your instances inside the console management, without using external apps.

### AWS Roles

Roles are just like users, but used inside other services inside aws. Examples: ec2, lambda, cloud formation

IAM Role -> EC2 -> S#

### Security Tools

* IAM Credentials Report (account-level) -> All account's users
* IAM Access Advisor (user-level) -> All permissions granted to user

## EC2

### Budget Setup


::: tip
Always set budgets whilw using aws, it will help you monitor the billing of yout account.
:::

### EC2 Basics

EC2 -> Elastic Compute Cloud -> (vm's on cloud)

You can choose:

* Operational System: Linux, Win, MacOs