# Using LLM's

## How to use a LLM ?

You can use a LLM in several ways, each with different benefits and use cases:

1. **Web Interfaces & Applications** - Easy to use, no setup required
2. **API Integration** - Programmatic access for applications
3. **Local Installation** - Full control and privacy

## Comparison Table

| Feature | Web Interfaces | API Integration | Local Installation |
|---------|----------------|-----------------|-------------------|
| **Ease of Use** | ✅ Very Easy | ⚠️ Moderate | ❌ Technical |
| **Setup Time** | ✅ Instant | ⚠️ Minutes | ❌ Hours |
| **Cost** | ⚠️ Free tiers + paid | ❌ Pay-per-use | ✅ One-time setup |
| **Privacy** | ❌ Data sent externally | ❌ Data sent externally | ✅ Complete privacy |
| **Customization** | ❌ Limited | ⚠️ Moderate | ✅ Full control |
| **Internet Required** | ✅ Yes | ✅ Yes | ❌ No (after setup) |
| **Performance** | ✅ Consistent | ✅ Consistent | ⚠️ Hardware dependent |
| **Model Selection** | ❌ Provider limited | ❌ Provider limited | ✅ Compatible models |
| **Scalability** | ✅ Handles high load | ✅ Handles high load | ❌ Not so easy |
| **Best For** | Casual use | Production applications | Privacy, learning |


## Web Interfaces & Applications

The easiest way to get started with LLMs is through web interfaces and applications. These require no setup and are immediately accessible.

### Popular LLM Providers

- **OpenAI**: [chat.openai.com](https://chat.openai.com/)
- **Claude**: [claude.ai](https://claude.ai/)
- **Gemini**: [gemini.google.com](https://gemini.google.com/)
- **Perplexity**: [perplexity.ai](https://perplexity.ai/)

## External API Integration

Using LLM APIs allows you to integrate AI capabilities directly into your applications. This approach offers programmatic access and is ideal for building AI-powered features.

### OpenAI API Example

**Authentication:**
```bash
export OPENAI_API_KEY="your-api-key-here"
```

**Usage:**
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4",
    "messages": [
      {
        "role": "user",
        "content": "Write a Python function to calculate fibonacci numbers"
      }
    ],
    "max_tokens": 500
  }'
```

## Local API Integration

Running LLMs locally gives you full control, privacy, and no usage costs after initial setup. However, it requires more technical knowledge and computational resources.

### Ollama

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

### Other Local Options

#### LM Studio
- **Description**: User-friendly GUI for running local models
- **Platform**: Windows, macOS, Linux
- **Features**: Model management, chat interface, API server
- **Website**: [lmstudio.ai](https://lmstudio.ai/)
