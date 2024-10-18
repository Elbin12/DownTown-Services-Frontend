import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    users:[],
    selectedUser:'',
    workers:[],
    requests:[],
    selectedCategory:'',
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
        setSelectedCategory:(state, action)=>{
            state.selectedCategory = action.payload;
        }
    }
})

export const {setUsers, setSelectedUser, setWorkers, setRequests, setSelectedCategory} = adminSlice.actions;
export default adminSlice.reducer;