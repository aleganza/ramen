import { IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Preferences } from '@capacitor/preferences';
import AnimePage from '../components/AnimePage';
import { useEffect, useState } from 'react';

const Tab2: React.FC = () => {
    const [results, setResults] = useState<any>()

    const checkLibrary = async () => {
        const { keys } = await Preferences.keys();

        var data = []
        for (let i in keys) {
            const { value } = await Preferences.get({ key: keys[i] }) 
            data.push(JSON.parse(value || ''))
        }

        setResults(data)
    };

    useEffect(() => {
        checkLibrary()
    }, [])

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Library</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="searched-content">
                    {results?.map((result: any) => (
                        <IonNavLink key={result.id} routerDirection="forward"
                            component={() =>
                                <AnimePage
                                    animeid={result.id}
                                    title={result.title}
                                    image={result.image}>
                                </AnimePage>
                            }
                        >
                            <div className="anime-card-wrapper" id={`${result.id}`}>
                                <div className="anime-card">
                                    <img alt="anime-image" src={result.image} />
                                    <h1>{result.title}</h1>
                                </div>
                            </div>
                        </IonNavLink>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;

