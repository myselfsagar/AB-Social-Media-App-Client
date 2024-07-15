import React from "react";
import { CiHeart } from "react-icons/ci";
import Avatar from "../avatar/Avatar";
import backgroundImg from "../../assets/background.jpg";
import { useDispatch, useSelector } from "react-redux";
import "./Post.scss";
import { likeOrUnlikePost } from "../../redux/slices/postsSlice";
import { IoIosHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlePostLikeBtn() {
    // dispatch(
    //   showToast({
    //     type: TOAST_SUCCESS,
    //     message: "like or unlike",
    //   })
    // );
    dispatch(
      likeOrUnlikePost({
        postId: post._id,
      })
    );
  }

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post?.owner?._id}`)}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="Background Image" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLikeBtn}>
          {post?.isLiked ? (
            <IoIosHeart className="like-icon" style={{ color: "red" }} />
          ) : (
            <CiHeart className="like-icon" />
          )}
          <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className="caption">{post?.caption}</p>
        <div className="time-ago">
          <h6>{post?.timeAgo}</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
