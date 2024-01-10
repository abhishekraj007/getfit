import { useEffect, useState } from 'react';
import Constants from 'expo-constants';

import * as WebBrowser from 'expo-web-browser';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  refreshAsync,
  TokenResponse,
} from 'expo-auth-session';
import { Storage } from 'app/utils/storage';

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const CLIENT_ID = '49f967b2256f440d9d9c4a84f48b2d2a';

const scopes = [
  'user-read-email',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-library-read',
];

const { expoConfig } = Constants;
const redirectUri = makeRedirectUri({
  // @ts-ignore
  scheme: expoConfig?.scheme,
  // preferLocalhost: true,
  path: 'playlists',
  // native: 'your.app://redirect',
  useProxy: true,
});

console.log({ redirectUri });

export function useSpotifyLogin() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      // responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes,
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: true,
      redirectUri,
    },
    discovery
  );

  const [accessToken, setAccessToken] = useState<string>();

  async function exchangeCodeForTokens(code) {
    try {
      console.log('==== get token from code ====');
      const auth = await exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          code,
          redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier as string,
          },
        },
        discovery
      );

      Storage.save('auth', auth);
      setAccessToken(auth.accessToken);
    } catch (error) {
      console.log('[exchangeCodeForTokens]', error.message);
    }
  }

  const fetchTokenFromCode = () => {
    console.log('====== Token doent exist fetch ======', { response });
  };

  useEffect(() => {
    console.log({ response });

    if (response && response.type === 'success') {
      // const auth = response.authentication;
      // const storageValue = JSON.stringify(auth);
      const { code } = response.params;

      if (code) {
        Storage.save('authcode', code);
        exchangeCodeForTokens(code);
      }
    }
  }, [response]);

  const refetchToken = async () => {
    try {
      const auth = await Storage.get('auth');
      const code = await Storage.get('authcode');
      const { accessToken, refreshToken } = auth || {};

      console.log('=== refetchToken ====', { auth, code });

      if (!auth) {
        exchangeCodeForTokens(code);
        return;
      }

      const isTokenFresh = TokenResponse.isTokenFresh(auth);

      console.log('===isTokenFresh===', { isTokenFresh });

      if (isTokenFresh) {
        setAccessToken(accessToken);
        return;
      }

      Storage.remove('auth');
      setAccessToken(undefined);

      if (refreshToken) {
        try {
          console.log('==== refresh token ===');
          const refreshedToken = await refreshAsync(
            {
              clientId: CLIENT_ID,
              scopes,
              refreshToken,
            },

            discovery
          );

          setAccessToken(refreshedToken.accessToken);
          Storage.save('token', refreshedToken);

          console.log({ refreshedToken });
        } catch (error) {
          console.log('==== failed to refresh token ===', error.message);
        }
      }
    } catch (error) {
      console.log('==== restore token failed ====', error.message);
    }
  };

  useEffect(() => {
    refetchToken();
  }, []);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return {
    promptAsync,
    accessToken,
    refetchToken,
  };
}
