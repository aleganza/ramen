import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonToggle } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { ANIME } from '@consumet/extensions'
import { IAnimeResult } from '@consumet/extensions'
import { utils } from '../modules/utils'

import AnimeCard from '../components/AnimeCard'
import './Tab1.css';

const Tab1: React.FC = () => {
    const [results, setResults] = useState<IAnimeResult[]>();
    const [toggleState, setToggleState] = useState(false);

    const getSearchedAnime = (e: Event) => {
        const target = e.target as HTMLIonSearchbarElement;
        if (!target.value) return

        const as = new ANIME.AnimeUnity({ url: utils.proxyUrl })

        const response = as.search(target.value?.toString()).then(data => {
            console.log(data.results)
            setResults(data.results)
        })
    }

    const handleToggleChange = () => {
        const newToggleState = !toggleState;
    
        setToggleState(newToggleState);
    };

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Search</IonTitle>
                    <IonToggle
                        checked={toggleState} 
                        onIonChange={handleToggleChange}>Dub</IonToggle>
                    </IonToolbar>
                </IonHeader>
                
                <IonSearchbar animated={true} placeholder="Search..." debounce={500} onIonInput={(e) => getSearchedAnime(e)}></IonSearchbar>
                <div className="searched-content">
                    {results?.map((result) => (
                        <AnimeCard key={result.id} animeid={result.id.toString()} title={result.title.toString()} image={result.image} displayDub={toggleState} isDub={result.subOrDub}>
                        </AnimeCard>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
