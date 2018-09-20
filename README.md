![](https://i.imgur.com/IwxlQTx.png)

A place to plan your daily spend, look for money saving suggestions and keep track of your financial goals.

> **[Visit Thrifty](https://thriftyapp.herokuapp.com)**

# Goal
To design and collaboratively build a MEAN stack app that consumes our own API (as a team of 3 people in 7 days).

# Technologies Used
* HTML5
* SCSS
* JavaScript (ES6)
* AngularJS
* Mocha
* Chai
* Node.js
* MongoDB
* Mongoose
* Express
* Heroku
* Bulma


---
# Approach Taken
We kicked off the project by drawing up wireframes which helped clarify what we were working towards and served as a reference point throughout the project.

<p align="center"><img src="https://i.imgur.com/38kqAG9.png"></p>
<p align="center"><img src="https://i.imgur.com/zsC9MiJ.png"></p>

After we roughly had an idea of all the models we wanted to build – we created a backlog of tasks on Trello and assigned a member to each card.

<p align="center"><img src="https://i.imgur.com/BojTg9B.jpg"></p>

### Functionality

1. **Budget tracking** – Users can set daily budgets from the dashboard and the ring chart updates in real-time based on spending.

<p align="center"><img src="https://thumbs.gfycat.com/HotFavorableBushsqueaker-size_restricted.gif"></p>

2. **Journey Planner** – The user can find the most cost efficient mode of transport to get around London and tap on it to add it as an expense. The data is provided in real-time by Transport for London and Uber's API

<p align="center"><img src="https://thumbs.gfycat.com/CluelessVigorousKite-size_restricted.gif"></p>

3. **Food finder** – We use Zomato's API to find the cheapest food options in a 300m radius around the user.

<p align="center"><img src="https://thumbs.gfycat.com/EagerWetAmericanbadger-size_restricted.gif"></p>
 
4. **Goals** – If a user is trying to save up for a future purchase, they can add these as goals and allocate an amount to it as they save money. A progress bar shows how close they are to achieving their target.

<p align="center"><img src="https://thumbs.gfycat.com/TepidAdmirableAyeaye-size_restricted.gif"></p>

5. **Expense Tracking** – Users can manually add expenses in the app or connect their Monzo bank account and the expenses for that day would be updated automatically and deducted from their daily budget. 

6. **Linking to Monzo bank accounts** – At the end of each day, the user's unspent budget is moved to their 'savings' in the Thrifty app.

 Using Monzo bank's API, we tapped into the user's savings in their actual bank account. We then added functionality to simply 	tap on a savings pot and move money from their Monzo bank account to their Monzo savings pot in real-time.

<p align="center"><img src="https://thumbs.gfycat.com/NauticalTangibleIguana-size_restricted.gif"></p>

---
# Wins
* **Leveraging external APIs** – Integrating with external APIs allowed us to improve the user experience and usefulness of the app drastically.

	For this app we used the following APIs – TFL, Uber, Postcodes.io, 	Zomato, Leaflet and Monzo.

* **Styling and user experience** – Our philosophy was to not only build something that was feature rich, but also something that was pleasing to use. Having a sleek user experience and design language helped make the product feel more complete.	
 
---
# Blockers
* **Proxy Requests** – For the MVP, we started off by making API requests from the front-end. We ran into CORS issues because of this and had to move the API calls to our backend. This led to a lot of moving parts which slowed us down.

---
# Future Features
* **Better desktop and tablet experience** – We developed this product with a mobile-first perspective. While the app is still usable on desktops and tablets, there is scope to make better use of the increased real-estate.

* **Deeper insights and analytics** – Providing more personalised recommendations and informed insights based on the user's spending patterns.

* **Tracking recurring expenses** – Automatically detecting direct debits and subscriptions to alert the user beforehand.
