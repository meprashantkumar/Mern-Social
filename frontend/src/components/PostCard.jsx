import React, { useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SimpleModal from "./SimpleModal";
import { LoadingAnimation } from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import LikeModal from "./LikeModal";
import { SocketData } from "../context/SocketContext";

const PostCard = ({ type, value }) => {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = UserData();
  const { likePost, addComment, deletePost, loading, fetchPosts } = PostData();

  const formatDate = format(new Date(value.createdAt), "MMMM do");

  useEffect(() => {
    for (let i = 0; i < value.likes.length; i++) {
      if (value.likes[i] === user._id) setIsLike(true);
    }
  }, [value, user._id]);

  const likeHandler = () => {
    setIsLike(!isLike);

    likePost(value._id);
  };

  const [comment, setComment] = useState("");

  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(value._id, comment, setComment, setShow);
  };

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {
    deletePost(value._id);
  };

  const [showInput, setShowInput] = useState(false);
  const editHandler = () => {
    setShowModal(false);
    setShowInput(true);
  };

  const [caption, setCaption] = useState(value.caption ? value.caption : "");
  const [captionLoading, setCaptionLoading] = useState(false);

  async function updateCaption() {
    setCaptionLoading(true);
    try {
      const { data } = await axios.put("/api/post/" + value._id, { caption });

      toast.success(data.message);
      fetchPosts();
      setShowInput(false);
      setCaptionLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setCaptionLoading(false);
    }
  }

  const [open, setOpen] = useState(false);

  const oncloseLIke = () => {
    setOpen(false);
  };

  const { onlineUsers } = SocketData();

  return (
    <div className="bg-gray-100 flex items-center justify-center pt-3 pb-14">
      <SimpleModal isOpen={showModal} onClose={closeModal}>
        <LikeModal isOpen={open} onClose={oncloseLIke} id={value._id} />
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={editHandler}
            className="bg-blue-400 text-white py-1 px-3 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            className="bg-red-400 text-white py-1 px-3 rounded-md"
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : "Delete"}
          </button>
        </div>
      </SimpleModal>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="flex items-center space-x-2">
          <Link
            className="flex items-center space-x-2"
            to={`/user/${value.owner._id}`}
          >
            <img
              src={value.owner.profilePic.url}
              alt=""
              className="w-8 h-8 rounded-full"
            />

            {onlineUsers.includes(value.owner._id) && (
              <div className="text-5xl font-bold text-green-400">.</div>
            )}

            <div>
              <p className="text-gray-800 font-semibold">{value.owner.name}</p>
              <div className="text-gray-500 text-sm">{formatDate}</div>
            </div>
          </Link>

          {value.owner._id === user._id && (
            <div className="text-gray-500 cursor-pointer">
              <button
                onClick={() => setShowModal(true)}
                className="hover:bg-gray-50 rounded-full p-1 text-2xl"
              >
                <BsThreeDotsVertical />
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          {showInput ? (
            <>
              <input
                className="custom-input"
                style={{ width: "150px" }}
                type="text"
                placeholder="Enter Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
              <button
                onClick={updateCaption}
                className="text-sm bg-blue-500 text-white px-1 py-1 rounded-md"
                disabled={captionLoading}
              >
                {captionLoading ? <LoadingAnimation /> : "Update Caption"}
              </button>
              <button
                className="text-sm bg-red-500 text-white px-1 py-1 rounded-md"
                onClick={() => setShowInput(false)}
              >
                X
              </button>
            </>
          ) : (
            <p className="text-gray-800">{value.caption}</p>
          )}
        </div>

        <div className="mb-4">
          {type === "post" ? (
            <img
              src={value.post.url}
              alt=""
              className="object-cover rounded-md"
            />
          ) : (
            <video
              src={value.post.url}
              alt=""
              className="w-[450px] h-[600px] object-cover rounded-md"
              autoPlay
              controls
            />
          )}
        </div>
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <span
              onClick={likeHandler}
              className="text-red-500 text-2xl cursor-pointer"
            >
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </span>
            <button
              className="hover:bg-gray-50 rounded-full p-1"
              onClick={() => setOpen(true)}
            >
              {value.likes.length} likes
            </button>
          </div>
          <button
            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
            onClick={() => setShow(!show)}
          >
            <BsChatFill />
            <span>{value.comments.length} comments</span>
          </button>
        </div>
        {show && (
          <form onSubmit={addCommentHandler} className="flex gap-3">
            <input
              type="text"
              className="custom-input"
              placeholder="Enter Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="bg-gray-100 rounded-lg px-5 py-2" type="submit">
              Add
            </button>
          </form>
        )}

        <hr className="mt-2 mb-2" />
        <p className="text-gray-800 font-semibold">Comments</p>
        <hr className="mt-2 mb-2" />
        <div className="mt-4">
          <div className="comments max-h-[200px] overflow-y-auto">
            {value.comments && value.comments.length > 0 ? (
              value.comments.map((e) => (
                <Comment
                  value={e}
                  key={e._id}
                  user={user}
                  owner={value.owner._id}
                  id={value._id}
                />
              ))
            ) : (
              <p>No Comments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

export const Comment = ({ value, user, owner, id }) => {
  const { deleteComment } = PostData();

  const deleteCommentHandler = () => {
    deleteComment(id, value._id);
  };
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Link to={`/user/${value.user._id}`}>
        <img
          src={value.user.profilePic.url}
          className="w-8 h-8 rounded-full"
          alt=""
        />
      </Link>
      <div>
        <p className="text-gray-800 font-semibold">{value.user.name}</p>
        <p className="text-gray-500 text-sm">{value.comment}</p>
      </div>

      {owner === user._id ? (
        ""
      ) : (
        <>
          {value.user._id === user._id && (
            <button onClick={deleteCommentHandler} className="text-red-500">
              <MdDelete />
            </button>
          )}
        </>
      )}

      {owner === user._id && (
        <button onClick={deleteCommentHandler} className="text-red-500">
          <MdDelete />
        </button>
      )}
    </div>
  );
};
