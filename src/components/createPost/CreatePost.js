import React, { useState } from "react";
import "./CreatePost.scss";
import Avatar from "../avatar/Avatar";
import defaultPostImg from "../../assets/background.jpg";
import { FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { getUserProfile } from "../../redux/slices/postsSlice";

function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const dispatch = useDispatch();

  function handleImageChange(e) {
    try {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setPostImg(fileReader.result);
        }
      };
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePostSubmit() {
    try {
      const result = await axiosClient.post("/posts/", {
        caption,
        postImg,
      });
      console.log("post done: ", result);

      dispatch(
        getUserProfile({
          userId: myProfile._id,
        })
      );
    } catch (e) {
    } finally {
      setCaption("");
      setPostImg("");
    }
  }
  return (
    <div className="CreatePost">
      <div className="createPost-left-part">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="createPost-right-part">
        <input
          type="text"
          className="captionInput"
          placeholder="What's in your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {postImg && (
          <div className="img-container">
            <img src={postImg} alt="post-img" className="post-img" />
          </div>
        )}

        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <FaImage />
            </label>
            <input
              type="file"
              accept="image/*"
              id="inputImg"
              onChange={handleImageChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
