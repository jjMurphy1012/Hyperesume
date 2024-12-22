// src/redux/reducers/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const validateAdminAccess = createAsyncThunk(
    'admin/validateAccess',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/auth/validate', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Admin validation failed');
        }
        
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getAdminSessionInfo = createAsyncThunk(
    'admin/getSessionInfo',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/session', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to get admin session');
        }
        
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// Async thunk for fetching all users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/users', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating user
export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          username: userData.username,
          role: userData.role,
          profile: userData.profile
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Update failed');
      }

      // Return the updated user data since the backend returns just a message
      return { id: userId, ...userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting user
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error === 'CannotDeleteSelf' ? 
          'Cannot delete your own account' : 
          'Delete failed');
      }

      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    users: [],
    status: 'idle',
    error: null,
    lastUpdated: null,
    adminInfo: null,
    sessionInfo: null,
    adminValidated: false
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users cases
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete user cases
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter(user => user.id !== action.payload);
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Admin validation cases
  .addCase(validateAdminAccess.pending, (state) => {
    state.status = 'loading';
    state.error = null;
  })
  .addCase(validateAdminAccess.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.adminInfo = action.payload;
    state.adminValidated = true;
    state.error = null;
  })
  .addCase(validateAdminAccess.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload;
    state.adminValidated = false;
    state.adminInfo = null;
  })
  // Session info cases
  .addCase(getAdminSessionInfo.pending, (state) => {
    state.status = 'loading';
    state.error = null;
  })
  .addCase(getAdminSessionInfo.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.sessionInfo = action.payload;
    state.error = null;
  })
  .addCase(getAdminSessionInfo.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload;
    state.sessionInfo = null;
  });
  },
});

// Selectors
export const selectAllUsers = (state) => state.admin.users;
export const selectAdminStatus = (state) => state.admin.status;
export const selectAdminError = (state) => state.admin.error;
export const selectLastUpdated = (state) => state.admin.lastUpdated;

export const selectAdminInfo = (state) => state.admin.adminInfo;
export const selectSessionInfo = (state) => state.admin.sessionInfo;
export const selectIsAdminValidated = (state) => state.admin.adminValidated;

export default adminSlice.reducer;