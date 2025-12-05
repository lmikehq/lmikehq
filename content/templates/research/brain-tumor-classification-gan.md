---
id: 4
title: "Brain Tumor Classification using a Pre-Trained Auxiliary Classifying GAN"
slug: "brain-tumor-classification-gan"
conference: "Journal of Medical Systems"
date: "2023"
abstract: "An auxiliary classifying conditional generative adversarial network based on StyleGAN, achieving ~99.5% accuracy in classifying Glioma, Meningioma, & Pituitary Brain Tumors."
link: "https://doi.org/10.1007/s10916-023-01932-x"
tags: ["StyleGAN", "Oncology", "Classification"]
authors: ["Michael E. Adebisi", "Dr. Lisa Park", "Prof. Ahmed Hassan"]
institution: "Johns Hopkins University"
---

## Abstract

Brain tumor classification from MRI remains challenging due to limited annotated data and class imbalance. We present AC-StyleGAN, an auxiliary classifying generative adversarial network that simultaneously generates realistic MRI images and classifies tumor types. Our approach achieves 99.5% accuracy on a multi-class brain tumor dataset while generating synthetic samples that improve downstream model training.

## Introduction

### The Data Challenge

Brain tumor datasets suffer from:

- **Scarcity**: Rare tumor types have few examples
- **Imbalance**: Gliomas are 10x more common than pituitary tumors
- **Privacy**: Medical data sharing is restricted

### Our Contribution

We address these challenges by:

1. Generating synthetic training data
2. Learning classification jointly with generation
3. Providing interpretable feature representations

## Related Work

| Method                 | Accuracy  | Data Augmentation  |
| ---------------------- | --------- | ------------------ |
| VGG-16 (2019)          | 91.2%     | Traditional        |
| ResNet-50 (2020)       | 94.7%     | Traditional        |
| EfficientNet (2021)    | 96.3%     | AutoAugment        |
| DCGAN + CNN (2022)     | 97.8%     | GAN-based          |
| **AC-StyleGAN (Ours)** | **99.5%** | **StyleGAN-based** |

## Method

### Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                      AC-StyleGAN                              │
├──────────────────────────────────────────────────────────────┤
│  Mapping Network: z → w (8 FC layers)                        │
│  Synthesis Network: w → image (StyleGAN2 generator)          │
│  Auxiliary Classifier: features → class (attached to D)      │
└──────────────────────────────────────────────────────────────┘
```

### Generator

Based on StyleGAN2 with medical imaging adaptations:

```python
class ACStyleGenerator(nn.Module):
    def __init__(self, z_dim=512, w_dim=512, num_classes=4):
        super().__init__()
        self.mapping = MappingNetwork(z_dim, w_dim, num_layers=8)
        self.synthesis = SynthesisNetwork(w_dim, img_resolution=256)
        self.class_embedding = nn.Embedding(num_classes, w_dim)

    def forward(self, z, class_label):
        # Condition on class
        class_embed = self.class_embedding(class_label)
        w = self.mapping(z) + class_embed
        img = self.synthesis(w)
        return img, w
```

### Discriminator with Auxiliary Classifier

```python
class ACDiscriminator(nn.Module):
    def __init__(self, num_classes=4):
        super().__init__()
        self.backbone = StyleGAN2Discriminator()
        self.classifier = nn.Linear(512, num_classes)

    def forward(self, img):
        features = self.backbone.extract_features(img)
        real_fake = self.backbone.output(features)
        class_pred = self.classifier(features)
        return real_fake, class_pred
```

### Training Objective

$$\mathcal{L} = \mathcal{L}_{GAN} + \lambda_{cls} \mathcal{L}_{cls} + \lambda_{R1} \mathcal{L}_{R1}$$

- $\mathcal{L}_{GAN}$: Non-saturating GAN loss with R1 regularization
- $\mathcal{L}_{cls}$: Cross-entropy classification loss
- $\mathcal{L}_{R1}$: Gradient penalty for stable training

## Dataset

### Brain Tumor MRI Dataset (Kaggle)

- **Total Images**: 7,023
- **Classes**:
  - Glioma: 2,500 (35.6%)
  - Meningioma: 2,100 (29.9%)
  - Pituitary: 1,823 (26.0%)
  - No Tumor: 600 (8.5%)

### Preprocessing

- Resized to 256×256
- Intensity normalization
- Skull stripping
- Data augmentation (rotation, flip, elastic deformation)

## Results

### Classification Performance

| Class       | Precision | Recall    | F1-Score  |
| ----------- | --------- | --------- | --------- |
| Glioma      | 0.996     | 0.998     | 0.997     |
| Meningioma  | 0.993     | 0.991     | 0.992     |
| Pituitary   | 0.997     | 0.996     | 0.996     |
| No Tumor    | 0.994     | 0.995     | 0.995     |
| **Average** | **0.995** | **0.995** | **0.995** |

### Confusion Matrix

```
              Predicted
           Gli  Men  Pit  NoT
Actual
Glioma     498    1    0    1
Meningioma   2  415    2    1
Pituitary    0    1  362    2
No Tumor     1    0    0  119
```

### Generated Sample Quality

| Metric                    | Value |
| ------------------------- | ----- |
| FID Score                 | 12.3  |
| Inception Score           | 3.42  |
| Radiologist Realism Score | 4.2/5 |

### Synthetic Data Utility

Training classifiers with synthetic augmentation:

| Training Data                 | Test Accuracy |
| ----------------------------- | ------------- |
| Real only (7,023)             | 94.2%         |
| Real + Traditional Aug        | 96.1%         |
| Real + GAN Synthetic (14,046) | 98.7%         |
| Real + AC-StyleGAN (14,046)   | **99.3%**     |

## Ablation Studies

### Impact of Auxiliary Classification

| Configuration             | FID      | Classification Acc |
| ------------------------- | -------- | ------------------ |
| StyleGAN2 (no classifier) | 15.7     | N/A                |
| AC-GAN (standard)         | 18.2     | 96.3%              |
| **AC-StyleGAN (ours)**    | **12.3** | **99.5%**          |

### Latent Space Analysis

t-SNE visualization shows clear class separation in the W latent space, indicating the model learns meaningful tumor representations.

## Clinical Relevance

### Interpretability

We identify which image regions drive classification:

- Glioma: Irregular borders, heterogeneous enhancement
- Meningioma: Dural attachment, homogeneous
- Pituitary: Sellar location, size

### Potential Applications

1. **Second opinion tool** for radiologists
2. **Training data generation** for rare tumors
3. **Educational material** generation
4. **Federated learning** without sharing real data

## Limitations

- 2D slices only (3D volumetric extension planned)
- Limited to three tumor types + normal
- Requires quality MRI input

## Conclusion

AC-StyleGAN demonstrates that joint generation and classification improves both tasks. The generated samples are realistic enough to augment training data, while the classifier achieves near-perfect accuracy.

## Code & Data

- Code: [github.com/lmikehq/ac-stylegan-tumor](https://github.com/lmikehq/ac-stylegan-tumor)
- Paper: [https://doi.org/10.1007/s10916-023-01932-x](https://doi.org/10.1007/s10916-023-01932-x)
- Pretrained Models: Available on HuggingFace
