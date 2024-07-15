import React, { useEffect } from "react";

import Post from "../post/Post";
import "./Feed.scss";
import Avatar from "../avatar/Avatar";
import Follower from "../follower/Follower";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedReducer.feedData);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          {feedData?.posts?.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">You are following</h3>
            {feedData?.followings?.map((following) => (
              <Follower key={following._id} user={following} />
            ))}
          </div>

          <hr
            style={{
              color: "var(--border-color)",
              backgroundColor: "var(--border-color)",
              height: 2,
              border: "none",
            }}
          />

          <div className="suggestions">
            <h3 className="title">Suggested people to follow</h3>
            {feedData?.suggestions?.map((suggestion) => (
              <Follower key={suggestion._id} user={suggestion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
