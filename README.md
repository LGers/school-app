# Aqua Playground - The Crawler

## Description

The Crawler - It's a School management application that helps teachers and students in their
education processes.

The application have four roles for users: `USER`, `STUDENT`, `ADMIN`, `TEACHER`.

### All users have access to the next pages:

- the user is not authorized:
    - Home page;
    - Sign In;
    - Sign Up;
- the user is authorized:
    - Profile;

### The user have access to the next pages by role:

- `USER`:
    - User's welcome page.
- `STUDENT`:
    - Student's page.
- `ADMIN` or `TEACHER`:
    - Classes dashboard;
    - Teachers dashboard;
    - One class dashboard;


### Home page

The page contains information about School management application.

### Sign In page

The page contains form to sign in application.

### Sign Up page

The page contains form to sign up application.

### User's Welcome page

The page contains user's welcome page.

### Student's page

The page contains weekly diary with schedule of lessons and homework description.

### Classes dashboard

The page contains information about all classes in the school.

The `ADMIN` or `TEACHER` can:
- view the list of all classes;
- add new classes;
- update classes;
- delete classes;


### Teachers dashboard

The page contains information about all teacher in the school.

The `ADMIN` or `TEACHER` can:
- view the list of all teachers;
- add new teachers;
- delete teachers;

### One class dashboard

The page contains information about all students in the class.

The `ADMIN` or `TEACHER` can:
- see the list of all students in the class;
- add new students to the class;
- delete students from the class;
- move students to the another class;

--- 

## Api documentation

[Postman documentation](https://documenter.getpostman.com/view/20834690/2s8Z6yWsxF)

Setup Postman environments: `{{token}}`, `{{apiUrl}}` before use Postman.

---

## Installation

### Install NodeJS

- [Node.js](https://nodejs.org/en/)

### Install pgAdmin (PostgreSQL Tool):

- [Windows](https://www.pgadmin.org/download/pgadmin-4-windows/)
- [MacOS](https://www.pgadmin.org/download/pgadmin-4-macos/)
- [or choose your system](https://www.pgadmin.org/download/)

Create a new database in pgAdmin with the application's database name: `<db_name>`

### Clone this repository

```
git clone git@git.syberry.com:l.mychko/aqua-playground.git
cd aqua-playground
```

### Install server dependencies and run server

Create file:

`./server/.env` with the next content:

```
PORT=4000
DB_NAME=<db_name>
DB_USER=<db_user_name>
DB_PASSWORD=<db_password>
DB_HOST=localhost
DB_PORT=<5432>
DB_DIALECT=postgres
SECRET_KEY=<your_secret_key>
```

> If you don't change pgAdmin parameters during pgAdmin installation, you can try to set
> the default parameters:
> ```
> PORT=4000
> DB_NAME=<db_name>
> DB_USER=postgres
> DB_PASSWORD=root
> DB_HOST=localhost
> DB_PORT=5432
> DB_DIALECT=postgres
> SECRET_KEY=random_secret_key
>```

Install server dependencies:

```
cd server
npm install
```

Run server:

```
npm run dev
```

### Install client dependencies and run client

Install server dependencies:

Create file:

`./client/.env` with the next content:

```
REACT_APP_API_URL=http://localhost:4000
```

Go to the project folder: `./aqua-playground`

```
cd client
npm install
```

Run client:

```
npm run start
```

To get access `ADMIN` pages:
- Sign Up new user;
- Open **pgAdmin**;
- Find your database with name: <`db_name`>;
- Find users table: <`db_name`>`/Schemas/public/Tables/users` and by mouse Right Click select `View/Edit data > All Rows`;
- Select your new user and change role cell to `ADMIN` and save it;

---

## Roadmap

Releases in the feature:

- For the student:
    - weekly diary with schedule of lessons, homework descriptions, marks for lessons and subject's
      teacher;
    - show information of educations statistics for the quarter and year;

- For the teacher:
    - schedule dashboard: to create diary with schedule of lessons, homework description, marks for
      lessons;
    - markbooks dashboard of the quarter by classes and subjects;

- Profile:
    - add additional info: birthday, phone numbers, parents, photo;

---
