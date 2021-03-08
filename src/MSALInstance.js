import { PublicClientApplication } from '@azure/msal-browser';

const config = {
    auth: {
      // clientId: 'c3be1939-7cf6-4385-a665-bbba171635ba', // rahul.singh@tollgroup.com
      clientId: 'b9583621-59bf-4e2f-ac58-704ff18c9b27', // rahul.singh@umovemaestro.onmicrosoft.com
      // redirectUri: config.redirectUri,
      // redirectUri: 'http://localhost:3000',
      // redirectUri: 'https://rkant225.github.io/Microsoft_based_login_React_App/',
      // authority: config.authority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  };

const instance = new PublicClientApplication(config);

export default instance;