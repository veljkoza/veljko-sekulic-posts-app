
# 🌟 React Posts Assignment

## Introduction

Welcome to the React Posts Assignment ! This application is a feature-rich platform for displaying posts and associated comments, designed with performance and scalability in mind. 🚀

## Features

- **Data Fetching Library**: Created a custom library inspired by my open source npm package [react-query-factory](https://www.npmjs.com/package/react-query-factory) for efficient data fetching. 🛠️
- **Client-Side Caching**: Implemented custom caching to minimize network requests and enhance user experience. 💾
- **Virtualized Posts List**: Virtualization techniques used for rendering posts list to handle large datasets without pagination. 📜
- **Lazy Loading**: Comments and users are loaded on-demand, ensuring resource optimization. 📦
- **Dependency Injection**: `HttpClient` abstracted through context for easy mock substitution during testing. 🔄
- **Modular Architecture**: Developed with a focus on modular design to facilitate maintainability and scalability. 🧩

## Getting Started

To get the application running:

1. Clone the repo: `git clone [repository-link]`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. Visit `http://localhost:5173/` to view the app.

## Architecture

The application is structured with a focus on modularity and separation of concerns:

- `src/app/features`: Contains the core features of the application, like post details and feed.
- `src/app/providers`: Includes context providers such as cache and HTTP client.
- `src/services`: Houses the core utilities and services for data fetching.
- `src/services`: Houses the HTTP client.
- `src/models`: Defines the data models used across the application.
- `src/ui`: Contains presentational components which are fully decoupled from rest of the codebase.
