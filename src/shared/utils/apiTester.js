/**
 * Quick test to verify API data structure
 */

// Test function to check API response
const testAPI = async () => {
  try {
    const response = await fetch('https://gottafetchthemall.onrender.com/pokedex/between?min=1&max=3');
    const data = await response.json();
    
    console.log('API Response:', data);
    console.log('First Pokemon:', data[0]);
    console.log('Has image?', !!data[0]?.image);
    console.log('Has height?', !!data[0]?.height);
    console.log('Has weight?', !!data[0]?.weight);
    console.log('Has ability?', !!data[0]?.ability);
    
    return data;
  } catch (error) {
    console.error('API Test failed:', error);
  }
};

// Export for use in console
window.testAPI = testAPI;

console.log('API Tester loaded. Run testAPI() in console to check your API.');
