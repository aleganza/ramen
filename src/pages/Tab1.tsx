import { AnimeSaturn } from '../modules/animesaturn'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { ANIME } from '@consumet/extensions'
import { IAnimeResult } from '@consumet/extensions'
import { utils } from '../modules/utils'

import AnimeCard from '../components/AnimeCard'
import './Tab1.css';

const Tab1: React.FC = () => {
    const [results, setResults] = useState<IAnimeResult[]>();

    const getSearchedAnime = (e: Event) => {
        const target = e.target as HTMLIonSearchbarElement;
        if (!target.value) return

        const as = new ANIME.AnimeSaturn({ url: utils.proxyUrl })
        const response = as.search(target.value?.toString()).then(data => {
            console.log(data.results)
            setResults(data.results)
        })
    }

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonSearchbar animated={true} placeholder="Search..." debounce={500} onIonInput={(e) => getSearchedAnime(e)}></IonSearchbar>

                {results?.map((result) => (
                    <AnimeCard key={result.id} animeid={result.id.toString()} title={result.title.toString()} image={result.image}>
                    </AnimeCard>
                ))}

            </IonContent>
        </IonPage>
    );
};

export default Tab1;
