import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    workerinfo:[]
}

console.log(INITIAL_STATE.users);


const workerSlice = createSlice({
    name:'worker',
    initialState:INITIAL_STATE,
    reducers:{
        setWorkerinfo: (state, action)=>{
            state.worker = action.payload;
        }
    }
})

export const {setWorkerinfo} = workerSlice.actions;
export default workerSlice.reducer;