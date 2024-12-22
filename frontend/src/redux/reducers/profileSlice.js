// profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// profileSlice.js
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8081';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/profile');
      
      // Parse JSON strings from response
      const parsedData = {
        ...response.data,
        education: JSON.parse(response.data.education || '[]'),
        skills: JSON.parse(response.data.skills || '{}'),
        experience: JSON.parse(response.data.experience || '[]'),
        projects: JSON.parse(response.data.projects || '[]'),
        certifications: JSON.parse(response.data.certifications || '[]')
      };
      
      return parsedData;
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // Convert arrays and objects to JSON strings
      const preparedData = {
        ...profileData,
        education: JSON.stringify(profileData.education || []),
        skills: JSON.stringify(profileData.skills || {}),
        experience: JSON.stringify(profileData.experience || []),
        projects: JSON.stringify(profileData.projects || []),
        certifications: JSON.stringify(profileData.certifications || [])
      };

      const response = await axios.post('/api/profile', preparedData);
      
      // Parse JSON strings back to objects/arrays
      const parsedData = {
        ...response.data,
        education: JSON.parse(response.data.education || '[]'),
        skills: JSON.parse(response.data.skills || '{}'),
        experience: JSON.parse(response.data.experience || '[]'),
        projects: JSON.parse(response.data.projects || '[]'),
        certifications: JSON.parse(response.data.certifications || '[]')
      };

      return parsedData;
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  saveStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  saveError: null // Add this to track save-specific errors
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetSaveStatus: (state) => {
      state.saveStatus = 'idle';
      state.saveError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveProfile.pending, (state) => {
        state.saveStatus = 'loading';
        state.saveError = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Update the profile with the server response
        state.saveStatus = 'succeeded';
        state.saveError = null;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.saveError = action.payload;
      });
  }
});

export const { resetSaveStatus } = profileSlice.actions;

// Export selectors
export const selectProfile = (state) => state.profile.profile;
export const selectLoading = (state) => state.profile.loading;
export const selectError = (state) => state.profile.error;
export const selectSaveStatus = (state) => state.profile.saveStatus;
export const selectSaveError = (state) => state.profile.saveError;

export default profileSlice.reducer;