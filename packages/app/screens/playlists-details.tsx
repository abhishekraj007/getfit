import React, { useEffect, useState } from 'react';
import { useRouter } from 'solito/router';
import { MusicPlayer, PageHeader } from 'app/components';
import { WhitePage } from 'app/components/Page';
import { useParam, usePlaylists, useSpotifyLogin } from 'app/hooks';
import { useMusicPlayer } from 'app/provider/player/PlayerProvider';
import { IPlaylists } from '@t4/ui/src/modals';

export default function PlaylistDetails() {
  const { back } = useRouter();

  const [playlistId] = useParam('id');
  const [playlist, setPlaylist] = useState<IPlaylists>();

  // const { accessToken } = useSpotifyLogin();

  // const { data: playlist } = useSpotifyPlaylistTracks({ accessToken, playlistId });

  const { data: playlists } = usePlaylists(true);

  const { setSongs } = useMusicPlayer();

  useEffect(() => {
    if (playlists) {
      const playlist = playlists.find((playlist) => playlist.id === playlistId);
      setPlaylist(playlist);

      if (playlist?.tracks) {
        setSongs(playlist?.tracks);
      }
    }
  }, [playlists]);

  return (
    <WhitePage>
      <PageHeader
        onBack={() => {
          back();
        }}
        image={playlist?.image}
      ></PageHeader>

      <MusicPlayer />
    </WhitePage>
  );
}
