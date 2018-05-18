## SOS-SMS
This application allows a user to easily send a text message containing an error number and error message from any place in their code. To do so, the user must first install the **sossms** npm package, which will enable them to use our function.

In addition to the [sossms npm package](https://www.npmjs.com/package/sos-sms), developers have the option of using our application as their own starter-code.

 Complete the following steps in order to successfully implement our code into your back-end (found HERE: https://github.com/401-Team-Awesome/sos-sms-server).

**NOTE:** A [Heroku](https://id.heroku.com/login) account is required.

Step 1. 
https://github.com/401-Team-Awesome/sos-sms-server
Fork the repo. 
Clone or download to your local drive.

Step 2. 
This is a Node.js module available through the npm registry. Installation is done using the npm install command:
$ npm i sos-sms

![npmsossms](https://user-images.githubusercontent.com/25094584/40210159-3d6731a2-59f8-11e8-8ac5-a3cc406daef5.JPG)

Step 3.
In your terminal, do a quick npm i to make sure all dependencies are installed.

![npm i](https://user-images.githubusercontent.com/25094584/40210394-87498a80-59f9-11e8-823f-31efbb168526.JPG)

Step 4. 
In your code editor, import the npm package into whichever module you’d like to use sos-sms

![import sossms](https://user-images.githubusercontent.com/25094584/40210663-0d603b5e-59fb-11e8-89bb-f74f01009d6c.JPG)


Step 5.
In the module that you’ve imported sos-sms, add in the sossms function that will take in the following parameters: errorCode, userID, and error message. You can use this code block two ways. The first is using your own custom error message.

![custom message example](https://user-images.githubusercontent.com/25094584/40210171-52171856-59f8-11e8-8184-b322a9bad955.JPG)

The second is using error.message which will display the default error message.

![error message example](https://user-images.githubusercontent.com/25094584/40210179-59ce163a-59f8-11e8-98ff-8367689e3b6f.JPG)

**NOTE:** A
[Twilio](https://www.twilio.com/try-twilio) account is required to utilize the sossms sms messaging capability.  As the user, you must provide a Twilio phone number, where the error message will be texted from and also input a phone number where the error message will be texted to.

Step 6. 
After you have installed the package,  dependencies, and created your own [Twilio](https://www.twilio.com/try-twilio)  account, you will need to add your own unique Twilio account SID and AUTH TOKEN to your .env and .test.env. modules.
![twilio authtoken and authid](https://user-images.githubusercontent.com/25094584/40210813-04b945ee-59fc-11e8-87da-4e4ff0a82e04.JPG)

Step 7. Create this module: .env 
![default env](https://user-images.githubusercontent.com/25094584/40209973-507cb6c8-59f7-11e8-9142-62f9e601ac30.JPG)

Step 8. Create this module: .test.env 
![default test env](https://user-images.githubusercontent.com/25094584/40210101-f2bc08a8-59f7-11e8-8fa2-878fbc99cdf3.JPG)

Step 9. 
Once you’re in your Heroku app, go to Settings to set your Config Vars.

![heroku-realconfigvars](https://user-images.githubusercontent.com/25094584/40209865-afbad21a-59f6-11e8-89e1-28f8665b0981.JPG)

Step 8.
Please note, you will want to use some sort of database on Heroku. For our app, we used Mongo’s mLab. This can be included by selecting the Resources tab from Heroku, and adding mLab MongoDB from the Add-ons header.

![resourcesmlab](https://user-images.githubusercontent.com/25094584/40209880-d810163a-59f6-11e8-94ce-9c9f9e673e1d.JPG)

Step 9.

You’re ready to run your tests! If all goes according to plan, you should receive your SOS-SMS!



**Please note that the SID, Tokens, and Config Vars have been blurred so that you are using your own credentials. As always, never share your personal information with anyone.**
