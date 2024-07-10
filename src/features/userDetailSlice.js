import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk
// create action , user jab create karte hai tab es function ko call krwana hai
export const createUser = createAsyncThunk("createUser" , async(data , {rejectWithValue})=>{  // function & "" ke andar jo likha hai domo ka name same hai (createUser) , yha par jo data hai wo ham dispatch se pass karne wale hai components se
    const response = await fetch('https://668d19ee099db4c579f1b73d.mockapi.io/crud' ,{  // yha par ham axios ya fetch kisi ka bhi use kar skte hai 
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data) // asynce se jo data aarha hai wo , stringify me jayega
    }); 
    try {
        const result = await response.json();
        return result ;
    } catch (error) {
        console.log(error)
        return rejectWithValue("rejectWithValue",error.response)
    }
    
})



// createSlice ----MAIN----
const userDetailSlice = createSlice({
    name:"userDetail",
    initialState:{
        users: [],
        loading:false,
        error: null,

    },
    // extraReducers:{
    //     [createUser.pending] : (state , action)=>{
    //         state.loading = true;
    //     },
    //     [createUser.fulfilled] : (state,action) =>{
    //         state.loading = false;
    //         state.users.push(action.payload)
    //     },
    //     [createUser.rejected] : (state , action)=>{
    //         state.loading = false;
    //         state.error = action.payload ;
    //     }
    // }
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
        .addCase(createUser.pending , (state,action)=>{
            state.loading = true;
        })
        .addCase(createUser.fulfilled , (state,action)=>{
            state.loading = false;
            state.users.push(action.payload)
        })
        .addCase(createUser.rejected , (state,action)=>{
            state.error = action.payload
        })
    }
})


// export const  {} =  userDetailSlice.actions;

export default userDetailSlice.reducer;