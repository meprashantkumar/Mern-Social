import React, { useState } from "react";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { addPost, addLoading } = PostData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("caption", caption);
    formdata.append("file", file);
    addPost(formdata, setFile, setCaption, setFilePrev, type);
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center pt-3 pb-5">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 items-center justify-between mb-4"
        >
          <input
            type="text"
            className="custom-input"
            placeholder="Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="file"
            className="custom-input"
            accept={type === "post" ? "image/*" : "video/*"}
            onChange={changeFileHandler}
            required
          />
          {filePrev && (
            <>
              {type === "post" ? (
                <img src={filePrev} alt="" />
              ) : (
                <video
                  controlsList="nodownload"
                  controls
                  src={filePrev}
                  className="h-[450px] w-[300px]"
                />
              )}
            </>
          )}
          <button
            disabled={addLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {addLoading ? <LoadingAnimation /> : "+ Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
