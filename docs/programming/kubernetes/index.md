# Kubernetes

## Kubernetes

![K8S](./k8s.png)

[K8s - Official Docs](https://kubernetes.io/pt-br/docs/concepts/overview/what-is-kubernetes/)

Kubernetes is a portable, extensible, open source platform for managing containerized workloads and services, 
that facilitates both declarative configuration and automation. 
It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.



## K3D

![K3D](./k3d.png)

k3d is a lightweight wrapper to run k3s (Rancher Lab’s minimal Kubernetes distribution) in docker.

k3d makes it very easy to create single- and multi-node k3s clusters in docker, e.g. for local development on Kubernetes.

### Requirements

* docker to be able to use k3d at all
* kubectl to interact with the Kubernetes cluster

[K3D - Official Docs](https://k3d.io/v5.5.1/)

```bash
brew install k3d
```

### Create Cluster

Creating K8s cluster in one line.

::: tip
If you wanna expose your cluster in the local networ, provide your machine IP in --tls-san section.
:::

### Usage
```bash
k3d cluster create <CLUSTER_NAME> --agents 4 --servers 1 --k3s-arg "--tls-san=<YOUR_MACHINE_IP>@server:*"
```

Real Example
```bash
k3d cluster create home --agents 4 --servers 1 --k3s-arg "--tls-san=192.168.0.243@server:*"
```

List Clusters
```bash
k3d cluster list
```

## Lens - GUI for K8s 

![Lens - IDE](./lens.png)

Lens Desktop is the only application you need to take control of your Kubernetes clusters. It's built on open source and free.

[Open Lens Github](https://github.com/MuhammedKalkan/OpenLens)

### Install
```bash
brew install --cask openlens
```

::: tip Important Extensions
@alebcay/openlens-node-pod-menu --> Enables pods logs and shell.

:::

Go to extensions (ctrl+shift+e) add this name in the box: @alebcay/openlens-node-pod-menu and hit install

## K9S - TUI for K8s

![K9s](./k9s.png)

K9s is a terminal based UI to interact with your Kubernetes clusters. The aim of this project is to make it easier to navigate, observe and manage your deployed applications in the wild.

[K9s Site](https://k9scli.io/)

### Install

```bash
 brew install derailed/k9s/k9s
```