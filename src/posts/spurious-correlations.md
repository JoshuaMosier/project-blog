---
title: Wikipedia vs Wall Street - Spurious Correlations
description: "A data visualization tool finding absurd correlations between S&P 500 stocks and Wikipedia page views."
date: 2024-10-06
image: ./spurious-correlations.png
categories: ["programming"]
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/spurious-correlations/spurious-correlations.png"
        alt="A beautiful but meaningless correlation"
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg"
    />
    <p class="text-sm text-gray-600 italic mt-2">
        Click image to view details.
    </p>
</div>

Ever wonder if the stock market follows the same trends as Wikipedia page views about banana bread? No? Well, inspired by Tyler Vigen's "Spurious Correlations," I built a tool to find the most absurd connections between S&P 500 stock prices and Wikipedia page view statistics.

>*Correlation will imply causation*

## The "Problem"

Stock market analysts spend countless hours trying to predict market movements using technical analysis, fundamental research, and probably crystal balls. But what if the real indicators were hiding in plain sight... on Wikipedia?

## The "Solution"

I created a tool that:
- Downloads historical S&P 500 stock prices
- Grabs Wikipedia page view statistics
- Finds correlations between them
- Visualizes these statistically insignificant relationships

## Technical Implementation

- **Data Collection**: Python scripts to grab stock prices and Wikipedia pageviews
- **Storage**: SQLite database
- **Analysis**: Pandas for number crunching and correlation hunting
- **Visualization**: Streamlit dashboard for interactive exploration

## Notable Discoveries

Some of my favorite "findings" include:
- A 95% correlation between NVIDIA stock and the article views of "2025", "Geography_of_south_korea", and "Assassinated"
- A negative 86% correlation between Exxon Stock and "Facebook_Messenger" and "Faith_in_Christianity"
- Apple stock correlating 94% with the trend of "Left_Socialist-Revolutionaries"