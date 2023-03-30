import { useEffect, useState } from 'react';
import './App.css';
import SpotifyGetPlaylists from './components/SpotifyGetPlaylist/SpotifyGetPlaylist';

function App() {
  const [isLogged, SetIsLogged] = useState<boolean>(false);
  const CLIENT_ID = '30555305475a40f79339071201722545';
  const SPOTFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'; // base url
  const REDIRECT_URL_AFTER_LOGIN = 'http://127.0.0.1:5174/';
  const SPACE_DELIMITER = '%20';
  const SCOPES = ['user-read-currently-playing', 'user-read-currently-playing'];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  let url = SPOTFY_AUTHORIZE_ENDPOINT;
  url += `?client_id=${CLIENT_ID}`;
  url += `&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}`;
  url += `&scope=${SCOPES_URL_PARAM}`;
  url += `&response_type=token&show_dialog=true`;

  /**
   *
   * @param hash
   * http://127.0.0.1:5174/#access_token=BQBT7iqqwbc5bBXa0lGoAnceWUiOJE6yEUio5udw9X2q2ZEY8XGOu5HwNBFu8coLf2BXoY-PHuPtrJJBrulVlXC1NNh_ieJARw6SzglmdiHj3M1cK1YeWbvCu5eDlJmTvBppWI-yO-QpXw9qUOyomOkmMpn2MaJ2azN0mKNSc8IEhYkUsf_GJUNgxv-p8btCRaqMO4QGPw&token_type=Bearer&expires_in=3600
   */

  let init: { [index: string]: string } = {};

  const getReturnedParamsFromSpotifyAuth = (hash: string) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInURL = stringAfterHashtag.split('&');
    const paramsSplitUp = paramsInURL.reduce((accumulater, currentValue) => {
      // console.log('currentValue', currentValue);
      const [key, value] = currentValue.split('=');
      accumulater[key] = value;
      return accumulater;
    }, init);
    SetIsLogged(true);
    return paramsSplitUp;
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('expiresIn', expires_in);
    }
  }, []);

  const handleLogin = () => {
    window.location = url as string & Location;
  };

  return (
    <div className="App">
      <h1>{isLogged ? 'Hello😃' : 'this is spotify'}</h1>
      <button type="button" onClick={handleLogin}>
        login to spotify
      </button>
      <SpotifyGetPlaylists />
    </div>
  );
}

export default App;
