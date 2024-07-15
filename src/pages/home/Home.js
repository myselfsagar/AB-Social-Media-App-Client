import { Outlet } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import Navbar from "../../components/navbar/Navbar";

import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

function Home() {
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   const response = await axiosClient.get("/posts/all");
  //   console.log("got the response: ", response);
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  return (
    <>
      <Navbar />
      margin-top: 80px;
      <div className="outlet" style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
