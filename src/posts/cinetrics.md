---
title: Cinetrics - Your Personal Movie Critic Matchmaker
date: 2021-02-27
image: ./cinetrics.png
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/cinetrics/cinetrics.png" 
        alt="Cinetrics Dashboard" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
    <a 
        href="https://devpost.com/software/cinetrics" 
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"
        target="_blank" 
        rel="noopener noreferrer"
    >
        View project on Devpost →
    </a>
</div>

Ever spend more time scrolling through Netflix than actually watching something? We built Cinetrics to solve this common dilemma by matching you with film critics who share your taste in movies.

## The Problem

With countless streaming options available today, finding quality content has become increasingly challenging. While there are many movie critics out there, finding one whose taste aligns with yours traditionally required reading through countless reviews - until now.

## Our Solution

Cinetrics is an intelligent recommendation platform that pairs users with professional movie critics based on their viewing preferences. By rating just a handful of movies, our algorithm identifies critics whose taste matches yours, providing personalized and reliable movie recommendations.

## Technical Implementation

We built Cinetrics using a modern tech stack focused on scalability and real-time processing:

- **Frontend**: React-based single-page application
- **Backend**: Python API with asynchronous event handling
- **Database**: CockroachDB for reliable data storage
- **Infrastructure**: Google Cloud Platform (App Engine and Cloud SQL)
- **Data Sources**: Rotten Tomatoes critic reviews and TMDb API for movie metadata

### Smart Rating Analysis

Unlike traditional review aggregators (IMDb, Rotten Tomatoes, Metacritic), we developed a sophisticated algorithm that:
- Normalizes different rating scales used by critics
- Aligns critic opinions with audience perspectives
- Requires minimal user input to generate accurate matches
- Uses encrypted communication and secure password storage

## Future Developments

We're working on implementing machine learning capabilities to:
- Predict critic ratings for unreviewed movies
- Generate realistic movie ratings based on review history
- Reduce the number of user ratings needed for accurate matching

*This project won the MLH Best Use of CockroachDB award at VTHacks 8.*