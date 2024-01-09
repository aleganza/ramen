import './AnimeEpisode.css';

import React, { useEffect, useRef, useState } from 'react';

import { ANIME } from '@consumet/extensions';
import { utils } from '../modules/utils';

import ReactHlsPlayer from 'react-hls-player';

function AnimeEpisode(props: { episodeId: string; episodeIndex: number }) {
    const [episodeSource, setEpisodeSource] = useState<string>('');
    const [playerClassName, setPlayerClassName] = useState("hide");
    const playerRef = useRef(null);

    useEffect(() => {
        console.log(playerRef?.current)
    }, []);

    const loadEpisode = () => {
        console.log(props.episodeId)
        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })

        const response = as.fetchEpisodeSources(props.episodeId).then(data => {
            console.log(data.sources)
            setEpisodeSource(data.sources[0].url.toString())
            setPlayerClassName('show')
            playerRef?.current
        })
    }

    return (
        <>
            <div
                id={props.episodeId}
                onClick={loadEpisode}
                className="episode"
            >
                {props.episodeIndex}
            </div>
            <ReactHlsPlayer
                className={playerClassName}
                src={episodeSource}
                autoPlay={true}
                controls={true}
                width="100%"
                height="100%" playerRef={playerRef}
            />
        </>
    )
}

export default AnimeEpisode
