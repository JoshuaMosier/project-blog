---
title: Nutricient - Optimizing Dining Hall Nutrition
date: 2021-03-28
image: ./nutricient.png
categories: ["programming"]
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/nutricient/nutricient.png" 
        alt="Cinetrics Dashboard" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
    <a 
        href="https://devpost.com/software/nutricient" 
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"
        target="_blank" 
        rel="noopener noreferrer"
    >
        View project on Devpost →
    </a>
</div>

A web application that optimizes meal choices in Virginia Tech dining halls using linear programming to help students maintain balanced nutrition while meeting their dietary goals.

## The Problem

Many college students struggle to maintain a balanced diet while eating in dining halls. Whether trying to meet specific fitness goals, manage allergies, or simply eat healthily, it can be overwhelming to analyze nutritional information for every meal option. My brother's quest to maximize protein intake while maintaining balanced nutrition inspired me to tackle this challenge at scale.

## The Solution

Nutricient is a web application that:
- Automatically scrapes nutritional data from VT dining halls
- Takes user inputs for:
  - Metabolic information
  - Dietary restrictions and allergies
  - Preferred dining locations
  - Target nutrient goals
- Uses linear optimization (PuLP) to calculate ideal meal combinations
- Minimizes calories while meeting nutritional targets
- Allows users to iteratively refine results by excluding unwanted items

## Technical Implementation

The application stack includes:
- Python/Flask backend deployed on Google App Engine
- Bootstrap-based single-page application frontend
- Automated data collection using Google Cloud Functions and Cloud Scheduler
- Data storage in Google Cloud Storage buckets
- PuLP library for linear optimization calculations

## Key Challenges

The biggest hurdles came from working with Google Cloud Platform:
- Setting up reliable cron jobs for data collection
- Managing cloud function deployments
- Configuring storage buckets efficiently
- Domain routing and DNS configuration

## Future Developments

The project has several planned expansions:
- Including on-campus restaurant nutritional data
- Adding local grocery store options
- Incorporating complete meal recipes
- Improving edge case handling and form validation
- Enhanced UI/UX improvements

This project demonstrates how mathematical optimization can be applied to everyday problems, making it easier for students to maintain healthy eating habits while navigating campus dining options.

[View the project on Devpost →](https://devpost.com/software/nutricient)

*This project won 3rd place at VTHacks 7.*