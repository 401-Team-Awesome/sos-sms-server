# SOS-SMS

[![Node.js Version][node-version-image]][node-version-url]  

Contributors: [Sarah Bixler](https://github.com/sarasaurus), [Cara Ottmar](https://github.com/cottmar), [Zachary Schumpert](https://github.com/buphnezz), [Carl Olson](https://github.com/colson10)

This application allows a user to easily send a text message containing  an error number and error message from any where in their code.  To do so the user must first install the __sossms__ npm package, which will enable them to use our function.

A [__Twilio__](https://twilio.com) account is required to utilize the sossms  sms messaging capability.  The user must provide a twilio phone number, where the error message will be texted from and also input a phone number that the error message will be texted to.


## Create an Account 

In order to use our npm package, the user must first have an __account id__ to reference and pass in to the function provided in the package 

- Make a POST request to our api/accounts route.  This route takes an opt user name and a required phone number.
- __Example Request:__    
```
https://sos-sms.herokuapp.com/api/accounts?userPhoneNumber=12223334444__?password=secret?username=vinicio?email=gregor@gregor.com
```

Once an account has been posted, the id from that account is accessible in the return as the __\_id__ property on the response object.

The __\_id__ can then be passed into the __sossms__ function, as an argument to the __userID__ parameter.

Doing so enables the message schema to be attached to the Account Schema in a one to many relationship where the Account is the one and the Message is the many.

Accounts will be able to have many messages, but each message can only be attached to one account.

References to the messages are stored under the Account.messages property.

the __\_id__ of the Account holding a message can be accessed from a message instance via the messages __account__ property.  _Example:_ __message.account__
## Install the __npm__ package
- __npm i sos-sms__
- __require the package into your file__
-  __the function signature is: (error, userID, message)__ 

The function signature takes in an __error code__ (which is a string), a __user id__ (a number) and a __message__ (a string) that the user can define or pass in to describe the error.

This function can be invoked anywhere in your code.


## Send an SMS Message!
Simply __invoke__ the function any where in your code with the required arguments and it will send a post request to our API.  The POST request to our API logs a message to our MongoDB messages database and sends an __SMS__ containing the message and error code via __Twilio__. 

## License

[MIT](LICENSE)

[node-version-image]: https://img.shields.io/node/v/http-errors.svg
[node-version-url]: https://nodejs.org/en/download/
