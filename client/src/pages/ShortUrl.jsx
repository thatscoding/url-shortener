import React, { useState, useEffect } from "react";
import { userProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { RegisterUrl } from "../services/urlApi";
import CopyToClipboard from "copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";

function ShortUrl() {
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const res = await userProfile();
      if (res) {
        setLoading(false);
      }
      if (!res) {
        navigate("/login");
      }
    };
    auth();
  });

  const copyUrl = () => {
    CopyToClipboard(redirectUrl);
    alert(`You have copied "${redirectUrl}"`);
  };

  const submitForm = async (formdata) => {
    console.log(formdata);
    const { data } = await RegisterUrl(formdata);
    setRedirectUrl(data?.url);
    console.log(data);
  };

  return (
    <div>
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Generate Short Url
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify.
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <form
                  onSubmit={handleSubmit(submitForm)}
                  className="p-2 w-full"
                >
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter Your Url
                    </label>
                    <input
                      type="text"
                      id="url"
                      {...register("url")}
                      required
                      name="url"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  {redirectUrl ? (
                    <div className="relative mt-4">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Copy your short Url
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="shortUrl"
                          value={redirectUrl}
                          name="shortUrl"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <span
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={copyUrl}
                        >
                          <AiOutlineCopy size={25} />
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="p-2 w-full mt-6">
                    <button
                      disabled={redirectUrl ? true : false}
                      className={
                        redirectUrl
                          ? `bg-gray-300 flex mx-auto text-white  border-0 py-2 px-8 focus:outline-none rounded text-lg1`
                          : "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      }
                    >
                      Generate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ShortUrl;
