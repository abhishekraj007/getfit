import React from 'react';
import { useRouter } from 'solito/router';
import { PageHeader } from 'app/components';
import { WhitePage } from 'app/components/Page';
import {
  Button,
  Text,
  PlaylistCard,
  Spinner,
  YStack,
  useWindowDimensions,
  ScrollView,
  XStack,
} from '@t4/ui/src';

import * as WebBrowser from 'expo-web-browser';
import { usePlaylists, useSpotifyLogin } from 'app/hooks';
import { IPlaylists } from '@t4/ui/src/modals';
import { PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND, PLAYER_BAR_HEIGHT } from 'app/constants';
import { MusicPlayerBottomBar } from 'app/components/MusicPlayerBottomBar';

WebBrowser.maybeCompleteAuthSession();

export default function Playlists() {
  const { back, push } = useRouter();

  // const { promptAsync, accessToken = '', refetchToken } = useSpotifyLogin();

  const { data: playlists, isLoading, isError: hasError, refetch } = usePlaylists(true);

  const { height } = useWindowDimensions();

  // const isLoading = !!accessToken && (isPlaylistLoadin);

  // const hasError = hasPlaylistError || hasUserError;
  // const { items: playlists } = data || {};

  console.log({ playlists });

  const playlistHeight = height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND + PLAYER_BAR_HEIGHT;

  return (
    <WhitePage>
      <PageHeader
        onBack={() => {
          back();
        }}
        // rightContent={
        //   !!accessToken ? null : (
        //     <Button
        //       chromeless
        //       padding={0}
        //       onPress={() => {
        //         promptAsync();
        //       }}
        //     >
        //       Connect Spotify
        //     </Button>
        //   )
        // }
      ></PageHeader>

      <YStack position="relative" height={height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND}>
        <YStack height={playlistHeight}>
          {isLoading && <Spinner size="large" />}

          {hasError && !isLoading && (
            <YStack
              height={height - PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND}
              alignItems="center"
              justifyContent="center"
            >
              <Text>Something went wrong!</Text>
              <Button size="$3" themeInverse onPress={() => refetch()} marginTop={16}>
                Try again
              </Button>
            </YStack>
          )}

          <ScrollView>
            <XStack flexWrap="wrap">
              {playlists?.map((item) => {
                return (
                  <PlaylistCard
                    key={item?.id}
                    name={item?.name}
                    image={item?.image}
                    onPress={() => {
                      push({
                        pathname: `/playlists/${item.id}`,
                      });
                    }}
                  />
                );
              })}
            </XStack>
          </ScrollView>
        </YStack>
        <MusicPlayerBottomBar />
      </YStack>
    </WhitePage>
  );
}
