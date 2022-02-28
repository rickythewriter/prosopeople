# Prosopeople

Website: [https://prosopeople.herokuapp.com/](https://prosopeople.herokuapp.com/)

## What is Prosopeople?

Prosopeople is a digital auto-prosoporaphy, a technology for managing your relationships, through record-keeping, inspired by the user interface of [Evernote.com](https://evernote.com/). You can:
- create dossiers of people, with whom you want to build a deeper relationship,
- add tags, to see your friends' traits, and who has what in common.
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

#### Dossiers with Entries

![Dossiers with Descriptions](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-person_and_entries.png?raw=true)

#### Create Entries

![Create Entries](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-create_entries.png?raw=true)

#### Revise Entries

![Revise Entries](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-revise_entries.png?raw=true)

#### Filter Dossiers with Tags

![Filter Dossiers](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-tag_filters.png?raw=true)

#### Create a New Dossier with Tags

![Create Dossier With Tags](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-create_dossier_with_tags.png?raw=true)

#### Create a New Tag

![Create a New Tag](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-add_tags.png?raw=true)

#### View and Add Tags to Dossier
![Dossier Tags](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-person_and_tags.png?raw=true)

![Add Tag to Dossiers](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-add_tag_to_dossier.png?raw=true)

![Added Tag to Dossiers](https://github.com/rickythewriter/prosopeople/blob/main/docs/images/views/view-added_dossier_tag.png?raw=true)

### Upcoming Features

- Upload Images to Entries
- Mobile Optimization and iOS Version
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
https://github.com/rickythewriter/prosopeople/wiki

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

