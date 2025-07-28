const axios = require('axios');

async function testRssImport() {
  console.log('🧪 Testing RSS Import...');
  
  try {
    // Test the RSS import endpoint
    const response = await axios.post('http://localhost:3005/api/v1/news/import/rss/now');
    
    console.log('✅ RSS Import Test Results:');
    console.log('Status:', response.status);
    console.log('Response:', response.data);
    
    // Test fetching news after import
    const newsResponse = await axios.get('http://localhost:3005/api/v1/news?limit=5');
    
    console.log('\n📰 Latest News:');
    console.log('Articles found:', newsResponse.data.length);
    
    if (newsResponse.data.length > 0) {
      console.log('Sample article:', {
        title: newsResponse.data[0].title,
        source: newsResponse.data[0].source,
        category: newsResponse.data[0].category?.name
      });
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testRssImport(); 