import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);

      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center flex-col pt-5">
        <div className="search flex justify-between items-center gap-4">
          <input
            type="text"
            className="custom-input"
            style={{ border: "gray solid 1px" }}
            placeholder="Enter Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {users && users.length > 0 ? (
              users.map((e) => (
                <Link
                  key={e._id}
                  className="mt-3 px-3 py-2 bg-gray-300 rounded-md flex justify-center items-center gap-3"
                  to={`/user/${e._id}`}
                >
                  <img
                    src={e.profilePic.url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />{" "}
                  {e.name}
                </Link>
              ))
            ) : (
              <p>No User please Search</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
