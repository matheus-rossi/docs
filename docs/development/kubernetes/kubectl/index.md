 # Kubectl

## Copy file from local to pod
Now, to copy files from the local system to a pod:

 ```bash
# syntax
kubectl cp -n <namespace> <source> <pod-name>:<path> 

#example
kubectl cp -n ksql ./file.sql ksql-pod-asd1234:/home/appuser
 ```

## Copying files from pod to local system
To copy files from a pod to the local system use:

 ```bash
# syntax
kubectl cp -n <namespace> <pod-name>:<path> <destination-on-local-system>

#example
kubectl cp -n ksql ksql-pod-asd1234:/home/appuser .
 ```

 ## Copying files from a pod to a pod

To copy files from one pod to another pod in K8S using the kubectl cp command, you will need to copy the files to your local system as an intermediate step and then from your local system to the destination pod.

You can use the two examples above to achieve this.

## Copying directories

Instead of specifying files to copy, you can also specify directories. For example, to copy a directory from your local system to a pod:

```bash
kubectl cp /path/to/local/directory <namespace>/<pod-name>:/path/in/pod
```
