import React, { useEffect, useState } from "react";
import defaultUserImg from "../../assets/user.png";
import "./UpdateProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyProfile,
  showToast,
  updateMyProfile,
} from "../../redux/slices/appConfigSlice";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";
import { TOAST_SUCCESS } from "../../App";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url);

    // if (myProfile?.avatar?.url) {
    //   setUserDp(myProfile.avatar.url);
    // } else {
    //   setUserDp(userImg);
    // }
  }, [myProfile]);

  function handleImageChange(e) {
    try {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setUserImg(fileReader.result);
          console.log(fileReader.result);
        }
      };
    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(
        updateMyProfile({
          name,
          bio,
          userImg,
        })
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async function handleDeleteProfile() {
    try {
      dispatch(deleteMyProfile());
      store.dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "User profile deleted",
        })
      );
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left-part">
          {/* <img src={userImg} alt="user image" className="user-img" /> */}
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : defaultUserImg} alt={name} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="inputImg"
              className="inputImg"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="vertical"></div>

        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <input
              type="submit"
              value="Submit"
              className="submit btn-primary"
              onClick={handleSubmit}
            />
          </form>

          <button
            className="delete-account btn-primary"
            onClick={handleDeleteProfile}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
