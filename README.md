# Gilded Rose (Jerry Nwaeze)

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
Abstracting some of the existing logic and also using includes to avoid matching specifics.
I tested for regression and correctness.
The test cases all passed, and the performance of the code was even notably better.

### SECOND TASK
For this I tried to ensure I would be able to collect user's input from the console by asking two questions. 
And after getting users input, I initialize the telesoftas class, and called the `execute` function.
I created an instance of an array with the length of the user's second input (`positive_instance`).
I also used axios to make http requests with the intention of looping through each one of them.
Then I tried ensure they were run in parallel by using 
```javascript
await Promise.all()
```
which takes an array of promises and returns a resolved array.
For the positive responses, I wrote into the log.txt file using the Node fs module.
I kept count of all positive responses which I used as the foundation for creating a simple recursion to 
execute the business logic again, where I triggered the function till there were no more positive responses.
After this I reduced the `instance_amount` by 1 and updated the dummy shop items. I repeated this process again till `instance_amount` was 0 (Zero) and the process was completed.

When the process was completed, I logged the below prompt to the user for better user experience . And then I end the process.
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
