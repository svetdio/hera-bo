> [!NOTE] 
> _It is expected that you cannot run this project without the api base url and its endpoints._ </br>
> _The purpose of this project is to demonstrate that I've developed something for personal use and future reference._ </br>
> _If you have any questions, feel free to contact me through one of my socials on my github profile._

<img src="https://cdn-icons-png.freepik.com/512/2220/2220110.png" width="100" />

Cypress Back-Office Automation
======
UI Automation Testing

Project Dependencies
---------------------

- `npm`
- `cypress`
- `faker`

Coverage
---------

   * [Login]
   * [Profile]
   * [Report Module]

Pre-Requisites
--------------

1. [Node JS](https://nodejs.org/en/download/package-manager/current) make sure NodeJS is installed in your system

------------------------------------------------
Setting Up First Run on Your Local Machine
------------------------------------------

1. Clone this project on your local machine

   ```
   https://github.com/markuusche/cypress-ui
   ```

2. Open a terminal inside your local clone of the repository.
3. Install dependencies: <br>

   Cypress
     
   ```bash
   npm install cypress --save-dev
   ```
   Faker
   ```
   npm install @faker-js/faker --save-dev
   ```

Run cypress in headless mode
  ```
  npx cypress run
  ```
Run cypress in headless mode with your chosen browser (chrome, firefox, edge)
  ```
  npx cypress run --browser chrome
  ```

</br>

