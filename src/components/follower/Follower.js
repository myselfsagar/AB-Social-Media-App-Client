import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import "./Follower.scss";
import { followOrUnfollow, getFeedData } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Follower({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feedReducer.feedData);
  const [isFollowing, setIsFollowing] = useState("");

  useEffect(() => {
    setIsFollowing(feedData?.followings?.find((item) => item._id === user._id));
  }, [feedData]);

  function handleFollowOrUnfollow() {
    dispatch(
      followOrUnfollow({
        userIdToFollow: user._id,
      })
    );
  }

  return (
    <div className="Follower">
      <div
        className="user-info hover-link"
        onClick={() => navigate(`/profile/${user?._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4>{user?.name}</h4>
      </div>

      <h5
        className={isFollowing ? "hover-link follow-link" : "btn-primary"}
        onClick={handleFollowOrUnfollow}
      >
        {isFollowing ? "UnFollow" : "Follow"}
      </h5>
    </div>
  );
}

export default Follower;
