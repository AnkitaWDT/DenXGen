/* eslint-disable prettier/prettier */
// apiConfig.js

export const API_CONFIG = {
    CONFIG_FILE:'https://temp.wedeveloptech.in/denxgen/appdata/getconfig-ax.php',
    API_DOMAIN: 'https://temp.wedeveloptech.in/denxgen/appdata/',
    professionListUrl: 'getprofflist-ax.php',
    genderListUrl: 'getgenderlist-ax.php',
};

export const fetchAndUpdateConfig = async () => {
    try {
        const response = await fetch(API_CONFIG.CONFIG_FILE); // Fetching the CONFIG_FILE
        const configResponse = await response.json(); // Parsing the JSON response
        const apidomain = configResponse.data.apidomain; // Extracting the apidomain from the response
        // Updating the API_DOMAIN in the API_CONFIG constant
        API_CONFIG.API_DOMAIN = apidomain;
    } catch (error) {
        console.error('Error fetching and updating config:', error);
    }
};

// Call the fetchAndUpdateConfig function to update API_CONFIG
fetchAndUpdateConfig();
