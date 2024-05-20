# myFlix-client

## Intro

MyFlix is a client side app used to view a list of movies. Users will be able to login and view information about movies, such as actors, directors, genre and more. The user will also be able to add and remove movies from their favorites list, update their profile information and unregister (if they desite).

The front end is built using React and accesses the MyFlix API.

# Table of Contents

- [Design Criteria](#design-criteria)
  - [User Stories](#user-stories)
  - [Essential Views & Features](#essential-views--features)
    - [Main View](#main-view)
    - [Single Movie View](#single-movie-view)
    - [Login View](#login-view)
    - [Signup View](#signup-view)
    - [Profile View](#profile-view)
  - [Additional Views & Features](#additional-views--features)
    - [Actors View](#actors-view)
    - [Genre View](#genre-view)
    - [Director View](#director-view)
- [Technical Requirements](#technical-requirements)

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

### Additional Views & Features

#### Actors View
- Allows users to view information about different actors.

#### Genre View
- Returns data about a genre, with a name and description.
- Displays example movies.

#### Director View
- Returns data about a director (name, bio, birth year, death year).
- Displays example movies from the director.

## Technical Requirements
- The application is a single-page application (SPA).
- The application uses state routing to navigate between views and share URLs.
- The application gives users the option to filter movies using a “search” feature.
- The application uses Parcel as its build tool.
- The application is written using the React library and in ES2015+.
- The application uses Bootstrap as a UI library for styling and responsiveness.
- The application contains function components.
- The application uses React Redux for state management for filtering the movies list.
