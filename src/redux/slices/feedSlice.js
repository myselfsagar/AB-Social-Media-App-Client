import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeOrUnlikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
  try {
    const response = await axiosClient.get("/user/getFeedData");
    return response.result;
  } catch (e) {
    return Promise.reject(e);
  }
});

export const followOrUnfollow = createAsyncThunk(
  "user/followOrUnfollow",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/follow", body);
      return response.result.user;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeOrUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );

        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followOrUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings?.findIndex(
          (item) => item._id === user._id
        );

        if (index != undefined && index != -1) {
          //if already following
          state?.feedData?.followings?.splice(index, 1);
          state?.feedData?.suggestions?.push(user);
        } else {
          // if not following
          state?.feedData?.followings?.push(user);
          //   state?.feedData?.suggestions?.splice(index, 1);
        }
      });
  },
});

export default feedSlice.reducer;
