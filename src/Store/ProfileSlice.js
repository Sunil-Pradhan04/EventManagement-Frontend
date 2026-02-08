import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoader } from "./loderSlice";
import { API_URL } from "../config";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoader(true));
      const res = await fetch(`${API_URL}/api/EVENT/`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoader(false));
    }
  }
);

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        console.log("Fetched profile data:", action);
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})
export default ProfileSlice.reducer;
export const selectProfile = (state) => state.profile.data;