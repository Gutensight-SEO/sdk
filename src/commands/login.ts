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

    if (!apiKey) {
      console.error('API key must be at least 8 alphanumeric characters.');
      return;
    }

    console.log("Authenticating...")
    const response = await axios.post('http://localhost:10000/api/v1/analyze/api-key', { apiKey });
    // const response = await axios.post('https://gs-server-hzfd.onrender.com/api/v1/analyze/api-key', { apiKey });
    console.log("Response gotten:", response.data)

    if (response.data.success) {
      config.set('apiKey', apiKey);
      console.log('✅ Login successful!');
    } else if (response.data.error) {
      console.error(`❌ ${response.data.error}`);
    }
  } catch (error: any) {
    console.error('❌ Error during login:', error.message);
  }
}
