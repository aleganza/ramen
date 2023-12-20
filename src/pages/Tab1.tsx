import { AnimeSaturn } from '../modules/animesaturn'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Search from '../components/Search'
import './Tab1.css';

const Tab1: React.FC = async () => {
    // const cons = new AnimeSaturn
    // console.log(await cons.getEpisodeUrl('ONE PIECE', 7))

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Search></Search>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
