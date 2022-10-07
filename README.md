![alt text](/src/carpool_photo.jpg`)
# Carpool Cool Tool

## Overview
Over the past few years, ride sharing has exploded in growth. Typically when we talk about ride sharing, we are referring to a service like Uber or Lyft where a user essentially hails a taxi by means of an app. There are other versions, such as UberX, where one driver will pick up multiple passengers and driver them to their destination. But in both of these models, customers hire independent contractors to drive them someplace.
But perhaps there should be a differnt model, in which multiple who are going to the same place anyway share in the cost of a single ride. That is the aim of Carpool Cool Tool.

## Technologies
The system uses a React frontend connected to a backend running SQLite with Active Record through Sinatra.

## File Structure
### Backend
As a Sinatra application, follows an MVC framework.

Controllers - The application controller file defines how the application handles requests  made by the frontend.
models - contains one model file for each database table (class), which defines its relationships with the other tables. 
db - Contains the SQLite database, along with the migrations used to create and tweak it.


### Frontend
app.js - The main screen. It contains many of the fetch requests and update functions as well as all of the route paths 

components - All of the system screens are contained in the components directory.
    
## Setup
From the phase-3-project_backend directory, enter the command: bundle exec rake server
From the phase-3-project-frontend directory, enter the command: npm start
## Usage
This is a demo system. It was seeded with a combination of random data from Faker and some data based on actual places around New York City and Long Island.

To use the system, from the home screen, click the Register button. There you will be asked to enter your basic information. It asks for your home neighborhood, which acts as default for setting up or searching for carpools. Similarly, if you have a car and will be a driver, you can enter the appropriate capacity of your car for creating carpools.

Once you have registered, you can login to the system. Because this is only a demo, you can log in as any system user from a drop-down menu without a password.

Each user can connect a bank account to their account in this system. To do that, go to the My Profile screen and enter your bank account information. *** This is a demo system. Please DO NOT enter actual bank account information. ***

Once in the system, you can create a carpool by going to the Create a pool link and entering the details. When creating a carpool, it asks for the total one-way price to park. Suppose you are creating a carpool to go to a train station and that it will cost $8.00 to park there. The total one-way cost should be $4.00. That is because presumably, you will also create a carpool for the return trip. So the total cost should be shared by both groups.

To find a carpool, click on the appropriate link and entered your desired origin, destination, and departure time. Any available carpools will be displayed within 30 minutes of your departure time. To join a carpool, simply click the "join carpool" button.

For each carpool, the cost is divided by the total number of people in the car. So if the one-way cost is $4.00 and there are 3 passengers (plus the driver), each passenger will pay the driver $1.00. At the end of the trip, the driver can press the "Mark carpool as complete" button and the per passenger price of the trip will automatically be transferred from each passenger's account to the driver.

Users can "transfer" money between their Carpool Cool Tool account and their bank account from the Transaction History screen.