---
id: 5
title: "Agro-Detect"
slug: "agro-detect"
category: "IoT & AI"
description: "Deployed edge-AI models on Raspberry Pi devices to detect crop diseases in real-time using drone imagery."
image: "https://picsum.photos/600/400?random=5"
stats:
  - label: "Accuracy"
    value: "95%"
  - label: "Devices"
    value: "50+"
technologies:
  ["Python", "TensorFlow Lite", "Raspberry Pi", "OpenCV", "MQTT", "LoRaWAN"]
github: "https://github.com/r33ldev/agro-detect"
demo: ""
featured: false
date: "2022-02-28"
---

## Overview

Agro-Detect brings AI-powered crop disease detection to smallholder farmers using affordable edge devices. The system processes drone imagery in real-time, identifying diseased plants before visible symptoms appear.

## The Challenge

Smallholder farmers in developing regions face:

- Limited access to agricultural experts
- Crop diseases spreading before detection
- High costs of manual field inspection
- Poor internet connectivity

## Solution Architecture

### Hardware Setup

- **Capture**: DJI Mini 3 drone with 4K camera
- **Processing**: Raspberry Pi 4 with Coral TPU
- **Communication**: LoRaWAN for remote areas
- **Power**: Solar-powered base stations

### Model Pipeline

```python
class DiseaseDetector:
    def __init__(self):
        self.interpreter = tflite.Interpreter(
            model_path='disease_model.tflite',
            experimental_delegates=[tflite.load_delegate('libedgetpu.so.1')]
        )
        self.interpreter.allocate_tensors()

    def detect(self, frame):
        # Preprocess
        input_tensor = preprocess(frame)

        # Inference on TPU
        self.interpreter.set_tensor(self.input_details[0]['index'], input_tensor)
        self.interpreter.invoke()

        # Get predictions
        output = self.interpreter.get_tensor(self.output_details[0]['index'])
        return self.decode_predictions(output)
```

### Diseases Detected

1. **Maize**: Gray leaf spot, Northern corn blight
2. **Cassava**: Bacterial blight, Brown streak
3. **Tomato**: Early blight, Late blight, Leaf mold
4. **Rice**: Blast, Brown spot, Bacterial leaf blight

## Edge Optimization

To run on Raspberry Pi:

- Model quantization: INT8
- Model size: 8MB
- Inference: 30 FPS
- Power: <5W

## Field Results

Deployed across 50+ farms in Nigeria:

- **95% detection accuracy**
- **40% reduction** in crop losses
- **72-hour earlier** detection than manual
- **$200 device cost** (vs $5000+ alternatives)

## Impact

- 1,000+ hectares monitored
- 500+ farmers trained
- 3 agricultural cooperatives partnered
- Featured in UN FAO innovation report

## Lessons Learned

1. Battery life is crucial in field conditions
2. Farmers prefer audio alerts over app notifications
3. Local language support increases adoption
4. Simple UI trumps feature-rich interfaces
