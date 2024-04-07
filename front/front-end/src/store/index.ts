import {configureStore} from '@reduxjs/toolkit';
import userTypeReducer from './user-type';
import userDataReducer from './user-data';
import stageReducer from './stage';

const store = configureStore({
    reducer:
    {
        userType: userTypeReducer,
        userData: userDataReducer,
        stage: stageReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;