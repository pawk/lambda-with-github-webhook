# AWS Lambda with Github Webhook

AWS lambda function wrapper providing validation layer for requests sent from Github Webhook.

## Installation

```
npm i --save lambda-with-github-webhook
```

## Usage

This higher order function is meant to be used on AWS lambda platform (or any other nodejs-driven environment), hence there is no dependency on `crypto` package in package.json.

```
// lambda handler file

const withGithubWebhook = require('lambda-with-github-webhook');

function callback(event, context, callback) {

 // your business logic
 // AWS lambda specifics passed through function arguments

}

module.exports.handler = withGithubWebhook(callback, { token: 'your webhook token' });
```
