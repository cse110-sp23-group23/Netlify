const axios = require('axios');

exports.handler = async function(event, context) {
  const prompt = event.queryStringParameters.prompt;
  
  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      prompt: prompt,
      max_tokens: 100,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );
  
  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type'
	  }  
  };
}