import { createSlice } from "@reduxjs/toolkit";




const INITIAL_STATE = {
    userinfo:''
}

// first_name:'',
//         last_name:'',
//         email:'',
//         dob:'',
//         gender:'',
//         profile_pic:'',
//         isActive:false,
//         isAdmin:false,

console.log(INITIAL_STATE.userinfo, 'hiiiii');


const userSlice = createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        setUserinfo: (state, action)=>{
            state.userinfo = action.payload;
        }
    }
})

export const {setUserinfo} = userSlice.actions;
export default userSlice.reducer;