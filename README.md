# Project Trybe Futebol Clube

## Description
**Trybe Futebol Clube** is a complete website built on its front-end, back-end and database layers. The application is made for managing football championships info. It has features such as the visualization of teams, matches and leaderboards, besides adding and updating new matches - which change the leaderboards.

We had to build the application's back-end from scratch during the project while the Trybe team provided the front-end. Among other developed structures, we have the main one, which is a **RESTful API** that connects the two ends of the application using **OOP** and **SOLID**. It is responsible for authenticating and authorizing users to use different **CRUD** endpoints and is organized in an **MSC** (model, service and control) architecture.

The back-end was mainly made using **TypeScript**,  **Node.js** and **Express.js**. To handle the database (and structure it with migrations), we built the MSC *model layer* using the ORM tool **Sequelize**, which also facilitates future changes to the code and database. Users authentications and authorizations were made using **JWT** (JSON Web Token). Finally, the project has more than **80%** test coverage, developed using **Mocha**, **Chai** and **Sinon**.

<img src="https://user-images.githubusercontent.com/94147604/195465592-2bc2393e-ab07-4316-93fd-0a97ef09fe73.jpg" width="500">

<br>

## Main used technologies:
>TypeScript (with OOP)
>
>Node.js
>
>Express.js
>
>JSON Web Token (JWT)
>
>Sequelize
>
>MySQL
>
>Mocha, Chai and Sinon
>
>Docker

<br>

## Instructions to utilize the application
To run the application on your machine, you need to have <a href="https://www.docker.com/">Docker</a> installed.

Once the repository is cloned, get inside the application's **root directory** and use the command `npm install`, then enter the **directory app** and use the command `docker-compose up -d` to run the orchestrated docker. From that point on, you can access and utilize the application (via the front-end) locally in your browser using **Port 3000**.

After running docker-compose, you can go into the **back-end directory** and use the `npm run dev` command to use it. For the front-end, enter the **front-end directory** and use the `npm start` command. To check the test coverage, use the command `npm run test:coverage` inside the **back-end directory**.

<br>

You can interact with the backend API through an **HTTP client** (Insomnia, Postman, HTTPie, etc.) and **make requests to it**. Down below is a list of the **endpoints**.

<details>
  <summary>Endpoint for <i>Login</i></summary>
  <ul>
  <li>post('/');</li>
  <li>post('/validate');</li>
  </ul>
</details>

<details>
  <summary>Endpoints for <i>Teams</i></summary>
  <ul>
  <li>get('/');</li>
  <li>get('/:id');</li>
  </ul>
</details>

<details>
  <summary>Endpoints for <i>Matches</i></summary>
  <ul>
  <li>post('/');</li>
  <li>get('/');</li>
  <li>get('/:id');</li>
  <li>get('/:id/finish');</li>
  </ul>
</details>

<details>
  <summary>Endpoints for <i>Leaderboards</i></summary>
  <ul>
  <li>get('/');</li>
  <li>get('/home');</li>
  <li>get('/away');</li>
  </ul>
</details>

<br>

## Commit history
You can check the entire commit history to see how the project was developed step by step. All commits were based on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guide, keeping an organization and accurate description of what was done with each change.

## Contact
You can get in touch with me at pedronerislc@gmail.com or by <a href="https://www.linkedin.com/in/pedro-nl-caldas/">Linkedin</a>.
