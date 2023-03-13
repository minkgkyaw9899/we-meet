import {AppRegistry} from 'react-native';
import App from 'app/App';
import {name as appName} from 'app/app.json';
import {NativeBaseProvider} from "native-base";
import {Provider} from "react-redux"
import {persistor, store} from "store";
import {PersistGate} from "redux-persist/integration/react";

const Main = () => {
    return <NativeBaseProvider>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </NativeBaseProvider>
}

AppRegistry.registerComponent(appName, () => Main);
