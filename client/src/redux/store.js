import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
    key: 'root',
    storage,
}

const userPersistConfig = {
    key: 'user',
    storage,
    version: 1,
    blacklist: ["loading", "error"]
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export const persistor = persistStore(store);