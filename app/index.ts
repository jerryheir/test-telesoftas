import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import TeleSoftas from './telesoftas';

let instance_amount = 1;
let positive_instance = 1;

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

const askQuestionTwo = async () => {
    console.log(`\n\n${chalk.bgBlue('SECOND QUESTION')}`);
    const answers = await inquirer.prompt({
        name: 'positive_instance',
        type: 'input',
        message: 'How many positive instances do you want to kick off with?',
        default () {
            return 1;
        }
    });
    positive_instance = parseInt(answers.positive_instance);
}

const handleAnswer = async (digit: any) => {
    const spinner = createSpinner('Checking input...').start();
    await sleep();
    // Validating and Guarding...
    if (Number(digit)) {
        spinner.success({ text: 'Input has been accepted as an argument. 🎉🎉🎉' });
    } else {
        spinner.error({ text: '💀 💀 💀 Invalid Input! ☠️' });
        process.exit(1);
    }
}

const run = async () => {
    const telesoftas = new TeleSoftas(instance_amount, positive_instance);
    const res = await telesoftas.execute();
    await sleep();
    if (res) {
        figlet('Completed', (_err, data) => {
            console.log('\n\n');
            console.log(gradient.pastel.multiline(data));
        });
    }
}

const runProcess = async () => {
    await intro();
    await askQuestionOne();
    await handleAnswer(instance_amount);
    await askQuestionTwo();
    await handleAnswer(positive_instance);
    await run();
}

runProcess();