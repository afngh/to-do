const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Starting API Verification Tests...');

  // Test 1: Healthcheck Route
  try {
    console.log('\nTesting GET /health...');
    const res = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Healthcheck response:', res.status, JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('❌ Healthcheck failed:', err.message);
  }

  // Test 2: Standard Chat Route with missing arguments (Validation Error)
  try {
    console.log('\nTesting POST /v1/chat/completions (Validation Failure)...');
    const res = await axios.post(`${BASE_URL}/v1/chat/completions`, {
      model: 'llama'
      // missing 'messages'
    });
    console.log('❌ Error: Expected failure but received success:', res.data);
  } catch (err) {
    console.log('✅ Received expected validation failure:', err.response?.status, JSON.stringify(err.response?.data, null, 2));
  }

  // Test 3: Unregistered Route (404 Error Handler)
  try {
    console.log('\nTesting GET /v1/unknown-route (404)...');
    const res = await axios.get(`${BASE_URL}/v1/unknown-route`);
    console.log('❌ Error: Expected 404 but received success:', res.data);
  } catch (err) {
    console.log('✅ Received expected 404 response:', err.response?.status, JSON.stringify(err.response?.data, null, 2));
  }

  // Test 4: Chat Completion (With configured Groq Key)
  try {
    console.log('\nTesting POST /v1/chat/completions (Groq Live Request)...');
    const res = await axios.post(`${BASE_URL}/v1/chat/completions`, {
      model: 'llama',
      messages: [
        { role: 'user', content: 'Say hello in 5 words or less!' }
      ]
    });
    console.log('✅ Received success response:', res.status, JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log('❌ Request failed:', err.response?.status, JSON.stringify(err.response?.data, null, 2));
  }
}

runTests();
