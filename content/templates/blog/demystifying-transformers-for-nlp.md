---
id: 2
title: "Demystifying Transformers for NLP"
slug: "demystifying-transformers-for-nlp"
excerpt: "A deep dive into the architecture that changed Natural Language Processing forever, explained simply."
date: "2024-09-28"
readTime: "8 min read"
category: "Deep Learning"
image: "https://picsum.photos/800/600?random=11"
author: "Michael E. Adebisi"
tags: ["Transformers", "NLP", "Deep Learning", "Attention Mechanism"]
---

In 2017, a paper titled "Attention Is All You Need" quietly revolutionized the entire field of artificial intelligence. The transformer architecture it introduced has become the foundation for virtually every major AI breakthrough since, from GPT to BERT to DALL-E.

But what actually _is_ a transformer? Let's break it down.

## The Problem with Sequential Processing

Before transformers, we processed language sequentially using RNNs and LSTMs. The problem? Reading word by word is slow and forgets context.

```
"The cat sat on the mat because it was tired."
                                    ↑
                            What does "it" refer to?
```

To understand that "it" refers to "cat," the model needs to remember something from 7 words ago. RNNs struggle with this.

## Enter: Self-Attention

The key insight of transformers is self-attention. Instead of processing words sequentially, we let every word "look at" every other word simultaneously.

### How Self-Attention Works

1. **Query, Key, Value**: Each word gets three vectors
2. **Attention Scores**: Query × Key = How much should I attend to this word?
3. **Output**: Weighted sum of Values based on attention scores

```python
def self_attention(Q, K, V):
    # Q, K, V have shape (seq_len, d_model)

    # Step 1: Compute attention scores
    scores = Q @ K.T / sqrt(d_model)

    # Step 2: Softmax to get attention weights
    weights = softmax(scores, dim=-1)

    # Step 3: Weighted sum of values
    output = weights @ V

    return output
```

### Visualization

For the sentence "The cat sat on the mat":

```
         The   cat   sat   on   the   mat
The     [0.1, 0.2, 0.1, 0.1, 0.3, 0.2]
cat     [0.2, 0.3, 0.2, 0.1, 0.1, 0.1]
sat     [0.1, 0.3, 0.2, 0.2, 0.1, 0.1]
...
```

Each row shows how much attention that word pays to every other word.

## The Full Architecture

A transformer has two main components:

### Encoder

- Takes input sequence
- Creates contextualized representations
- Used in BERT, sentence embeddings

### Decoder

- Generates output sequence
- Uses encoder representations + previous outputs
- Used in GPT, machine translation

### Building Blocks

```
┌─────────────────────────────────┐
│         Output Embedding        │
├─────────────────────────────────┤
│    Add & Normalize              │
│    Feed Forward Network         │
│    Add & Normalize              │
│    Multi-Head Self-Attention    │
├─────────────────────────────────┤
│    Positional Encoding          │
│    Input Embedding              │
└─────────────────────────────────┘
```

## Multi-Head Attention

One attention head might not capture all patterns. Solution? Run multiple attention heads in parallel!

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.heads = nn.ModuleList([
            AttentionHead(d_model // n_heads)
            for _ in range(n_heads)
        ])
        self.linear = nn.Linear(d_model, d_model)

    def forward(self, x):
        # Run all heads in parallel
        head_outputs = [head(x) for head in self.heads]
        # Concatenate and project
        return self.linear(torch.cat(head_outputs, dim=-1))
```

Different heads learn different patterns:

- Head 1: Subject-verb agreement
- Head 2: Coreference resolution
- Head 3: Syntactic structure

## Positional Encoding

Since transformers process all words simultaneously, they don't inherently know word order. We add positional information:

```python
def positional_encoding(seq_len, d_model):
    positions = np.arange(seq_len)[:, np.newaxis]
    dims = np.arange(d_model)[np.newaxis, :]

    angles = positions / (10000 ** (2 * (dims // 2) / d_model))

    encoding = np.zeros((seq_len, d_model))
    encoding[:, 0::2] = np.sin(angles[:, 0::2])
    encoding[:, 1::2] = np.cos(angles[:, 1::2])

    return encoding
```

## Why Transformers Won

| Feature         | RNN/LSTM      | Transformer       |
| --------------- | ------------- | ----------------- |
| Parallelization | ❌ Sequential | ✅ Fully parallel |
| Long-range deps | ⚠️ Degrades   | ✅ Constant       |
| Training speed  | Slow          | Fast              |
| Memory          | O(1)          | O(n²)             |

The O(n²) memory was a problem, but clever techniques like sparse attention have addressed it.

## Practical Impact

### BERT (2018)

- Encoder-only transformer
- Bidirectional understanding
- Revolutionized NLP benchmarks

### GPT (2018-2024)

- Decoder-only transformer
- Unidirectional generation
- Powers ChatGPT, Claude, etc.

### Beyond Text

- **Vision**: ViT, DALL-E
- **Audio**: Whisper
- **Multimodal**: GPT-4V, Gemini

## Key Takeaways

1. Self-attention lets every word see every other word
2. Multi-head attention captures different patterns
3. Positional encoding preserves word order
4. Parallelization enables massive scaling

The transformer isn't just an architecture—it's a paradigm shift in how we think about sequence processing.

---

_Want to dive deeper? Check out [The Annotated Transformer](http://nlp.seas.harvard.edu/annotated-transformer/) for a line-by-line implementation._
