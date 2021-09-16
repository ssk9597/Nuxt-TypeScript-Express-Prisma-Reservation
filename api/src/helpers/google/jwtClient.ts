// google
import { google, Auth } from 'googleapis';

// credential
import credentials from '../.././credentials/credentials.json';

export const jwtClient = (scopes: string[]) => {
  const jwtClient: Auth.JWT = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    keyFile: undefined,
    keyId: undefined,
    scopes: scopes,
    subject: undefined,
  });

  return jwtClient;
};
