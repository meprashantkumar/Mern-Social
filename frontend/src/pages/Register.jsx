import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();

  const { fetchPosts } = PostData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };
  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[40px]">
            <div className="w-full md:w-3/4">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
                  Register to social media
                </h1>
              </div>

              <form onSubmit={submitHandler}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  {filePrev && (
                    <img
                      src={filePrev}
                      className="w-[180px] h-[180px] rounded-full"
                      alt=""
                    />
                  )}
                  <input
                    type="file"
                    className="custom-input"
                    onChange={changeFileHandler}
                    accept="image/*"
                    required
                  />
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="custom-input"
                    placeholder="User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="User Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <select
                    className="custom-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="text-center mt-7">
                  <button className="auth-btn">Register</button>
                </div>
              </form>
            </div>

            <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-yellow-400 items-center justify-center flex">
              <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                <h1 className="text-5xl">Have Account?</h1>
                <h1>Login to Social Media</h1>
                <Link
                  to="/login"
                  className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
