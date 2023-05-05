# trasferwise-app
backend endpoint: https://transferwise-apitest.herokuapp.com/api/v1 
##Coding Project   Hints: Be smart, don’t repeat yourself or re-invent the wheel.

```Use as many packages/libraries as you can do. Use up-to-date software and bundles. Read the entire document here before jumping into action. Think twice. Model the application before you jump into coding.   Why? This coding challenge should give us a good understanding of  How well you can go from text to code, from requirements to product. How well you can execute on predefined requirements. How well you pay attention to detail so we can rely on you executing the work end to end. How creatively you execute on loose requirements (not defined in great detail). How well you can hack, organize, document, test, structure, and write your code. How well you can leverage existing things to build this app fast. ```

- What (Objective):  The challenge is to create a web app where users can send virtual money in the currencies of (USD, EUR, NGN) to each other. Think of Wise. Each transaction should be atomic. That means, that it either succeeds entirely or is rolled back into the original state. 
- However, whenever a transaction fails, it is visible to the receiving person as a message in his transaction history, which also resembles his bank account. The balance of the bank account is not hardcoded but derived from the entire transaction history. 
- The exchange rates can be pulled from a public API (Bonus point) or you hard code one.   
-  UI: There are three views in the login-protected app.  A login page (which the App should start from) An overview (index), where all the transactions are listed (see screenshot below)  A page where a user can start a new transaction and send money to someone.   
-  The overview could look something like this:  Features: Money can be sent (converted) into any of the three currencies to send to another user.  Money can be sent/converted to any and every user, who is being registered on the app. 
-   The user to send the money to can be chosen from an input-dropdown list which shows all users if clicked on. (Tip: Create min. 2 users as seed) A user cannot have a negative balance. All users start with 1000 USD worth of money given via an initial transaction when you create them. 
-    All users start with USD as their native currency but can receive EUR and GBP. All models and database tables have created_at and updated_at timestamps which are created automatically.   The app enables users to do the following: A user can register with his name, email address, password.
-    A user can log in with his email address and password which is encrypted using a good encryption system (be smart, use a library). 
-    You don’t need to implement to reset a password. Signup + Login are enough. When a user successfully logs in, he sees a page with all of his transactions, including the initial transaction from the signup (1000 USD).


-     The page with all the transactions shows also the current balance for each currency.
-     (e.g. start: 1000 USD, 0 EUR, 0 NGN) A user can create a new transaction on a new transaction page. A transaction consists of the sender and the receiver, the source currency, target currency, exchange rate, and the amount. A user can select the target currency. Check if a transaction is possible, so if a user has enough funds.   Example: User A sends to User B 100 EUR. But User B wants to receive that in USD.
-      Therefore User A has -100EUR after that transaction and User B 113 USD, depending on the exchange rate.   

## USAGE

To run locally download or clone CD in the the folder and run npm install
Edit the env file in the root folder and set NODEENV to development
Run the command non run start-dev 

The above powers the back end

To run the front end CD INTO THE FRONTEND folder and run npm install
Edit the axios config file and set the base URL to any local host port of ur choice
Run 
npm run dev
