import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    users:[],
    selectedUser:'',
    workers:[],
    requests:[],
}

console.log(INITIAL_STATE.users);


const adminSlice = createSlice({
    name:'admin',
    initialState:INITIAL_STATE,
    reducers:{
        setUsers: (state, action)=>{
            state.users = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setWorkers: (state, action)=>{
            state.workers = action.payload;
        },
        setRequests: (state, action)=>{
            state.requests = action.payload;
        },
    }
})

export const {setUsers, setSelectedUser, setWorkers, setRequests} = adminSlice.actions;
export default adminSlice.reducer;