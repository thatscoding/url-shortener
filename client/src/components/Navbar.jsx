import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("user") || null;
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const logout = async () => {
    await logoutUser();
    localStorage.setItem("user", "");
    await window.location.reload(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  console.log(user);

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container max-w-7xl mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Myurl</span>
            </a>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link to="/">
              <a className="mr-5 hover:text-gray-900">Home</a>
            </Link>

            {user ? (
              <>
                <Link to="/shorturl">
                  <a className="mr-5 hover:text-gray-900">Generate URL</a>
                </Link>

                <Link to="/analytics">
                  <a className="mr-5 hover:text-gray-900">Dashboard</a>
                </Link>
              </>
            ) : null}
          </nav>
          {user ? (
            <div className="flex gap-4 flex-wrap items-center">
              <h1 className="text-xl">{user.username}</h1>
              <button
                onClick={() => logout()}
                className="border border-red-500 text-red-600 inline-flex items-center bg-gray-100  py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 flex-wrap">
              <Link to="/login">
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
