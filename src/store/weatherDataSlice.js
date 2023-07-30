import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetData = createAsyncThunk(
    'data/fetchWeather', 
    async (cityName, { rejectWithValue }) => {
        try {
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${REACT_APP_WEATHER_API_TOKEN}`)
            
            if (geoRes.ok) {
                const geoData = await geoRes.json()
                const { lat, lon } = geoData[0]
                try {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${REACT_APP_WEATHER_API_TOKEN}`)
                    if (res.ok) {
                        const data = await res.json()
                        const { city, list } = data
                        return { city, list }
                    } else {
                        throw new Error('Connect is unauthorized')
                    }
                } catch (err) {
                    return rejectWithValue(err.message)
                }
            } else {
                throw new Error('Parameter is not a string')
            }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const weatherDataSlice = createSlice({
    name: 'data',
    initialState: {
        isFetching: false,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetData.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(fetchGetData.fulfilled, (state, action) => {
                state.isFetching = false
                state.data = action.payload
                state.error = null
            })
            .addCase(fetchGetData.rejected, (state, { payload }) => {
                state.isFetching = false
                state.error = payload
            })
    }
})

// export const { getWeatherData } = weatherDataSlice.actions
export default weatherDataSlice.reducer
