import { IonItem, IonLabel } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';

import { ANIME } from '@consumet/extensions';
import { utils } from '../modules/utils';

import { Player, Hls } from '@vime/react';

// import axios, { AxiosRequestConfig } from 'axios'

import '@vime/core/themes/default.css';
import ReactHlsPlayer from 'react-hls-player';

function AnimeEpisode(props: { episodeId: string; episodeIndex: number }) {
    const [episodeSource, setEpisodeSource] = useState<string>('');
    const [testTitle, setTestTitle] = useState<string>(props.episodeIndex.toString());

    const loadEpisode = () => {
        console.log(props.episodeId)
        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })

        const response = as.fetchEpisodeSources(props.episodeId).then(data => {
            console.log(data.sources)
            setTestTitle(data.sources[0].url.toString())
            setEpisodeSource(data.sources[0].url.toString())
        })
    }

    return (
        <>
            <IonItem id={props.episodeId} button={true} onClick={loadEpisode}>
                <IonLabel>{props.episodeIndex}</IonLabel>
            </IonItem>
            {/* <Player controls>
                <Hls version="latest">
                    <source data-src={episodeSource} type="application/x-mpegURL" />
                </Hls>
            </Player> */}
            <ReactHlsPlayer
                src={episodeSource}
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
            />
        </>
    )
}

export default AnimeEpisode
