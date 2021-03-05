import { PublicClientApplication } from '@azure/msal-browser';

const config = {
    auth: {
      clientId: 'c3be1939-7cf6-4385-a665-bbba171635ba',
      // redirectUri: config.redirectUri,
      // authority: config.authority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  };

const instance = new PublicClientApplication(config);

export default instance;