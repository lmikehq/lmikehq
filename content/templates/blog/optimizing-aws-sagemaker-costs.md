---
id: 3
title: "Optimizing AWS SageMaker Costs"
slug: "optimizing-aws-sagemaker-costs"
excerpt: "Practical strategies for managing cloud infrastructure costs when training large language models."
date: "2024-08-15"
readTime: "6 min read"
category: "Cloud Engineering"
image: "https://picsum.photos/800/600?random=12"
author: "Michael E. Adebisi"
tags: ["AWS", "SageMaker", "Cost Optimization", "Cloud", "MLOps"]
---

Last month, I received an AWS bill that made me question my career choices. $47,000 for a month of SageMaker usage. After the initial panic subsided, I dove deep into cost optimization and cut our bill by 60%.

Here's everything I learned.

## The Hidden Costs of ML on AWS

When you think of ML costs, you think of GPU hours. But the real cost breakdown often looks like this:

```
Training Compute:     40%
Inference Endpoints:  35%
Storage (S3):         15%
Data Transfer:        10%
```

That always-on inference endpoint? It's quietly draining your budget.

## Strategy 1: Spot Instances for Training

Spot instances can save you 70-90% on compute costs. Yes, they can be interrupted, but with proper checkpointing, that's fine.

```python
from sagemaker.estimator import Estimator

estimator = Estimator(
    image_uri=training_image,
    role=role,
    instance_count=1,
    instance_type='ml.p3.2xlarge',
    use_spot_instances=True,  # 👈 This one line saves 70%
    max_wait=7200,
    max_run=3600,
    checkpoint_s3_uri=f's3://{bucket}/checkpoints/'
)
```

### Spot Instance Tips

1. **Always checkpoint**: Save model state every N steps
2. **Use max_wait**: Set timeout for spot capacity
3. **Have fallback**: Fall back to on-demand if critical

## Strategy 2: Right-Size Your Instances

I see teams using `ml.p4d.24xlarge` ($32/hour) when `ml.g4dn.xlarge` ($0.53/hour) would suffice.

### Instance Selection Guide

| Use Case              | Recommended     | Why                        |
| --------------------- | --------------- | -------------------------- |
| Development           | ml.t3.medium    | Cheap, good for notebooks  |
| Small models (<1B)    | ml.g4dn.xlarge  | Single GPU, cost-effective |
| Medium models (1-10B) | ml.p3.2xlarge   | Good GPU memory            |
| Large models (>10B)   | ml.p4d.24xlarge | Multi-GPU, NVLink          |

### How to Profile

```python
import sagemaker
from sagemaker.debugger import ProfilerConfig

profiler_config = ProfilerConfig(
    system_monitor_interval_millis=500,
    framework_profile_params=FrameworkProfile()
)

estimator = Estimator(
    # ... other params
    profiler_config=profiler_config
)
```

Check utilization in SageMaker Debugger. If GPU utilization < 70%, downgrade.

## Strategy 3: Inference Cost Optimization

### Multi-Model Endpoints

Instead of one endpoint per model, host multiple models on one endpoint:

```python
from sagemaker.multidatamodel import MultiDataModel

mme = MultiDataModel(
    name='my-multi-model-endpoint',
    model_data_prefix=f's3://{bucket}/models/',
    sagemaker_session=session
)

# Load model dynamically
predictor.predict(data, target_model='model_a.tar.gz')
```

Saves 80% when you have many low-traffic models.

### Serverless Inference

For sporadic traffic, use serverless endpoints:

```python
from sagemaker.serverless import ServerlessInferenceConfig

serverless_config = ServerlessInferenceConfig(
    memory_size_in_mb=2048,
    max_concurrency=5
)

model.deploy(serverless_inference_config=serverless_config)
```

You pay only for invocations, not idle time.

### Auto-Scaling

For consistent traffic, configure auto-scaling:

```python
client = boto3.client('application-autoscaling')

client.register_scalable_target(
    ServiceNamespace='sagemaker',
    ResourceId=f'endpoint/{endpoint_name}/variant/AllTraffic',
    ScalableDimension='sagemaker:variant:DesiredInstanceCount',
    MinCapacity=1,
    MaxCapacity=10
)

client.put_scaling_policy(
    PolicyName='target-tracking',
    ServiceNamespace='sagemaker',
    ResourceId=resource_id,
    ScalableDimension='sagemaker:variant:DesiredInstanceCount',
    PolicyType='TargetTrackingScaling',
    TargetTrackingScalingPolicyConfiguration={
        'TargetValue': 70.0,
        'PredefinedMetricSpecification': {
            'PredefinedMetricType': 'SageMakerVariantInvocationsPerInstance'
        },
        'ScaleInCooldown': 300,
        'ScaleOutCooldown': 60
    }
)
```

## Strategy 4: Storage Optimization

### S3 Lifecycle Policies

Training artifacts pile up. Set lifecycle rules:

```json
{
  "Rules": [
    {
      "ID": "DeleteOldCheckpoints",
      "Filter": { "Prefix": "checkpoints/" },
      "Status": "Enabled",
      "Expiration": { "Days": 30 }
    },
    {
      "ID": "ArchiveOldModels",
      "Filter": { "Prefix": "models/" },
      "Status": "Enabled",
      "Transitions": [{ "Days": 90, "StorageClass": "GLACIER" }]
    }
  ]
}
```

### Use S3 Intelligent-Tiering

For unpredictable access patterns:

```bash
aws s3 cp model.tar.gz s3://bucket/models/ \
    --storage-class INTELLIGENT_TIERING
```

## Strategy 5: Reserved Capacity

If you have predictable workloads, SageMaker Savings Plans offer up to 64% savings:

| Commitment              | Discount |
| ----------------------- | -------- |
| 1 year, no upfront      | 26%      |
| 1 year, partial upfront | 34%      |
| 3 years, all upfront    | 64%      |

## My Results

After implementing these strategies:

| Cost Category | Before      | After       | Savings |
| ------------- | ----------- | ----------- | ------- |
| Training      | $18,800     | $5,640      | 70%     |
| Inference     | $16,450     | $6,580      | 60%     |
| Storage       | $7,050      | $3,525      | 50%     |
| Data Transfer | $4,700      | $3,055      | 35%     |
| **Total**     | **$47,000** | **$18,800** | **60%** |

## Quick Wins Checklist

- Enable spot instances for training
- Profile and right-size instances
- Use serverless/MME for low-traffic inference
- Configure auto-scaling
- Set S3 lifecycle policies
- Review and clean up unused endpoints weekly

---

_Building ML on AWS? I consult on cost optimization. [Let's chat](/contact)._
