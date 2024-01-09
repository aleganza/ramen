import './AnimePage.css';

import { ANIME, IAnimeInfo } from '@consumet/extensions';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonItem,
    IonList,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';

import { utils } from '../modules/utils';
import AnimeEpisode from './AnimeEpisode';

function AnimePage(props: { animeid: string; image: string | undefined; title: string }) {
    const [result, setResult] = useState<IAnimeInfo>();

    const getAnimeData = () => {
        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })
        console.log(props.animeid)
        const response = as.fetchAnimeInfo(props.animeid).then(data => {
            console.log(data)
            setResult(data)
        })
    }

    const filterEpisodes = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();



        // setResult(data.filter((d: string) => d.toLowerCase().indexOf(query) > -1));
    };

    useEffect(() => {
        getAnimeData()
    }, [])

    return (
        <>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{props.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonImg
                    className='cover'
                    src={props.image}
                    alt="anime image"
                ></IonImg>
                <IonSearchbar
                    animated={true}
                    placeholder="Search for episodes"
                    onIonInput={(ev) => filterEpisodes(ev)}
                ></IonSearchbar>
                <div className="episodes-grid">
                    {result?.episodes?.map((episode, index) => (
                        <AnimeEpisode key={episode.id} episodeId={episode.id} episodeIndex={index + 1}></AnimeEpisode>
                    ))}
                </div>
            </IonContent>
        </>
    );
}

export default AnimePage;
