import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk
// create action , --------------- create ke liye jo jo chahiye yha par hai ---------------------- (1)
//  user jab create karte hai tab es function ko call krwana hai
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

// read action , ----------------data ko read karne ke liye jo bhi jaruri hai us ke liye yha par function hai ---------(2)
export const showUsers = createAsyncThunk("showUsers", async()=>{
    const response = await fetch('https://668d19ee099db4c579f1b73d.mockapi.io/crud' ,{
        method:"GET", // likhne ki jarurt hoti nahi hai kyu ki by difault get hi hota hai
      
    });
    try {
        const result = await response.json();
        return result ;
    } catch (error) {
        console.log(error)
    }
})


// edit action , ----------------data ko edit karne ke liye jo bhi jaruri hai us ke liye yha par function hai ---------(3)
export const editUser = createAsyncThunk("editUser", async(user)=>{
    const response = await fetch(`https://668d19ee099db4c579f1b73d.mockapi.io/crud/${user.id}` ,{
        method: "PUT",   
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user) // asynce se jo data aarha hai wo , stringify me jayega
    });
    try {
        const result = await response.json();
        return result ;
    } catch (error) {
        console.log(error)
    }
})


// delete action , ----------------data ko delete karne ke liye jo bhi jaruri hai us ke liye yha par function hai ---------(4)
export const deleteUser = createAsyncThunk("deleteUser", async(id)=>{
    const response = await fetch(`https://668d19ee099db4c579f1b73d.mockapi.io/crud/${id}` ,{
        method: "DELETE",    
      
    });
    try {
        const result = await response.json();
        return result ;
    } catch (error) {
        console.log(error)
    }
})



// createSlice ----MAIN----
const userDetailSlice = createSlice({
    name:"userDetail",
    initialState:{
        users: [],
        loading:false,
        error: null,
        searchData:[],

    },
    // ________Ole Tarika hai AAj 10-7-2024 ki date me ye work nahi kar rha hai__________importent Note Start
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
    //  ________Ole Tarika hai AAj 10-7-2024 ki date me ye work nahi kar rha hai__________importent Note End
    reducers:{
        searchData : (state,action)=>{ // es ko export karne ke liye "----- searchData.action ------ export"
            state.searchData = action.payload
        }
    },
    extraReducers: (builder)=>{  // Api hit kar rhe hai es ke liye "extraReducers" bna rhe hai 
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
        // read
        .addCase(showUsers.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(showUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(showUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
         // edit
         .addCase(editUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.loading = false;
            // state.users = action.payload
            const updatedUser = action.payload;
            state.users = state.users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            );
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete
        .addCase(deleteUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            const {id} = action.payload
            if(id){
                state.users = state.users.filter((user)=> user.id !== id)
            }
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {searchData} = userDetailSlice.actions

export default userDetailSlice.reducer; 