
###Simba Coding Project
 
###Hints:
- Be smart, don’t repeat yourself or reinvent the wheel. Use as many packages/libraries as you can do. Use up-to-date software and bundles. Read the entire document here before jumping into action. Think twice. Model the application before you jump into coding.
 
###Why?
This coding challenge should give us a good understanding of 
How well you can go from text to code, from requirements to product.
How well you can execute on predefined requirements.
How well you pay attention to detail so we can rely on you executing the work end to end.
How creatively you execute on loose requirements (not defined in great detail).
How well you can hack, organize, document, test, structure, and write your code.
How well you can leverage existing things to build this app fast.
 
What (Objective): 
The challenge is to create a web app where users can send virtual money in the currencies of (USD, EUR, NGN) to each other. Think of Wise.
Each transaction should be atomic. That means, that it either succeeds entirely or is rolled back into the original state. However, whenever a transaction fails, it is visible to the receiving person as a message in his transaction history, which also resembles his bank account. The balance of the bank account is not hardcoded but derived from the entire transaction history. The exchange rates can be pulled from a public API (Bonus point) or you hard code one. 
 
### UI:
There are three views in the login-protected app. 
A login page (which the App should start from)
An overview (index), where all the transactions are listed (see screenshot below) 
A page where a user can start a new transaction and send money to someone. 

### The overview could look something like this:

### REQUIREMENTS Features:
Money can be sent (converted) into any of the three currencies to send to another user. 
Money can be sent/converted to any and every user, who is being registered on the app. 
The user to send the money to can be chosen from an input-dropdown list which shows all users if clicked on. (Tip: Create min. 2 users as seed)
A user cannot have a negative balance. All users start with 1000 USD worth of money given via an initial transaction when you create them. 
All users start with USD as their native currency but can receive EUR and GBP.
All models and database tables have created_at and updated_at timestamps which are created automatically.
 
### FEATURES
The app enables users to do the following:
A user can register with his name, email address, password.
A user can log in with his email address and password which is encrypted using a good encryption system (be smart, use a library).
You don’t need to implement to reset a password. Signup + Login are enough.
When a user successfully logs in, he sees a page with all of his transactions, including the initial transaction from the signup (1000 USD).
The page with all the transactions shows also the current balance for each currency. (e.g. start: 1000 USD, 0 EUR, 0 NGN)
A user can create a new transaction on a new transaction page.
A transaction consists of the sender and the receiver, the source currency, target currency, exchange rate, and the amount.
A user can select the target currency.
Check if a transaction is possible, so if a user has enough funds.
 
Example: User A sends to User B 100 EUR. But User B wants to receive that in USD. Therefore User A has -100EUR after that transaction and User B 113 USD, depending on the exchange rate. 
 
Deliverables:
Link to deployed app with username+password
Link to public github repo
1-2 minute presentation of your app with vidyard (https://www.vidyard.com): Click through the app, talk about the features, challenges you’ve had, tradeoffs you’ve made, missing parts etc.


Requirements:
- Use any language and framework you want
- Have fun at building 🥳


---
## Getting Started

[Technologies](#technologies)

[Tools](#tools)

[Installations](#installations)



## Technologies

[node]: (https://nodejs.org)
- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

---

## Tools
- [Postman](https://www.getpostman.com/) is the only complete API development environment, and flexibly integrates with the software development cycle.
- Testing
  - [Mocha](https://mochajs.org/) A javascript testing framework.
  - [Chai](https://chaijs.com) A test assertion library for Javascript.
- [Swagger](https://swagger.io/) is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services
- [Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Travis CI](https://travis-ci.org/) is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.
- [Coveralls](https://codeclimate.com/) consolidates the results from a suite of static analysis tools into a single, real-time report, giving your team the information it needs to identify hotspots, evaluate new approaches, and improve code quality(from crunch base).

---


#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm start
  ```
- Use `http://localhost:7778` as base url for endpoints

#### Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                 | REQUEST BODY
| ------ | --------------------------------------- | ------------------------- | ---------------
| POST   | Sign up for an account                  | `/api/v1/auth/signup`     | [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Users/post_api_v1_auth_signup)
| POST   | Sign in to an account                   | `/api/v1/auth/signin`     | [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Users/post_api_v1_auth_signin)
| POST   | Create a bank account                   | `/api/v1/accounts`        | [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Accounts/post_api_v1_accounts)
| GET    | Staff's can Get all accounts            | `/api/v1/accounts`        | [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Accounts/get_api_v1_accounts)
| GET    | Get a specific account                  | `/api/v1/accounts/:accountNumber`| 
| PATCH | Activate or deactive an account          | `/api/v1/accounts/:accountNumber`| [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Accounts/patch_api_v1_accounts__accountNumber_)
| DELETE   | Delete an account                     | `/api/v1/accounts/:accountNumber`|
| POST     | Perform a debit transaction           | `/api/v1/transactions/{accountNumber}/debit`| [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Transactions/post_api_v1_transactions__accountNumber__debit)
| POST     | Perform a credit transaction           | `/api/v1/transactions/{accountNumber}/credit`| [Request Body](https://transferwise-apitest.herokuapp.com/api-docs/#/Transactions/post_api_v1_transactions__accountNumber__credit)

#### Running Unit Test
- Run test for all endpoints
  > run the command below
  ```shell
  $ npm test
  ```


