import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "./Loading";

const LikeModal = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;
  const [value, setValue] = useState([]);

  const [loading, setLoading] = true;

  async function fetchLikes() {
    try {
      const { data } = await axios.get("/api/post/" + id);

      setValue(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLikes();
  }, [id]);
  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-4 shadow-lg w-64">
            <div className="flex justify-end">
              <button onClick={onClose} className="text-gray-500 text-2xl">
                &times;
              </button>
            </div>
            <div className="flex flex-col space-y-2 mt-2">
              {value && value.length > 0 ? (
                value.map((e, i) => (
                  <Link
                    className="bg-gray-500 py-2 px-3 text-white text-center rounded-md flex justify-center items-center gap-4"
                    to={`/user/${e._id}`}
                    key={i}
                    onClick={() => setShow(false)}
                  >
                    {i + 1}{" "}
                    <img
                      className="w-8 h-8 rounded-full"
                      src={e.profilePic.url}
                      alt=""
                    />
                    {e.name}
                  </Link>
                ))
              ) : (
                <p>No Likes yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LikeModal;
