import { call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { Api, fetchRepos } from '../api/api';
import { fetchReposRequest, fetchReposSuccess, fetchReposFailure } from  '../redux/reposSlice';
import { Repo } from '../types';

function* fetchTodosSaga(action:ReturnType<typeof fetchReposRequest>)
{
  try {
    const repos: Repo[]  = yield call(fetchRepos, action.payload);
    if(repos){
      yield put(fetchReposSuccess(repos));
    }
    else {
      yield put(fetchReposSuccess(undefined));
     yield put(fetchReposFailure('error'));
    }
  } catch (error:any) {
    yield put(fetchReposFailure(error.message));
    yield put(fetchReposSuccess(undefined));
  }
}

export function* rootSaga() {
  yield takeLatest(fetchReposRequest.type, fetchTodosSaga);
}