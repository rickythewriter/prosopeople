# Prosopeople

Website: [https://prosopeople.herokuapp.com/](https://prosopeople.herokuapp.com/)

## What is Prosopeople?

Prosopeople is a digital auto-prosoporaphy, a technology for managing your relationships, through record-keeping, inspired by the user interface of [Evernote.com](https://evernote.com/) and the relationship management utility of [Copper CRM](https://www.copper.com). You can:
- create dossiers of people, with whom you want to build a deeper relationship,
- write entries about them, so you don't forget what you've done together, what they like, how you feel about them.

## Technologies Used

- Flask
- WTForms
- SQLAlchemy
- PostgreSQL
- CSS
- React
- Redux

## Features

### Splash Page with Value Proposition

![Splash Page](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-splash.png?raw=true)

*Demo account also available*

### User Registration and Login

![Login](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-login.png?raw=true)

### User-Interface

#### Dossiers

![Dossiers with Descriptions](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-person_and_entries.png?raw=true)

![Create Dossiers](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-create_dossier.png?raw=true)

#### Entries

![Create Entries](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-create_entries.png?raw=true)

![Revise Entries](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-revise_entries.png?raw=true)

### Upcoming Features

- Groups (e.g. College Buddies, Karaoke Group)
- Likes and Dislikes
- Tags (Persons' Characteristics)
- Search
- Events (plan events with groups of people)
- Recommendations based on Tags (gifts, restaurants, hangout ideas etc.)

## Installation

### Getting started

1. Clone this repository 
      ```bash
      https://github.com/rickythewriter/prosopeople.git
      ```

2. Install dependencies
      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on .env.example with the `SECRET_KEY` and postgresql `DATABASE_URL` for your local database.

4. Set up your PostgreSQL user, password, and database to match your **.env** file

5. Open the pipenv shell, migrate the database, seed your database, and run the flask app, with the following commands.

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

## Wiki Docs
-[Wiki Docs] https://github.com/rickythewriter/prosopeople/wiki

## Challenges

I had originally intended for the People feature to come with a contact-information form as well. Formatting phone numbers, inputting addresses, accepting multiple inputs for email addresses--these are all challenging, as the form input would require more research to grasp, or the database would hold many many-to-many tables.

## Cool Code Snippets

### Modular State-Based View Management
![Dashboard](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/snippets/snippets-changing_panels-dashboard.png?raw=true)
![Small Main View](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/snippets/snippets-changing_panels.png?raw=true)

### Sorting Panel Elements
![Entries by Date](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/snippets/snippets-sort_by_date.png?raw=true)

## Contributors

- [Ricky Thang](https://github.com/rickythewriter)

