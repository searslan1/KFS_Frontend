import { configureStore } from "@reduxjs/toolkit"
import campaignsReducer from "./slices/campaignsSlice"
import authReducer from "./slices/authSlice"
import featuresReducer from "./slices/featuresSlice"
import statsReducer from "./slices/statsSlice"
import ctaReducer from "./slices/ctaSlice"
import partnersReducer from "./slices/partnersSlice"
import subsidiariesReducer from "./slices/subsidiariesSlice"

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    auth: authReducer,
    features: featuresReducer,
    stats: statsReducer,
    cta: ctaReducer,
    partners: partnersReducer,
    subsidiaries: subsidiariesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

