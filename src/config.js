
export const msalConfig = {
    auth: {
      clientId: "7ffb78f7-fbf4-4484-be1b-5124d53d1c13",
      authority: "https://login.microsoftonline.com/008502d6-3f79-46f0-ab37-9354e3fe80ff/", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      pbiAPI : "https://analysis.windows.net/powerbi/api/",
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["https://analysis.windows.net/powerbi/api/"]
  };