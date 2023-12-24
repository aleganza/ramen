import { IonItem, IonLabel } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';

import { ANIME, IVideo } from '@consumet/extensions';
import { utils } from '../modules/utils';

import ReactPlayer from 'react-player'

function AnimeEpisode(props: { episodeId: string; episodeIndex: number }) {
    const [episodeSource, setEpisodeSource] = useState<string>();

    const loadEpisode = () => {
        console.log(props.episodeId)

        const as = new ANIME.AnimeSaturn({ url: utils.proxyUrl })
        const response = as.fetchEpisodeSources(props.episodeId).then(data => {
            console.log(data.sources[1])
            setEpisodeSource(data.sources[1].url.toString())
        })
    }

    return (
        <>
            <IonItem id={props.episodeId} button={true} onClick={loadEpisode}>
                <IonLabel>{props.episodeIndex}</IonLabel>
            </IonItem>
            <ReactPlayer url={episodeSource} />
        </>
    )
}

export default AnimeEpisode
