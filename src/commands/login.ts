import inquirer from 'inquirer';
import axios from 'axios';
import Configstore from 'configstore';

const config = new Configstore('gutensight-seo');

export async function login() {
  try {
    const { apiKey } = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: 'Enter your API key:',
        validate: (input) => input.length >= 8 && /^[a-zA-Z0-9]+$/.test(input) ? true : 'API key must be at least 8 alphanumeric characters.',
      },
    ]);

    const response = await axios.post('https://api.example.com/validate-key', { apiKey });
    if (response.data.valid) {
      config.set('apiKey', apiKey);
      console.log('Login successful!');
    } else {
      console.error('Invalid API key.');
    }
  } catch (error: any) {
    console.error('Error during login:', error.message);
  }
}
