


import { configureStore } from '@reduxjs/toolkit' ;
import userDetailSlice from '../features/userDetailSlice';

const store = configureStore({
  reducer: {
    app :userDetailSlice // es me app jo likha hai us ki jagh kuchh bhi likha skte hai ! , aap nam hai key ka (es ka name dena bhut jaruri hai )
  }
 
})

export default store ;




// https://668d19ee099db4c579f1b73d.mockapi.io/crud     // mockAPI 