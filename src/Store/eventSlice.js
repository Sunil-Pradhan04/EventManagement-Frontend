import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setLoader } from "./loderSlice";
import { API_URL } from "../config";

// Async thunk to fetch events by page
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ page = 1, lite = false, search = "", filter = "all" }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoader(true));
      let url = `${API_URL}/api/EVENT/getEvent?page=${page}&limit=10&lite=${lite}`;
      if (search) {
        url += `&search=${search}`;
      }
      if (filter && filter !== "all") {
        url += `&filter=${filter}`;
      }
      const res = await fetch(
        url,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      dispatch(setLoader(false));
      return {
        events: data.events,
        page: data.page,
        totalPages: data.totalPages,
        total: data.total,
      };
    } catch (err) {
      dispatch(setLoader(false));
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to fetch full event details
export const fetchEventDetails = createAsyncThunk(
  "events/fetchEventDetails",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoader(true));
      const res = await fetch(`${API_URL}/api/EVENT/getEventById/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      dispatch(setLoader(false));
      return data;
    } catch (err) {
      dispatch(setLoader(false));
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetEvents: (state) => {
      state.list = [];
      state.page = 1;
      state.totalPages = 1;
    },
    addEvent: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateEvent: (state, action) => {
      const updated = action.payload;
      const index = state.list.findIndex((e) => e._id === updated._id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updated };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload.page === 1) {
          state.list = action.payload.events;
        } else {
          // Merge and deduplicate
          const newEvents = action.payload.events.filter(
            (ne) => !state.list.some((e) => e._id === ne._id)
          );
          state.list = [...state.list, ...newEvents];
        }
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload; // Update existing with full details
        } else {
          state.list.push(action.payload); // Add if not exists
        }
      });
  },
});

export const { resetEvents, addEvent, updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
