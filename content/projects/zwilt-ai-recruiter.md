---
id: 1
title: "Zwilt AI Recruiter"
slug: "zwilt-ai-recruiter"
category: "NLP & Automation"
description: "An automated recruitment platform utilizing Large Language Models to parse resumes and match candidates to job descriptions with 92% accuracy."
image: "https://picsum.photos/600/400?random=1"
stats:
  - label: "Efficiency"
    value: "+40%"
  - label: "Accuracy"
    value: "92%"
technologies:
  ["Python", "TensorFlow", "HuggingFace", "FastAPI", "PostgreSQL", "Docker"]
github: "https://github.com/r33ldev/zwilt-recruiter"
demo: "https://zwilt.demo.mikehq.tech"
featured: true
date: "2023-06-15"
---

## Overview

Zwilt AI Recruiter is an intelligent recruitment automation platform that leverages state-of-the-art Large Language Models to streamline the hiring process. The system processes thousands of resumes daily, matching candidates to job descriptions with remarkable accuracy.

## The Challenge

Traditional recruitment processes are time-consuming and prone to human bias. Recruiters spend an average of 7 seconds reviewing each resume, leading to potentially qualified candidates being overlooked. Our client needed a solution that could:

- Process high volumes of applications efficiently
- Reduce unconscious bias in candidate screening
- Provide consistent evaluation criteria across all applications
- Integrate seamlessly with existing ATS systems

## Technical Approach

### Resume Parsing Engine

We built a custom Named Entity Recognition (NER) model fine-tuned on recruiting data to extract:

- Contact information
- Work experience with dates and responsibilities
- Educational background
- Technical skills and certifications
- Projects and achievements

### Semantic Matching Algorithm

The core matching system uses a dual-encoder architecture:

```python
class CandidateMatcher:
    def __init__(self):
        self.encoder = SentenceTransformer('all-MiniLM-L6-v2')

    def compute_similarity(self, resume_embedding, job_embedding):
        return cosine_similarity(resume_embedding, job_embedding)
```

### Key Features

1. **Multi-format Support**: Parses PDF, DOCX, and plain text resumes
2. **Skill Taxonomy**: Maps variations of skills to canonical forms
3. **Experience Scoring**: Weights recent experience more heavily
4. **Bias Mitigation**: Anonymizes identifying information during initial screening

## Results

After deploying Zwilt AI Recruiter:

- **40% reduction** in time-to-hire
- **92% accuracy** in candidate-job matching
- **3x increase** in diverse candidate pipeline
- **$2.3M saved** annually in recruitment costs

## Architecture

The system is built on a microservices architecture deployed on AWS:

- **API Gateway**: FastAPI with async processing
- **ML Service**: TensorFlow Serving for model inference
- **Database**: PostgreSQL with pgvector for embeddings
- **Queue**: Redis for job processing
- **Storage**: S3 for document storage

## Lessons Learned

Building Zwilt taught us valuable lessons about deploying ML in production:

1. Model accuracy isn't everything - user experience matters
2. Explainability is crucial for enterprise adoption
3. Continuous monitoring prevents model drift
4. Human-in-the-loop validation builds trust
