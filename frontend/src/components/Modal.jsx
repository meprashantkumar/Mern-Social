import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ value, title, setShow }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[300px] max-h-[300px] overflow-y-auto">
        <h1 className="text-2xl text-blue-600">{title}</h1>
        <div className="flex justify-end">
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 text-2xl"
          >
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
            <p>No {title} yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
