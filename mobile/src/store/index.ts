import {configureStore, combineReducers} from "@reduxjs/toolkit";
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk"

const storage = createSensitiveStorage({
    keychainService: 'weMeetKeyChain',
    sharedPreferencesName: 'com.wemeetapp.SharedPreferences',
});

const rootPersistConfig = {
    key: "root",
    storage,
}

const userPersistConfig = {
    key: "user",
    storage
}

const rootReducer = combineReducers({
    // user: persistReducer(userPersistConfig, {})
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
