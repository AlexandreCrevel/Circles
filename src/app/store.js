import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from '../features/api/emptySplitApi';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/Dashboard/dashboardSlice';
import circleReducer from '../features/Circle/CircleSlice';
import calendarReducer from '../features/Circle/Calendar/CalendarSlice';
import eventReducer from '../features/Common/SnackbarGlobal/eventSlice';
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [authApi.reducerPath]: authApi.reducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    circle: circleReducer,
    calendar: calendarReducer,
    event: eventReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // authApi.middleware,
      emptySplitApi.middleware
    ),
});
