import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  user: {},
  users: [],
  courses: [],
  lessons: [],
  topics: [],
  bursts: [],
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
  sudoError: false,
  sudoSuccess: false,
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
export const logout = createAsyncThunk("user/logout", () => {
  userService.logout();
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

// Sudo get all users
export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async (_, thunkAPI) => {
    try {
      return await userService.getAllUsers(
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo get user's courses
export const getUserCourses = createAsyncThunk(
  "user/getUserCourses",
  async (id, thunkAPI) => {
    try {
      return await userService.getUserCourses(
        id,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo get user's lessons
export const getUserLessons = createAsyncThunk(
  "user/getUserLessons",
  async (id, thunkAPI) => {
    try {
      return await userService.getUserLessons(
        id,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo get user's topics
export const getUserTopics = createAsyncThunk(
  "user/getUserTopics",
  async (id, thunkAPI) => {
    try {
      return await userService.getUserTopics(
        id,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo get user's bursts
export const getUserBursts = createAsyncThunk(
  "user/getUserBursts",
  async (id, thunkAPI) => {
    try {
      return await userService.getUserBursts(
        id,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo make user sudo
export const updateSudo = createAsyncThunk(
  "user/updateSudo",
  async (id, thunkAPI) => {
    try {
      return await userService.updateSudo(
        id,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo renew user
export const renew = createAsyncThunk("user/renew", async (id, thunkAPI) => {
  try {
    return await userService.renew(
      id,
      JSON.parse(localStorage.getItem("token"))
    );
  } catch (error) {
    const userMessage = error.response.data["detail"];
    return thunkAPI.rejectWithValue(userMessage);
  }
});

// Sudo delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUser(
        id,
        JSON.parse(localStorage.getItem("token"))
      );
    } catch (error) {
      const userMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(userMessage);
    }
  }
);

// Sudo create invite
export const sudoInvite = createAsyncThunk(
  "user/sudoInvite",
  async (inviteData, thunkAPI) => {
    try {
      return await userService.sudoInvite(
        inviteData,
        JSON.parse(localStorage.getItem("token"))
      );
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
      state.users = [];
      state.courses = [];
      state.lessons = [];
      state.topics = [];
      state.bursts = [];
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
      state.sudoError = false;
      state.sudoSuccess = false;
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
      })
      .addCase(getAllUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.users = action.payload;
        state.users.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(getUserCourses.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserCourses.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.courses = action.payload;
        state.courses.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getUserCourses.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(getUserLessons.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserLessons.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.lessons = action.payload;
        state.lessons.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getUserLessons.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(getUserTopics.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserTopics.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.topics = action.payload;
        state.topics.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getUserTopics.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(getUserBursts.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserBursts.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.bursts = action.payload;
        state.bursts.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(getUserBursts.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(updateSudo.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateSudo.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        state.users.push(action.payload);
        state.users.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(updateSudo.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(renew.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(renew.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        state.users.push(action.payload);
        state.users.sort(function (a, b) {
          return a.id - b.id;
        });
      })
      .addCase(renew.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      })
      .addCase(sudoInvite.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(sudoInvite.fulfilled, (state, action) => {
        state.userLoading = false;
        state.sudoSuccess = true;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(sudoInvite.rejected, (state, action) => {
        state.userLoading = false;
        state.sudoError = true;
        state.userMessage = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
