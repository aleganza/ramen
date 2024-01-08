import './AnimeCard.css';

import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { close } from 'ionicons/icons';
import { utils } from '../modules/utils'
import { ANIME } from '@consumet/extensions';
import { IAnimeInfo } from '@consumet/extensions'

import AnimeEpisode from './AnimeEpisode'

function AnimePage(props: { animeid: string; image: string | undefined; title: string; displayDub: boolean; isDub: string }) {
    const modal = useRef<HTMLIonModalElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<IAnimeInfo>();

    const getAnimeData = () => {
        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })
        console.log(props.animeid)
        const response = as.fetchAnimeInfo(props.animeid).then(data => {
            console.log(data)
            setResult(data)
        })
    }

    useEffect(() => {
        if (isOpen) getAnimeData()
    }, [isOpen])


    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{props.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonImg
                        src={props.image}
                        alt="anime image"
                    ></IonImg>
                </IonItem>
                <IonList>
                    {result?.episodes?.map((episode, index) => (
                        <AnimeEpisode key={episode.id} episodeId={episode.id} episodeIndex={index}></AnimeEpisode>
                    ))}
                </IonList>
            </IonContent>
            {/* <IonModal ref={modal} trigger={`${props.animeid}`} isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>
                                {result?.title.toString()}
                            </IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>
                                    <IonIcon aria-hidden="true" icon={close} />
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem>
                            <IonImg
                                src={props.image}
                                alt="anime image"
                            ></IonImg>
                        </IonItem>
                        <IonList>
                            {result?.episodes?.map((episode, index) => (
                                <AnimeEpisode key={episode.id} episodeId={episode.id} episodeIndex={index}></AnimeEpisode>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal> */}
        </>
    );
}

export default AnimePage;
