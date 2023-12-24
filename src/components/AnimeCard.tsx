import './AnimeCard.css';

import {
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

import AnimeEpisode from '../components/AnimeEpisode'

function AnimeCard(props: { animeid: string; image: string | undefined; title: string }) {
    const modal = useRef<HTMLIonModalElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<IAnimeInfo>();

    const getAnimeData = () => {
        const as = new ANIME.AnimeSaturn({ url: utils.proxyUrl })
        console.log(props.animeid)
        const response = as.fetchAnimeInfo(props.animeid).then(data => {
            console.log(data)
            setResult(data)
        })
    }

    useEffect(() => {
        if (isOpen) {
            getAnimeData()
        }
    }, [isOpen])

    return (
        <>
            <IonCard button={true} id={`${props.animeid}`} onClick={() => setIsOpen(true)}>
                <img alt="anime-image" src={props.image} />
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
            </IonCard>
            <IonModal ref={modal} trigger={`${props.animeid}`} isOpen={isOpen}>
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
                            alt="The Wisconsin State Capitol building in Madison, WI at night"
                        ></IonImg>
                    </IonItem>
                    <IonList>
                        {result?.episodes?.map((episode, index) => (
                            <AnimeEpisode key={result.id} episodeId={episode.id} episodeIndex={index}></AnimeEpisode>
                        ))}
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}
export default AnimeCard;
