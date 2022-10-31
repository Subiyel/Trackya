import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './reducers/appReducer'
import logger from 'redux-logger'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger))
  let persistor = persistStore(store)
  return { store, persistor }
}