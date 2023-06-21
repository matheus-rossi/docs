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