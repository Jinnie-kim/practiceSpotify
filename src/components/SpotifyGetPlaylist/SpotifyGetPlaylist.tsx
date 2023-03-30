import axios from 'axios';
import { useEffect, useState } from 'react';

const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

const SpotifyGetPlaylists = () => {
  const [token, setToken] = useState('');
  const [data, setData] = useState<{ items: [] }>({});

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken')!);
    }
  }, []);

  const handleGetPlaylist = () => {
    axios
      .get(PLAYLIST_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button onClick={handleGetPlaylist}>Get Playlists</button>
      {data.items
        ? data.items.map((playlist: { name: string }) => (
            <>
              <li>{playlist.name}</li>
            </>
          ))
        : null}
    </>
  );
};

export default SpotifyGetPlaylists;
