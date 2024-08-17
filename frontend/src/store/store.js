import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import semantleReducer from './slices/semantle';

// Persist configuration
const persistConfig = {
  key: 'root',      // Key for the localStorage (can be any string)
  storage,
  blacklist: ['semantle'], // List of reducers to exclude from persistence
};

// Combine reducers
const rootReducer = combineReducers({
  semantle: semantleReducer,
});

// Create a persisted reducer (for reducers that are not blacklisted)
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid non-serializable error
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };