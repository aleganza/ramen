import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonToggle, IonNavLink, IonButton, IonNav } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { ANIME } from '@consumet/extensions'
import { IAnimeResult } from '@consumet/extensions'
import { utils } from '../modules/utils'

import AnimePage from '../components/AnimePage'
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
                <IonSearchbar animated={true} placeholder="Search for anime" debounce={500} onIonInput={(e) => getSearchedAnime(e)}></IonSearchbar>
                <div className="searched-content">
                    {results?.map((result) => {
                        if (toggleState && result.subOrDub === 'dub'
                            || !toggleState && result.subOrDub === 'sub') {
                            return (
                                <IonNavLink key={result.id} routerDirection="forward"
                                    component={() =>
                                        <AnimePage
                                            animeid={result.id.toString()}
                                            title={result.title.toString()}
                                            image={result.image}>
                                        </AnimePage>
                                    }
                                >
                                    <div className="anime-card-wrapper" id={`${result.id.toString()}`}>
                                        <div className="anime-card">
                                            <img alt="anime-image" src={result.image} />
                                            <h1>{result.title.toString()}</h1>
                                        </div>
                                    </div>
                                </IonNavLink>
                            )
                        }
                    })}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
