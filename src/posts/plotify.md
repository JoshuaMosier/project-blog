---
title: "Plotify: Visualizing Your Spotify Listening Habits"
date: 2020-01-01
image: ./plotify.png
---

Ever wondered what your music taste really looks like? While Spotify Wrapped gives us a yearly glimpse into our listening habits, I wanted to create something that could provide deeper insights at any time. Enter Plotify: a web application that transforms your Spotify data into meaningful visualizations.

<div class="video-container">
    <iframe
        width="100%"
        height="400"
        src="https://www.youtube.com/embed/-fWwEvjGPtg"
        title="Plotify Demo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>

## What is Plotify?

Plotify is a web application that connects to your Spotify account to analyze and visualize your listening habits. It displays detailed information about your top artists, tracks, genres, and playlists through interactive charts and graphs.

## Technical Implementation

Built during HooHacks 2021 in just 24 hours, Plotify combines several technologies:

- **Backend**: Flask (Python) handles the server-side logic and Spotify API authentication
- **Data Visualization**: Combination of D3.js and Chart.js for creating interactive visualizations
- **API Integration**: Direct integration with Spotify's API for fetching user data
- **Data Processing**: Python scripts for processing and organizing Spotify data into meaningful visualizations

## Features

- Authorization with Spotify accounts
- Visualization of top artists and tracks
- Genre distribution analysis
- Playlist insights
- Timeline-based listening patterns

## Challenges and Learnings

Building Plotify in 24 hours came with its share of challenges. Working with charting libraries under time pressure required quick decision-making and efficient troubleshooting. The project taught me valuable lessons about API integration, data visualization, and rapid development.

## Future Plans

The current version of Plotify is just the beginning. Future plans include:

- Support for uploading complete listening history
- Long-term trend analysis
- Music preference evolution tracking
- Enhanced visualization options


*This project was built for HooHacks 2021.*