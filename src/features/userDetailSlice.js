import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create action
export const createUser = createAsyncThunk("createUser", async (data) => {
    const response = await fetch("https://64ce9e270c01d81da3eef9fb.mockapi.io/redux-crud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    const result = await response.json();
    return result;
});

//Read action
export const showUser = createAsyncThunk("showUser", async (_,{ rejectWithValue }) => {
    try {   
      const response = await axios.get("https://64ce9e270c01d81da3eef9fb.mockapi.io/redux-crud");
      return response.data; // Assuming the data you want is in response.data
    } catch (err) {
      return rejectWithValue(err.response.data); // Return the error response data
    }
  });

  //delete action
export const deleteUser = createAsyncThunk("deleteUser", async (id,{ rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://64ce9e270c01d81da3eef9fb.mockapi.io/redux-crud/${id}`);
      return response.data; // Assuming the data you want is in response.data
    } catch (err) {
      return rejectWithValue(err.response.data); // Return the error response data
    }
  });

  //update action

  export const updateUser = createAsyncThunk("updateUser", async (data,{rejectWithValue}) => {
    console.log("updated data",data);
    const response = await axios.put(`https://64ce9e270c01d81da3eef9fb.mockapi.io/redux-crud/${data.id}`, data);
    return response.data;
  });

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload); // Assuming the payload contains the complete user data
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [showUser.pending]: (state) => {
            state.loading = true;
        },
        [showUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = (action.payload); 
        },
        [showUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const {id} = action.payload;

            if(id){
                state.users = state.users.filter((ele)=> ele.id !== id)
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [updateUser.pending]: (state) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele) => ele.id === action.payload.id ? action.payload : ele); 
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    },
});

export default userDetail.reducer;
