# ChatDome
ChatDome is a simple chatroom messaging application created using NodeJS, Express, WebSocket and MongoDB. It has a simple login system that allows users to place their name along with chatroom choice, this will direct the user to the chosen chatroom where they will be welcomed by the chatbot. The chatbot will also alert all users within the chatroom of any new users joining or leaving. Every message sent within a chatroom will only be received by the others in that same room, the messages will also be saved to the database.
#### Key features
-	Simple login screen with chatroom choices
-	Chatbot messages to welcome user, alert others of a user joining or leaving
-	Send messages to the chatroom
-	Leave chatroom

## User Interface

#### Login, Chatroom selection
* User can place there name within the alotted slot
* User will be asked to pick a chatroom to join

![image](https://user-images.githubusercontent.com/57302004/156923127-90fc919b-cfd7-477d-ae14-7df0e68db239.png)
#### Chatroom
* Bot will welcome new users, alert other users to new arrivels and if anyone leaves the chatroom
* The name of the chatrom will be displayed on the top left conner
* Messages sent will contain the users name that was inputted within the login page
* Messages will only be seen by other users within the same chatroom
* Users can send messages by typing it out within the textbox and clicking the submit button

![image](https://user-images.githubusercontent.com/57302004/156923059-27fab8c0-ebbd-47b3-bb32-0efbc5c77230.png)

## How to use this aplication
To start this application you will need open the terminal up and user
```
npm start
```
This will produce an output similer to this
```
PS C:\Your URL Path\ChatDome> npm start

> comp3006_chatroom@1.0.0 start
> nodemon app.js

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
server working on
MongoDb is connected
```
From here, head over to your chosen web browser and type in
```
http://localhost:3000/
```
This will take you to the application

### Disclaimer 
This application was created for a University of Plymouth submission for the Full-Stack Development Unit.
