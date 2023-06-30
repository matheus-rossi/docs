# Solutions Architect Associate

::: details TO STUDY
ENI - Elastic Network Interface
:::

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
* Cpu
* Ram
* Storage (EBS & EFS)
* Network
* Firewall
* Bootstrap

### Bootstrap

Runs script on the deploy of a ec2 instance. EC2 User Data.

### Instance Types

[List of Types](https://aws.amazon.com/ec2/instance-types/)

| Tipo     |      Exemplos      | Usage |
|----------|:------------------:| -----|
| General Purpose |  M7, A1, T2 | Web Servers, Code Repositories, Development Environments, Test Environments |
| Compute Optimized |  C4  | Gaming Servers, Machine Learning, Batch Processing, Media Transcode, High Performance Compute |
| Memory Optimized |  R5, X1, z1d  | High Performance Databases, Distributed Web Scale In-Memory Caches, In-Memory Databases, Real Time Big Data Analytics |
| Storage Optimized |  H1, I3  | Data Warehousing, Hadoop, MapReduce, Distributed File Systems, Network File Systems, Log or Data Processing, Cache in memory databases (Redis) |

[Instance Type Comparison](https://instances.vantage.sh/)

### Security Groups

Security Groups are like firewalls, they control the traffic to your instances, allowing inbound and outbound rules. Rules can be applied to IPs and other security groups.

::: tip
Only contain allow rules, not deny rules.
:::

### Ec2 Purchasing Options

* On Demand -> short workload, predictable pricing -> Pay as you go
* Reserved -> Long workloads -> Up to 75% discount compared to on-demand -> 1 or 3 years
* Savings Plans -> Flexibility to move across instance families, regions, OS -> Up to 72% discount compared to on-demand -> Commit to a consistent amount of compute usage (measured in $/hour) for a 1 or 3 year term
* Spot -> Short workloads, for cheap, can lose instances -> Up to 90% discount compared to on-demand -> Bid a price for instance usage, if AWS spot price is below your bid, you get the instance, if above, you lose it.
* Dedicated Hosts -> Useful for regulatory requirements that may not support multi-tenant virtualization -> Book an entire physical server, control instance placement.
* Dedicated Instances -> Instances running on hardware that's dedicated to you -> May share hardware with other instances in same account.
* Capacity Reservations -> Reserve capacity for your EC2 instances -> Ensure you have capacity when you need it.

#### EC2 On Demand

* Pay for what you use
* Linux, Windows
* Hiest cost but no upfront payment
* No long term commitment

#### EC2 Reserved Instances

* Up to 72% discount compared to on-demand
* Specific instance type in a region
* Period of 1 or 3 years
* Payment Options: No Upfront, Partial Upfront, All Upfront
* Buy and sell in AWS Marketplace

#### EC2 Savings Plans

* Up to 72% discount compared to on-demand
* Flexibility to move across instance families, regions, OS
* Commit to a consistent amount of compute usage (measured in $/hour) for a 1 or 3 year term

#### EC2 Spot Instances

* Up to 90% discount compared to on-demand
* Useful for workloads that are resilient to failure
* Great for batch jobs, data analysis, workloads that are resilient to failure
* Most cost-efficient instances in AWS
* Not great for critical jobs or databases

#### EC2 Dedicated Hosts

* Physical dedicated EC2 server for your use
* Compliance requirements that may not support multi-tenant virtualization
* Can be purchased On-Demand or reserved
* Most expensive EC2 pricing model

#### EC2 Dedicated Instances

* Instances running on hardware that's dedicated to you
* May share hardware with other instances in same account
* No control over instance placement (can move hardware after stop/start)

#### EC2 Capacity Reservations

* Reserve capacity for your EC2 instances
* Ensure you have capacity when you need it
* Can be purchased On-Demand

#### Spot Instances vs Spot Fleet

* Spot Fleet -> Set of Spot Instances + (optional) On-Demand Instances
* Spot Fleet will try to meet the target capacity with price constraints
* Define possible launch pools (different instance types)
* Strategies -> LowestPrice, Diversified, CapacityOptimized, priceCapacityOptimized (best)

#### IPv4 vs IPv6

* IPv4 -> 32 bits -> 3.7 billion addresses
* IPv6 -> 128 bits -> 340 undecillion addresses

* Private IP -> can only be identified on private network
* Public IP -> can be identified on the internet
* Elastic IP -> If you need a fixed public IP for your instance, you can use Elastic IP. Avoid, prefer to use DNS instead.

#### EC2 Placement Groups

* Cluster -> Low latency, high throughput -> Same AZ
* Spread -> Individual critical instances -> Max 7 instances per AZ 
* Partition -> Large distributed and replicated workloads -> 100s of EC2 instances per AZ

#### ENI Elastic Network Interface

[Aws - Docs](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/)

* Logical component in a VPC that represents a virtual network card
* Can have the following attributes:
  * Primary private IPv4
  * One or more secondary private IPv4
  * One public IPv4
  * One or more IPv6
  * One or more security groups
* ENI are valid in specific AZ

#### EC2 Hibernate

We can: 

* Stop Instances -> EBS kept intact, RAM lost
* Terminate Instances -> EBS deleted by default, RAM lost
* Hibernate Instances -> RAM is preserved, because it's written into to EBS, that is kept intact

No more then 60 days hibernating. EBS is mandatory.

### EC2 Storage

#### EBS

* EBS is a Elastic Block Store, it's a network drive you can attach to your instances while they run.
* You can persist data, even after the instance is terminated, but you can only attach it to one instance at a time.
* It's locked to an AZ. 
* Analogous to a physical hard drive. 
* Billing per GB provisioned.
* Can increase size of EBS.
* Delete on termination attribute -> pay attention to this attribute, if you don't want to lose your data.

#### EBS Snapshots

* Make a backup of your EBS volume at a point in time.
* Can copy snapshots across AZ or Region.
* ENS Snapshots Archive

### AMI - Amazon Machine Image

* AMI are a customization of an EC2 instance.
* You add your own software, configuration, operating system, monitoring.

Process to create an AMI:
* start an EC2 instance
* customize it
* stop the instance (optional)
* build an AMI - this will create a snapshot
* launch instances from other AMIs

Tips:

AMIs are built for a specific AWS Region, they're unique for each AWS Region. You can't launch an EC2 instance using an AMI in another AWS Region, but you can copy the AMI to the target AWS Region and then use it to create your EC2 instances.

### EC2 Instance Store

EBS have good but limited performance, if you need a high performance disk, you can use EC2 Instance Store.

They have / are:
* High I/O performance
* Ephemeral
* Good for buffer / cache / scratch data / temporary content
* Risk of data loss if hardware fails
* Backups and Replication are your responsibility

### EBS Volume Types

* gp2 / gp3 -> General Purpose SSD
   * 1gb - 16tb
   * gp2 -> older generation
   * gp3 -> new generation, more performant
* io1 / io2 -> Highes performance SSD -> low latency and high IOPS
   * 4gb - 16tb
   * io1 -> older generation
   * io2 -> new generation, more performant
   * support multi-attach
* st1 -> Low cost HDD -> frequently accessed, throughput intensive workloads
   * 125gb - 16tb
* sc1 -> Lowest cost HDD -> less frequently accessed workloads

Tips:

By default, the Root volume type will be deleted as its "Delete On Termination" attribute checked by default. Any other EBS volume types will not be deleted as its "Delete On Termination" attribute disabled by default.

### EBS Multi-Attach

* EBS volumes can be attached to multiple EC2 instances in the same AZ
* Only available for io1 and io2
* Up to 16 EC2 instances
* FileSystems must be cluster aware (ex: GFS2, OCFS2)

### EBS Encryption

Should always encrypt EBS volumes, it's easy to do so.

You would like to encrypt an unencrypted EBS volume attached to your EC2 instance. What should you do? 

Create an EBS snapshot of your EBS volume. 
Copy the snapshot and tick the option to encrypt the copied snapshot. 
Then, use the encrypted snapshot to create a new EBS volume

### EFS - Elastic File System

Uses NFSv4.1 protocol

* Managed NFS (Network File System) that can be mounted on many EC2
* EFS works with EC2 instances in multi AZ
* Highly available, scalable, expensive (3x gp2), pay per use
* Compatible with Linux based AMI

EFS scale:
* Scale up to the petabytes
* Grow and shrink automatically

Performmance Mode:
* General Purpose
* Max I/O - higher latency, higher throughput, higher cost

Throughput Mode:
* Bursting
* Provisioned - throughput set
* Elastic - throughput grows with the size of the file system

Storage Tiers:
* Standard - for frequently accessed files
* Infrequent Access (EFS-IA) - cost to retrieve files, lower price to store

Avaiability and Durability:
* Multiple AZ
* One AZ -> Great for dev, test

### EBS vs EFS Differences

* EBS can be used only with one EC2 instance (except multi-attach io1/io2)
* EBS locked at AZ level
* To move EBS through AZ, you need to take a snapshot
* EFS can be mounted on multiple EC2 instances
* EFS is only for linux instances
* EFS is more expensive than EBS

## ELB & ASG

ELB - Elastic Load Balancer

ASG - Auto Scaling Group

### ELB - Elastic Load Balancer

Load Balancer are servers that forward internet traffic to multiple servers (EC2 Instances) downstream.

ELB are aws managed load balancers. Can be integreted with most AWS services. Health checks are automated.

Kinds of load balancers:

* Classic Load Balancer (v1 - old generation) -> 2009
* Application Load Balancer (v2 - new generation) -> 2016
   * layer 7
   * http / https / websocket
* Network Load Balancer (v2 - new generation) -> 2017
   * TCP / TLS (secure tcp) / UDP
* Gateway Load Balancer (v2 - new generation) -> 2020
   * Layer 3 (network) 

Some load balancer can be set as internal or external (public).

Link security groups of EC2 to load balancers security groups.

#### Application Load Balancer

Support redirections from http to https.

Can be used with route tables to redirect traffic to specific instances.

Works with containers and microservices.

Possible targets (could be multiple targets):
* EC2 instances
* ECS tasks
* Lambda functions
* IP addresses (privates) 

Application-based cookie:
* APPUSERC - cookie name

::: tip
* Fixed hostname
* Application Server dont see IP of client directly, it sees the IP of the load balancer
  * X-Forwarded-For header contains the real IP of the client
:::

#### Network Load Balancer

* Layer 4 (TCP) -> extreme performance
   * tcp / udp
* Handle millions of requests per second
* Less latency ~100ms (vs 400ms for ALB)

NLB has one static IP per AZ, and supports assigning Elastic IP (public) to it.

Used for extreme performance, TCP or UDP traffic.

Target groups -> EC2 instances, IP addresses, applications load balancers.

Healh checks can usw TCP health checks, http, https.

#### Gateway Load Balancer

Usage: for third party appliances (firewalls, etc)

Layer 3 (network)

Uses geneve protocol on port 6081

#### Sticky Sessions (Session Affinity)

The same client is always redirected to the same instance behind a load balancer.

Types:
* load balancer generated cookie
* application generated cookie

#### Cross Zone Load Balancing

* Each load balancer instance distributes evenly across all registered instances in all AZ
* ALB enabled by default
* NLB GLB disabled by default

#### SSL/TLS

Load balancer uses x.509 certificates.

Can manage SSL certificates with ACM (AWS Certificate Manager), and create and upload your own certificates.

SNI - Server Name Indication -> allows multiple SSL certificates on the same IP address.
   * works for ALB and NLB

Possible origins:
* ACM
* IAM
* Import (private key, body, certificate chain)

#### Connection Draining

When an instance is unhealthy or de-registering, it will not receive new requests, but will finish the current ones.

* Default timeout: 300 seconds
* Can be configured between 1 and 3600 seconds
* Can be disabled (value = 0)

### ASG - Auto Scaling Group

ASG is a group of EC2 instances that can scale up or down based on metrics.

ADG is free, you only pay for the resources it creates.

Param:
* Min size
* Desired capacity
* Max size

ASG can remove instances marked as unhealthy and launch new ones.

Launch template:
* AMI + Instance Type
* EC2 User Data
* EBS Volumes
* Security Groups
* SSH Key Pair
* IAM Roles
* Network configuration
* Load Balancer

Can be triggered by CloudWatch Alarms like CPU usage, network usage, etc.

### ASG Scaling Policies

* Target Tracking Scaling -> ex: set average CPU usage to 40%
* Simple / Step Scaling -> ex: increase by 2 instances when CPU > 70%
* Scheduled Actions -> ex: increase to 10 instances at 5pm on Fridays
* Predictive Scaling -> ex: forecast future traffic based on historical traffic

Good metrics to use:
* CPU
* Requests count
* Network In / Out
* Any custom metric (provided by CloudWatch)

Cooldown period -> wait time before launching another scaling activity

## RDS + Aurora + ElastiCache

### RDS - Relational Database Service

RDS is a managed DB service for the follwing DBs:

* Postgres
* MySQL
* MariaDB
* Oracle
* Microsoft SQL Server
* Aurora (AWS Proprietary DB)

RDS is a managed service, AWS handles:

* Setup the DB
* Patching the DB software
* Backups
* OS Maintenance
* Scaling
* Multi AZ setup for DR

#### RDS - Storage Auto Scaling

* Storage autoscaling is enabled by default
* Set a maximum storage threshold

Automaticaly increase storagewhen:

* Size 90% full
* low storage lasts 5 minutes
* 6 hours passed since last modification

#### RDS - Read Replicas

* Up to 5 read replicas
* Within AZ, Cross AZ or Cross Region
* Replication is ASYNC, so reads are eventually consistent

Read replicas are used for reporting or BI (Business Intelligence) tools

::: warning
Not network cost between AZs, but there is network cost between regions.
:::

#### RDS Multi AZ (Disaster Recovery)

Sync replication to another AZ, changes are only accepted if they are written to both databases.

Not used for scaling, only for disaster recovery.

#### RDS from single AZ to Multi AZ

* Zero downtime
* Just modify the database

What happens behind the scenes:

* snapshot of the primary DB is taken
* snapshot is restored into the second db
* syncronization is established between the two DBs

#### RDS Custom

With custom RDS, you can access the underlying EC2 instances.

Avaliable only for:

* Oracle
* SQL Server

### Aurora

* AWS Proprietary database
* Postgres and MySQL are both supported as Aurora DB
* Aurora is "AWS cloud optimized" and claims 5x performance improvement over MySQL on RDS, over 3x the performance of Postgres on RDS
* Storage automatically grows in increments of 10GB, up to 128TB
* Can have 15 replicas
* Failover is instantenous (HA)
* Aurora costs more than RDS (20% more) - but is more efficient

#### Aurora High Availability and Read Scaling

6 copies of your data across 3 AZs

* 4 copies out of 6 needed for writes
* 3 copies out of 6 needed for reads

1 master (writes)
1 to 15 replicas (reads)

Suports cross region replicas

* Writer endpoint -> master
* Reader endpoint -> load balancer across all replicas

#### Aurora Replicas - Autoscaling

