  import { configureStore } from '@reduxjs/toolkit';
  import createSagaMiddleware from 'redux-saga';
  import { rootSaga } from './reposSaga';
  import reposSlice  from './reposSlice';

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      repos: reposSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export default store;