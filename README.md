# 💻 React Posts Assignment

## Introduction

Welcome to the React Posts Assignment ! This application is a feature-rich platform for displaying posts and associated comments, designed with performance and scalability in mind. 🚀

Deployed on Vercel for you to click around:
https://veljko-sekulic-q-agency.vercel.app/

## Features

- **Data Fetching Library**: Created a custom small library inspired by my open source npm package [react-query-factory](https://www.npmjs.com/package/react-query-factory) for efficient data fetching.
- **Client-Side Caching**: Implemented custom caching to minimize network requests and enhance user experience. Users and Comments are cached so they don't have to be refetched each time.
- **Virtualized Posts List**: Virtualization techniques used for rendering posts list to handle large datasets without pagination ensuring low load on the DOM.
- **Lazy Loading**: Because of the API limitations Comments and users are loaded on-demand, ensuring resource optimization.
- **Dependency Injection**: `HttpClient` abstracted through context for easy mock substitution during testing.
- **Modular Architecture**: Developed with a focus on modular design to facilitate maintainability and scalability.

## Getting Started

To get the application running:

1. Clone the repo: `git clone git@github.com:veljkoza/veljko-sekulic-posts-app.git`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. Visit `http://localhost:5173/` to view the app.

Wait, but you haven't copied the `.env.example` to `.env`:

```sh
cp .env.example .env
```

In real world we wouldn't use actual values here, but since `API_URL` is public we shouldn't worry.

## Architecture

The application is structured with a focus on modularity and separation of concerns:

- `src/app/features`: Contains the core features of the application, like post details and feed.
- `src/app/providers`: Includes context providers such as cache and HTTP client.
- `src/services`: Houses the core utilities and services for data fetching.
- `src/infrastructure`: Houses the HTTP client.
- `src/models`: Defines the data models used across the application.
- `src/ui`: Contains presentational components which are fully decoupled from rest of the codebase.


In ideal world, we would build application inside of monorepo or similar. Our application would serve for presentation purposes only, while business logic would be separated into separate packages like `models`, `services`, `infrastructure`, etc. That way we could have core logic decoupled from UI, even React.

## Virtualization

Because we have to fetch a large amount of Posts initially, due to API limitations, if we don't make any kind of optimization, the client code will create a lot of nodes in the DOM. Even if 90% of those nodes aren't visible to the user, and aren't important until they come into the viewport. Enter the Virtualization tehnique.
With virtualization we only populate DOM Nodes which are visible, improving performance of the application on low end devices drastically.



https://github.com/veljkoza/veljko-sekulic-q-agency/assets/45906772/b9e38cf1-417e-4e0a-bcdb-60f332d39aae

## Caching

Since we don't get all necessary information with the Posts resource, we have to fetch the Users and Comments separately. A lot of Comments are placed by the same User, so there is no need to fetch the user each time for each comment. Instead what we do is cache the User and try to use it in our components if it exists. Same thing with Comments.
For that reason I've implemented primitive version of Caching system with `CacheProvider`. You'll notice when navigating to the `post/:id` route that data is shown "optimistically" or from cache. While in background we fetch real data. 

## Tech Stack

- Vanilla **React**
- **Typescript** to the max
- **CSS Modules**
- and one **Life saving Prettier plugin for organizing imports** - [prettier-plugin-organize-imports](https://www.npmjs.com/package/prettier-plugin-organize-imports)


