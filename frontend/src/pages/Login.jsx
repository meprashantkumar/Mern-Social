import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[140px]">
            <div className="w-full md:w-3/4">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
                  Login to social media
                </h1>
              </div>

              <form onSubmit={submitHandler}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
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
                </div>
                <div className="text-center mt-7">
                  <button className="auth-btn">Login</button>
                </div>
              </form>
            </div>

            <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-yellow-400 items-center justify-center flex">
              <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                <h1 className="text-5xl">Don't Have Account?</h1>
                <h1>Register to Social Media</h1>
                <Link
                  to="/register"
                  className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
