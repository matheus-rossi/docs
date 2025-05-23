# Large Language Models

## Ollama

![Ollama Logo](ollama.png)

:::tip Official Docs
[Ollama Site](https://ollama.com/)<br>
:::

The easiest way to run open source models locally.

### Installation
With brew `brew install ollama` or direct download via [Link](https://ollama.com/download/)

### Usage

```bash
# List downloaded models
ollama list

# Download models
ollama pull llama3:latest

# Run models
ollama run llama3
```

### API

Query the model via request
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Write a rock song!",
  "stream": false
}' | json_pp
```
