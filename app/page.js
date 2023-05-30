"use client";

import {
  getRequestHandler,
  loginHandler,
  logoutHandler,
  postRequestHandler,
  putRequestHandler,
} from "@/apiHandler/customApiHandler";
import decryptData from "@/apiHandler/utils/decryption";
import { headers } from "@/next.config";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const checkGet = async () => {
    let data = await getRequestHandler("/");
    console.log("get request ----- ", data);
    setResponse(data);
  };

  const checkPost = async () => {
    let data = await postRequestHandler("/auth/signup", {
      email: "manas@gmail.com",
      phoneNumber: "01515212628",
      password: "111111",
    });
    console.log("post request ----- ", data);
    setResponse(data);
  };

  const checkLogin = async () => {
    let url = "/auth/login";
    let phoneNumber = "01515212628";
    let password = "111111";

    let data = await loginHandler(url, phoneNumber, password);
    console.log("post request ----- ", data);
    setResponse(data);
  };

  const checkAuth = async () => {
    let data = await getRequestHandler("/auth/authcheck");
    console.log("get request ----- ", data);
    setResponse(data);
  };
  const checkLogout = async () => {
    let data = await logoutHandler("/auth/logout");
    console.log("get request ----- ", data);
    setResponse(data);
  };

  const uploadAnImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePhoto", selectedFile);

      // const accessToken = localStorage.getItem("accessToken");
      // const headers = {
      //   Authorization: `Bearer ${accessToken}`,
      //   "Content-Type": "multipart/form-data",
      // };
      
      // console.log("formData ----- ", formData);

      // let data = await axios
      //   .put("https://marpapi.techanalyticaltd.com/user/profile/uploadpicture", formData, {
      //     headers,
      //   })
      //   .then((response) => {
      //     let responseData = JSON.parse(decryptData(response.data.encoded));
      //     // let responseData = response.data.encoded;
      //     console.log("Upload successful");
      //     console.log(responseData);
      //   });

      let data = await putRequestHandler(formData);

      console.log("put request ----- ", data);
      setResponse(data);
    }
  };

  return (
    <main>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <button onClick={checkGet}>get check</button>
          <br />
          <button onClick={checkPost}>signup check</button>
          <br />
          <button onClick={checkLogin}>login check</button>
          <br />
          <button onClick={checkAuth}>Auth check</button>
          <br />
          <button onClick={checkLogout}>Logout check</button>
          <br />
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "80%",
            height: "80vh",
          }}
        >
          <button
            onClick={() => {
              setResponse("");
            }}
          >
            CLEAR
          </button>
          <h3>Response from database:</h3>
          {response ? JSON.stringify(response) : ""}
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadAnImage}>Upload</button>
        </div>
      </div>
    </main>
  );
}
