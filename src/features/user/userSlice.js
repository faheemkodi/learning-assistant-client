import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  user: {},
  registerError: false,
  registerSuccess: false,
  loginError: false,
  loginSuccess: false,
  getUserError: false,
  getUserSuccess: false,
  updateUserError: false,
  updateUserSuccess: false,
  updatePasswordError: false,
  updatePasswordSuccess: false,
  getResetCodeError: false,
  getResetCodeSuccess: false,
  resetPasswordError: false,
  resetPasswordSuccess: false,
  userLoading: false,
  userMessage: "",
};

// Register user
export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData);
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("user/logout", async () => {
  await userService.logout();
});

// Get user
export const getUser = createAsyncThunk("user/get", async (_, thunkAPI) => {
  try {
    return await userService.getUser(JSON.parse(localStorage.getItem("token")));
  } catch (error) {
    const userMessage = error.response.data["detail"];
    return thunkAPI.rejectWithValue(userMessage);
  }
});

// Update user
export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, thunkAPI) => {
    try {
      return await userService.updateUser(
        userData,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwordData, thunkAPI) => {
    try {
      return await userService.updatePassword(
        passwordData,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Get password reset code
export const getResetCode = createAsyncThunk(
  "user/getResetCode",
  async (userData, thunkAPI) => {
    try {
      return await userService.getResetCode(userData);
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userData, thunkAPI) => {
    try {
      return await userService.resetPassword(userData);
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {};
      state.registerError = false;
      state.registerSuccess = false;
      state.loginError = false;
      state.loginSuccess = false;
      state.getUserError = false;
      state.getUserSuccess = false;
      state.updateUserError = false;
      state.updateUserSuccess = false;
      state.updatePasswordError = false;
      state.updatePasswordSuccess = false;
      state.getResetCodeError = false;
      state.getResetCodeSuccess = false;
      state.resetPasswordError = false;
      state.resetPasswordSuccess = false;
      state.userError = false;
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userLoading = false;
        state.registerSuccess = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.userLoading = false;
        state.registerError = true;
        state.userMessage = action.payload;
        state.token = null;
      })
      .addCase(login.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLoading = false;
        state.loginSuccess = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.userLoading = false;
        state.loginError = true;
        state.userMessage = action.payload;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(getUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.getUserSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userLoading = false;
        state.getUserError = true;
        state.userMessage = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.userLoading = true;
        state.updateUserError = false;
        state.updateUserSuccess = false;
        state.userMessage = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.updateUserSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userLoading = false;
        state.updateUserError = true;
        state.userMessage = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.userLoading = true;
        state.updatePasswordError = false;
        state.updatePasswordSuccess = false;
        state.userMessage = "";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.userLoading = false;
        state.updatePasswordSuccess = true;
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.userLoading = false;
        state.updatePasswordError = true;
        state.userMessage = action.payload;
      })
      .addCase(getResetCode.pending, (state) => {
        state.userLoading = true;
        state.getResetCodeError = false;
        state.getResetCodeSuccess = false;
        state.resetPasswordError = false;
        state.resetPasswordSuccess = false;
      })
      .addCase(getResetCode.fulfilled, (state) => {
        state.userLoading = false;
        state.getResetCodeSuccess = true;
      })
      .addCase(getResetCode.rejected, (state, action) => {
        state.userLoading = false;
        state.getResetCodeError = true;
        state.userMessage = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.userLoading = true;
        state.getResetCodeError = false;
        state.getResetCodeSuccess = false;
        state.resetPasswordError = false;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.userLoading = false;
        state.resetPasswordSuccess = true;
        state.resetCode = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.userLoading = false;
        state.resetPasswordError = true;
        state.userMessage = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
