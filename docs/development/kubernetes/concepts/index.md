# Concepts

## CPU/Memory - Requests/Limits

[Official Docs](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

| Resource      |    Request    |  Limit | Compressible|
| ------------- | ------------- | ------ | ----------- |
| memory        | miminum to be scheduled | maximum memory use | No
| cpu           | miminum to be scheduled | maximum cpu use | Yes

### Differences between limits

CPU is fundamentally different than memory. CPU is a compressible resource and memory is not. 

In simpler terms, you can give someone spare CPU in one moment when it's free, but that does not obligate you to continue giving them CPU in the next moment when another pod needs it.

Why is memory different than CPU on Kubernetes? Because memory is a non-compressible resource. Once you give a pod memory, you can only take it away by killing the pod. This is the cause of OOM Kills.

### CPU Resouces Units

1 CPU unit is equivalent to 1 physical CPU core, or 1 virtual core, depending on whether the node is a physical host or a virtual machine running inside a physical machine.

- 0.1 = 100m
- 1000m = 1 CPU

::: warning
Note: Kubernetes doesn't allow you to specify CPU resources with a precision finer than 1m. Because of this, it's useful to specify CPU units less than 1.0 or 1000m using the milliCPU form; for example, 5m rather than 0.005.
:::

### Memory Resources Units

Pay attention to the case of the suffixes. 

If you request 400m of memory, this is a request for 0.4 bytes. 

Someone who types that probably meant to ask for 400 mebibytes (400Mi) or 400 megabytes (400M).

- 1.5 =  1500m
- 1.5Gi = 1536Mi

## HPA - Horizontal Pod AutoScaling

[Official Docs](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

Horizontal scaling means that the response to increased load is to deploy more Pods. 
This is different from vertical scaling, which for Kubernetes would mean assigning more resources (for example: memory or CPU) to the Pods that are already running for the workload.