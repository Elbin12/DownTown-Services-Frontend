import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    users:[],
    selectedUser:'',
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
        }
    }
})

export const {setUsers, setSelectedUser} = adminSlice.actions;
export default adminSlice.reducer;