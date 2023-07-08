import { configureStore, combineReducers } from "@reduxjs/toolkit"
import weatherDataReducer from './weatherDataSlice'

const rootReducer = combineReducers({
    weatherData: weatherDataReducer 
})

export const store = configureStore({
    reducer: rootReducer
})