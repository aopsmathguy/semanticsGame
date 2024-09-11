import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import gameReducer from "./slices/game.js";

// Persist configuration
const persistConfig = {
  key: "game.profile", // Key for the localStorage, specific to profile
  storage,
  whitelist: ["profile"], // Only persist the 'profile' property within game state
};

// Combine reducers
const rootReducer = combineReducers({
  game: gameReducer,
});

// Create a persisted reducer for the game.profile slice
const persistedGameReducer = persistReducer(persistConfig, gameReducer);

// Use the persisted reducer for the 'game' slice
const store = configureStore({
  reducer: {
    game: persistedGameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid non-serializable error
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };