---
id: 2
title: "Travel Price Predictor"
slug: "travel-price-predictor"
category: "Predictive Analytics"
description: "A time-series forecasting model deployed for Thrillers Travels that predicts optimal booking windows for flights and hotels to maximize revenue."
image: "/img/price-predictor.png"
stats:
  - label: "Data Points"
    value: "10M+"
  - label: "Rev. Impact"
    value: "High"
technologies:
  ["Python", "Prophet", "XGBoost", "AWS SageMaker", "Airflow", "Snowflake"]
github: ""
demo: ""
featured: true
date: "2023-08-20"
---

## Overview

The Travel Price Predictor is a sophisticated time-series forecasting system that analyzes historical pricing data, seasonal patterns, and market signals to predict optimal booking windows for flights and hotels.

## Business Problem

Thrillers Travels needed to:

- Maximize revenue by suggesting optimal pricing
- Help customers find the best booking times
- Reduce inventory waste from poor timing
- Compete with larger OTAs using data-driven insights

## Data Pipeline

We built a robust data pipeline processing over 10 million data points daily:

### Data Sources

- Historical booking data (5 years)
- Competitor pricing (scraped hourly)
- Flight capacity data
- Seasonal events calendar
- Economic indicators

### Feature Engineering

```python
def create_features(df):
    df['day_of_week'] = df['date'].dt.dayofweek
    df['days_until_departure'] = (df['departure'] - df['date']).dt.days
    df['is_holiday_season'] = df['date'].apply(check_holiday)
    df['competitor_price_ratio'] = df['our_price'] / df['competitor_avg']
    return df
```

## Model Architecture

We employed an ensemble approach combining:

1. **Prophet**: For capturing seasonality and trends
2. **XGBoost**: For feature-based predictions
3. **LSTM**: For sequential pattern recognition

The final prediction is a weighted average based on recent performance.

## MLOps Pipeline

The entire system runs on AWS SageMaker with:

- **Training**: Weekly retraining on fresh data
- **Inference**: Real-time predictions via API
- **Monitoring**: CloudWatch dashboards for model drift
- **A/B Testing**: Continuous evaluation against baseline

## Results

- **15% increase** in revenue from dynamic pricing
- **23% improvement** in booking conversion rates
- **$50K+ saved** annually from optimized inventory
- **Real-time predictions** in under 100ms

## Key Insights

1. Booking patterns vary significantly by destination type
2. Competitor pricing is highly predictive within 48 hours
3. Social media signals provide early demand indicators
4. Weather forecasts impact last-minute bookings
