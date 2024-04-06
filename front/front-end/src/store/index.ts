import {configureStore} from '@reduxjs/toolkit';
import userTypeReducer from './user-type';
import userDataReducer from './user-data';

const store = configureStore({
    reducer:
    {
        userType: userTypeReducer,
        userData: userDataReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;