const axios = require('axios');

exports.handler = async function(event, context) {
  	const prompt = event.queryStringParameters.prompt;
	const response = await axios.post(
		'https://api.openai.com/v1/chat/completions',
		{
		model: 'gpt-3.5-turbo',
		messages: [{role: 'user', content: prompt}],
		},
		{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
		}
		}
	);

	const chatGptResponse = response.data.choices[0].message.content;

	return {
		statusCode: 200,
		body: JSON.stringify(chatGptResponse),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type'
		}  
	};
}