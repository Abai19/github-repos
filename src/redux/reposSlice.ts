import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  Repo,ErrorRepo} from '../types';

interface RepoState {
  list: Repo[];
  filteredList: Repo[];
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  list: [],
  filteredList: [],
  loading: false,
  error: null,
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    fetchReposRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      // state.list = action.payload;
    },
    fetchReposSuccess(state, action: PayloadAction<Repo[] | undefined>) {
      state.loading = false;
      state.error = null;
      state.list = action.payload || [];
      state.filteredList = action.payload || [];
    },
    fetchReposFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    filterLanguage: (state, action) => {
      state.filteredList = state.list.filter(item => item.language ==action.payload);
    },
    filterAmountStar: (state, action)=> {
      state.filteredList = state.list.filter(item => item.stargazers_count ==action.payload);
    },
    filterAmountForks: (state, action)=> {
      state.filteredList = state.list.filter(item => item.forks_count ==action.payload);
    },
    filterForkStatus: (state, action)=> {
      state.filteredList = state.list.filter(item => item.fork ==action.payload);
    },
    filterDate : (state, action: PayloadAction<'asc' |'desc'>)=> {
      state.filteredList = state.filteredList.sort((a,b)=> {
        if( action.payload =='asc'){
          return  new Date(a.created_at).valueOf()- new Date(b.created_at ).valueOf()
         }
         else {
           return new Date(b.created_at).valueOf()- new Date(a.created_at ).valueOf()
         }
      }
      )
    },
    resetFilter: (state)=> {
      state.filteredList = state.list
    }
  },
});

export const { fetchReposRequest, fetchReposSuccess, filterAmountStar,filterAmountForks,
  filterForkStatus,filterDate,
  fetchReposFailure,filterLanguage,resetFilter } = reposSlice.actions;

export default reposSlice.reducer;
