---
id: 3
title: "Harmonizing tb-fMRI and rs-fMRI: A Generative approach for mapping Language Networks"
slug: "harmonizing-tb-fmri-rs-fmri"
conference: "European Congress of Radiology"
date: "2024"
abstract: "Utilizing generative modeling to map task-based fMRI analogous brain activity maps for Language network using rs-fMRI connectivity."
link: "https://epos.myesr.org/poster/esr/ecr2024/C-11442"
tags: ["Generative AI", "Neuroscience", "GANs"]
authors: ["Michael E. Adebisi", "Dr. Anna Kowalski", "Prof. David Thompson"]
institution: "University College London"
---

## Abstract

Task-based fMRI (tb-fMRI) provides precise localization of language networks but requires patient cooperation. Resting-state fMRI (rs-fMRI) is easier to acquire but lacks direct functional mapping. We present a conditional generative adversarial network that synthesizes tb-fMRI activation maps from rs-fMRI connectivity data, enabling language mapping in uncooperative patients.

## Clinical Motivation

Pre-surgical language mapping is critical for:

- Brain tumor resection planning
- Epilepsy surgery evaluation
- Stroke rehabilitation assessment

**The Problem**: Many patients cannot perform language tasks:

- Children under 5 years
- Patients with aphasia
- Cognitively impaired individuals
- Sedated patients

**Our Solution**: Generate task activation maps from resting-state data they _can_ acquire.

## Method Overview

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Generator (U-Net)                     │
│  rs-fMRI connectivity → Synthetic tb-fMRI activation    │
├─────────────────────────────────────────────────────────┤
│                   Discriminator (PatchGAN)               │
│  Real vs Synthetic tb-fMRI classification               │
└─────────────────────────────────────────────────────────┘
```

### Conditional GAN Design

```python
class LanguageMapGenerator(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = UNetEncoder(in_channels=116)  # ROI connectivity
        self.decoder = UNetDecoder(out_channels=1)   # Activation map

    def forward(self, connectivity_matrix):
        # Input: 116x116 connectivity matrix
        features = self.encoder(connectivity_matrix)
        # Output: 91x109x91 activation volume
        activation = self.decoder(features)
        return activation

class Discriminator(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = PatchGAN3D(in_channels=2)  # rs-fMRI + activation

    def forward(self, connectivity, activation):
        combined = torch.cat([connectivity, activation], dim=1)
        return self.model(combined)
```

### Training Objective

We combine adversarial loss with anatomical constraints:

$$\mathcal{L} = \mathcal{L}_{adv} + \lambda_1 \mathcal{L}_{L1} + \lambda_2 \mathcal{L}_{anatomy}$$

Where:

- $\mathcal{L}_{adv}$: Standard GAN loss
- $\mathcal{L}_{L1}$: Voxel-wise reconstruction
- $\mathcal{L}_{anatomy}$: Ensures activation in plausible brain regions

## Dataset

### Training Set

- 500 healthy subjects from HCP dataset
- Paired rs-fMRI and language task fMRI
- Story comprehension and word generation tasks

### Clinical Validation

- 50 pre-surgical patients with confirmed language lateralization
- Wada test as gold standard

## Results

### Spatial Overlap

Dice coefficient between generated and real activations:

| Brain Region    | Dice Score |
| --------------- | ---------- |
| Broca's Area    | 0.78       |
| Wernicke's Area | 0.82       |
| Angular Gyrus   | 0.71       |
| **Average**     | **0.77**   |

### Lateralization Accuracy

Critical for surgical planning:

| Method                     | Lateralization Agreement with Wada |
| -------------------------- | ---------------------------------- |
| Real tb-fMRI               | 94%                                |
| **Our Synthetic**          | **88%**                            |
| rs-fMRI connectivity alone | 71%                                |

### Clinical Case Examples

**Case 1**: 4-year-old with left temporal tumor

- Could not perform language tasks
- Our method correctly identified right-hemisphere language
- Surgery proceeded safely with preserved language function

**Case 2**: Adult with Wernicke's aphasia

- Unable to complete standard tasks
- Synthetic maps showed bilateral language organization
- Informed more conservative surgical approach

## Advantages Over Alternatives

| Method         | Requires Task  | Accuracy | Patient Burden |
| -------------- | -------------- | -------- | -------------- |
| tb-fMRI        | Yes            | 94%      | High           |
| Wada Test      | Yes (invasive) | 96%      | Very High      |
| TMS            | Yes            | 85%      | Moderate       |
| **Our Method** | No             | 88%      | Low            |

## Limitations

1. **Training data bias**: HCP subjects are healthy adults
2. **Atypical organization**: May miss unusual lateralization patterns
3. **Tumor effects**: Mass effect can distort connectivity

## Future Directions

- Training on patient populations
- Extension to motor and visual networks
- Integration with surgical navigation systems
- Multi-center validation study

## Conclusion

Our generative approach bridges the gap between easy-to-acquire resting-state data and clinically essential task-based mapping. This technology could expand access to precision neurosurgery for vulnerable patient populations.

## Resources

- Paper: [https://epos.myesr.org/poster/esr/ecr2024/C-11442](https://epos.myesr.org/poster/esr/ecr2024/C-11442)
- Code: Available upon request for research purposes
