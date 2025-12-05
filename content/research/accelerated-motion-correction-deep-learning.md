---
id: 2
title: "Accelerated Motion Correction with Deep Learning for Functional MRI"
slug: "accelerated-motion-correction-deep-learning"
conference: "Radiological Society of North America (RSNA)"
date: "2024"
abstract: "A deep learning based accelerated motion correction pipeline for fMRI data using a Dual-Head ResNet Regressor to mitigate patient movement artifacts."
link: "#"
tags: ["Computer Vision", "Medical Imaging", "ResNet"]
authors: ["Michael E. Adebisi", "Dr. James Liu", "Dr. Emily Martinez"]
institution: "Massachusetts General Hospital"
---

## Abstract

Head motion during fMRI acquisition introduces devastating artifacts that corrupt functional connectivity analyses. Traditional retrospective motion correction methods are computationally expensive and often insufficient. We present a deep learning approach using a Dual-Head ResNet architecture that achieves real-time motion parameter estimation with sub-millimeter accuracy.

## Introduction

Motion remains the greatest technical challenge in fMRI:

- **Even small movements (0.5mm) corrupt data**
- **Traditional methods take hours of post-processing**
- **Children, elderly, and patients with movement disorders are often excluded**

Our solution enables:

- Real-time motion estimation during scanning
- Prospective correction at acquisition
- Expanded fMRI accessibility

## Technical Approach

### Dual-Head Architecture

We designed a specialized network with two prediction heads:

```python
class DualHeadMotionNet(nn.Module):
    def __init__(self):
        super().__init__()
        # Shared feature extractor
        self.backbone = ResNet50(pretrained=True, in_channels=1)

        # Translation head (x, y, z)
        self.translation_head = nn.Sequential(
            nn.Linear(2048, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 3)
        )

        # Rotation head (pitch, roll, yaw)
        self.rotation_head = nn.Sequential(
            nn.Linear(2048, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 3)
        )

    def forward(self, x):
        features = self.backbone(x)
        translation = self.translation_head(features)
        rotation = self.rotation_head(features)
        return translation, rotation
```

### Training Strategy

**Loss Function**: Weighted combination optimized for clinical relevance

```python
def motion_loss(pred_trans, pred_rot, true_trans, true_rot):
    trans_loss = F.mse_loss(pred_trans, true_trans)
    rot_loss = F.mse_loss(pred_rot, true_rot)

    # Weight rotation more heavily (clinically more impactful)
    return trans_loss + 2.0 * rot_loss
```

**Data Augmentation**: Synthetic motion injection to increase training diversity

## Dataset

### Training Data

- 5,000 fMRI sessions from Human Connectome Project
- Synthetically augmented with known motion parameters
- Diverse population: healthy adults, patients, elderly

### Validation Data

- 500 sessions with optical tracking ground truth
- Real-world motion from clinical population

## Results

### Accuracy

| Method      | Translation MAE | Rotation MAE | Time/Volume |
| ----------- | --------------- | ------------ | ----------- |
| SPM12       | 0.42mm          | 0.38°        | 2.1s        |
| FSL MCFLIRT | 0.38mm          | 0.35°        | 1.8s        |
| FreeSurfer  | 0.35mm          | 0.32°        | 3.5s        |
| **Ours**    | **0.12mm**      | **0.11°**    | **0.02s**   |

### Real-time Performance

- Inference: 20ms per volume (50 Hz)
- Compatible with standard 2s TR acquisition
- Runs on single NVIDIA T4 GPU

### Clinical Validation

In a prospective study of 100 patients:

| Metric       | Without Our Method | With Our Method |
| ------------ | ------------------ | --------------- |
| Usable scans | 67%                | 94%             |
| Rescan rate  | 28%                | 5%              |
| Scan time    | 45 min             | 32 min          |

## Implementation Details

### Hardware Requirements

- Minimum: NVIDIA GTX 1080 (8GB VRAM)
- Recommended: NVIDIA T4 or better
- CPU fallback available (100ms inference)

### Integration

- DICOM-compatible output
- Works with major scanner vendors (Siemens, GE, Philips)
- Open-source release planned

## Discussion

Our Dual-Head architecture outperforms traditional methods by:

1. **Learning motion-specific features** rather than generic registration
2. **Separating translation and rotation** which have different characteristics
3. **Leveraging large-scale pretraining** from natural images

## Clinical Impact

This technology enables:

- Pediatric fMRI studies previously impossible
- Parkinson's and essential tremor patient inclusion
- Reduced scan times and costs
- Research in underserved populations

## Limitations

- Requires GPU for real-time operation
- Trained primarily on 3T data (7T validation ongoing)
- Large rotations (>5°) still challenging

## Conclusion

Deep learning can solve motion correction in real-time, dramatically expanding who can benefit from fMRI technology.

## Code Availability

Code and pretrained models: [github.com/mikehq/motion-correction-dl](https://github.com/mikehq/motion-correction-dl)
