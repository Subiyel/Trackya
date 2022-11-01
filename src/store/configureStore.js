// import { createStore, applyMiddleware } from 'redux'
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './reducers/appReducer'
import logger from 'redux-logger'
import { persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger)
})
