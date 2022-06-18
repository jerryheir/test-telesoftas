import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';

let instance_amount = 1;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const intro = async () => {
    const rainbowTitle = chalkAnimation.rainbow(
      'JEREMIAH NWAEZE - Senior Software Engineer \n'
    );

    await sleep();
    rainbowTitle.stop();
    console.log(`I am a process on your computer.\nAnd I will be asking you two questions...\n\n${chalk.bgBlue('FIRST QUESTION')}`);
}

const askQuestionOne = async () => {
    const answers = await inquirer.prompt({
        name: 'instance_amount',
        type: 'input',
        message: 'How many items do you wish to update?',
        default () {
            return 1;
        }
    });
    instance_amount = parseInt(answers.instance_amount);
}

const handleAnswer = async (digit: any) => {
    const spinner = createSpinner('Checking input...').start();
    await sleep();
    if (Number(digit)) {
        spinner.success({ text: 'Input has been accepted as an argument. 🎉🎉🎉' });
    } else {
        spinner.error({ text: '💀 💀 💀 Invalid Input! ☠️' });
        process.exit(1);
    }
}

intro().then(async () => {
    await askQuestionOne();
    await handleAnswer(instance_amount);
});

// new Array(45); // simplier way to create new arrays of certain length to iterate on