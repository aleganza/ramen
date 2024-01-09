import './AnimeEpisode.css';

import { ANIME } from '@consumet/extensions';
import { useRef, useState } from 'react';

import { utils } from '../modules/utils';

import ReactPlayer from 'react-player'

function AnimeEpisode(props: { episodeId: string; episodeIndex: number }) {
    const [episodeSource, setEpisodeSource] = useState<string>('');
    const [playerClassName, setPlayerClassName] = useState("hide");
    const playerRef = useRef(null);

    const loadEpisode = () => {
        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })

        const response = as.fetchEpisodeSources(props.episodeId).then(data => {
            setEpisodeSource(data.sources[0].url.toString())
            setPlayerClassName('show')
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
            <ReactPlayer
                className={playerClassName}
                ref={playerRef}
                url={episodeSource}
                playing={true}
                config={{
                    file: {
                        forceHLS: true
                    }
                }}
                controls={true}
                width="100%"
                height="100%"
            />
        </>
    )
}

export default AnimeEpisode
