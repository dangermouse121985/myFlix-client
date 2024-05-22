# myFlix-client

## Intro

MyFlix is a client side app used to view a list of movies. Users will be able to login and view information about movies, such as actors, directors, genre and more. The user will also be able to add and remove movies from their favorites list, update their profile information and unregister (if they desite).

The front end is built using React and accesses the MyFlix API.

## Design Criteria

### User Stories

The following feature requirements were extracted from the user stories just listed. Please note, your
project will only be approved if the following essential feature requirements are implemented in your
Achievement project.

### Essential View & Features

#### Main View

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

#### Single Movie View

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

#### Login View

- Allows users to log in with a username and password

#### Signup View

- Allows new users to register (username, password, email, date of birth)

#### Profile View

Displays user registration details

- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Installation Instructions

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dangermouse121985/myFlix-client
   cd myflix-client
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the App Locally**
   ```bash
   npm start
   ```
