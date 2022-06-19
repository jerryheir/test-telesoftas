# Gilded Rose

This is a refactored version of the Gilded Rose Kata in Typescript

## Prerequisites
- Node v12 or higher
- npm or yarn

## Installation
- Clone the project off github and cd into the root directory
- Run the command `npm install` OR `yarn install`

## Running Script
- Run the command `npm run start` OR `yarn start`

## Understanding the process
Understanding the approach behind the implementation

### FIRST TASK
My mindset going into this was to write very detailed test cases to match the requirements.
Then also implementing guards to ensure edge cases are sorted.
Abstracting some of the existing logic.
Also used includes to avoid matching specifics.
And also testing for regression and accuracy.
The test cases all passed, and the performance of the code was even notably better.

### SECOND TASK
First I tried to ensure I would be able to collect user's input from the console. 
After getting users input. I initialize the telesoftas class and call the execute function.
I created an instance of an array with the length of the users second input.
I also used axios to make http requests with the intention of looping through each one of them.
Then I tried ensure they are called in parallel by using 
```javascript
await Promise.all()
```
which takes an array of promises and returns a resolved array.
For the positive responses, I wrote to log.txt file using the Node fs module.
I kept count of all positive responses which I used as the foundation for creating a simple recursion to 
execute the business logic where I triggered the function till there were no more positive responses.
After this I reduce the instance amount by 1 and updated the shop items and then repeated the process again till it is completed.

When process is completed, I logged that to the user for better user experience . And then I end the process.
```
   ____                      _      _           _ 
  / ___|___  _ __ ___  _ __ | | ___| |_ ___  __| |
 | |   / _ \| '_ ` _ \| '_ \| |/ _ \ __/ _ \/ _` |
 | |__| (_) | | | | | | |_) | |  __/ ||  __/ (_| |
  \____\___/|_| |_| |_| .__/|_|\___|\__\___|\__,_|
                      |_|                         
```


## Running tests

To run all tests

### Jest way

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

### Mocha way

```sh
npm run test:mocha
```
