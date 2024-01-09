import './AnimePage.css';

import { Preferences } from '@capacitor/preferences';
import { ANIME, IAnimeInfo } from '@consumet/extensions';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonList,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { bookmarkOutline, checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import { utils } from '../modules/utils';
import AnimeEpisode from './AnimeEpisode';

function AnimePage(props: { animeid: string; image: string | undefined; title: string }) {
    const [result, setResult] = useState<IAnimeInfo>();
    const [isInLIbrary, setIsInLibrary] = useState(false)

    const getAnimeData = () => {
        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })
        const response = as.fetchAnimeInfo(props.animeid).then(data => {
            setResult(data)
        })
    }

    const filterEpisodes = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        // setResult(data.filter((d: string) => d.toLowerCase().indexOf(query) > -1));
    };

    // store
    const checkLibrary = async () => {
        const { value } = await Preferences.get({ key: props.animeid });

        if (value === null) setIsInLibrary(false)
        else setIsInLibrary(true)
    };

    useEffect(() => {
        getAnimeData()
        checkLibrary()
    }, [])

    const addToLibrary = async () => {
        setIsInLibrary(true)

        await Preferences.set({
            key: props.animeid,
            value: JSON.stringify(
                    {
                        id: props.animeid,
                        image: props.image,
                        title: props.title
                    }
                ),
        });
    }

    const removeFromLibrary = async () => {
        setIsInLibrary(false)

        await Preferences.remove({ key: props.animeid });
    }

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
                <IonList>
                    {isInLIbrary
                        ? <IonButton
                            onClick={removeFromLibrary}
                            size="small"
                        >
                            <IonIcon slot="start" aria-hidden="true" icon={checkmark} />
                            In Library
                        </IonButton>
                        : <IonButton
                            onClick={addToLibrary}
                            size="small"
                            fill="outline"
                        >
                            <IonIcon slot="start" aria-hidden="true" icon={bookmarkOutline} />
                            Add to Library
                        </IonButton>
                    }
                </IonList>
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
