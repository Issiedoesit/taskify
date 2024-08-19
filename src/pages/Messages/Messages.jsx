import React, { useState } from "react";
import MessageDashTemplate from "../../components/Wraps/MessageDashTemplate";
import UserImgHeader from "../../components/Sections/UserImgHeader";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import useGetUser from "../../utils/useGetUser";
import useSWR from "swr";
import { FaChevronLeft, FaPlus, FaSearch } from "react-icons/fa";
import UserImg from "../../components/Sections/UserImg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiSendPlaneFill } from "react-icons/ri";

const Messages = () => {
  const [translate, setTranslate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMessage, setCurrentMessage] = useState([]);
  const [header, setHeader] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { user, token } = useGetUser();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: {
      messages: Yup.string().required("Message required"),
    },
  });

  const handleMessage = (e) => {
    e.preventDefault();
    if (!projectId || formik.errors.message) {
      // console.log(formik.errors)
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        project_id: projectId,
        message: formik.values.message,
      };

      //   console.log("body => ", body)

      axios
        .post(`${import.meta.env.VITE_BASEURL}/message/group`, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("Send Message => ", res)
          //   console.log("Send Message data => ", res?.data);
          if (
            res?.data?.status !== "success" &&
            res?.data?.responseCode !== "00" &&
            res?.data?.message
          ) {
            toast.error(res?.data?.message, {
              autoClose: 2500,
            });
            setSubmitting(false);
          } else if (
            res?.data?.status == "success" &&
            res?.data?.responseCode == "00" &&
            res?.data?.message
          ) {
            formik.resetForm();
            mutate();

            //   toast.success(res?.data?.message, {
            //     autoClose:2500
            //   })
            setSubmitting(false);
          } else {
            // console.log(res);
            toast.error("Error sending message, Try again later", {
              autoClose: 2500,
            });
            setSubmitting(false);
          }
          setSubmitting(false);
        })
        .catch((err) => {
          console.error(err);
          setSubmitting(false);
        });
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  const fetcher = async (url) =>
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } });

  const {
    data: messages,
    error: messagesError,
    isLoading: messagesIsLoading,
    mutate: mutateMessages,
  } = useSWR(import.meta.env.VITE_BASEURL + `/message/group`, fetcher, {
    refreshInterval: 200,
  });

  !messagesIsLoading && messages?.data && console.log(messages.data);

  const messagesData = messages?.data?.data || [];

  const sortedMessages = currentMessage?.[0]?.project_message?.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateA - dateB;
  });

  const openMessage = (data) => {
    // console.log("Data passed:", data);
    const body = document.querySelector("body");
    // body.style.overflow = 'hidden';
    // body.style.height = '100vh';
    setHeader(false);
    setCurrentMessage([data]);
    setTranslate(true);
    // console.log(currentMessage)
  };

  const closeMessage = () => {
    setHeader(true);
    setTranslate(false);
    // const body = document.querySelector("body");
    // body.style.overflow = "";
    // body.style.height = "";
  };

  return (
    <>
      <MessageDashTemplate messageView={"overflow-hidden flex flex-col pb-4"}>
        <div
          className={`${
            header
              ? "px-8 md:px-10 pt-8 pb-4"
              : "hidden lg:block lg:px-10 lg:pt-8 lg:pb-4"
          }`}
        >
          <UserImgHeader subHeader={"Chat in projects!"} />
        </div>
        <div
          className={`flex ${
            translate ? "h-screen lg:h-full" : ""
          } bg-white flex flex-row h-full ${
            translate ? "pb-44 lg:pb-10" : "pb-10"
          } pb-10 w-full lg:w-full transition-transform duration-300 ease-in-out ${
            translate ? "-translate-x-hundredPercent lg:translate-x-0" : ""
          }`}
        >
          <div
            className={`lg:col-span-2 w-full min-w-full lg:min-w-thirtyPercent lg:w-thirtyPercent px-4 border-r-0.5 border-r-brandGray4x/20 overflow-y-auto`}
          >
            <div className="py-8">
              <label
                htmlFor="searchMsgs"
                className="sticky top-0 left-0 z-20 bg-white border-0.5 border-brandGray4x/20 rounded-ten px-4 flex flex-row items-center gap-2"
              >
                <input
                  type="search"
                  name="searchMsgs"
                  id="searchMsgs"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Messages"
                  className={`w-full px-4 py-2 bg-white rounded-ten`}
                />
                <FaSearch
                  className={`${!searchTerm ? "text-brandGray11x" : ""} ${
                    searchTerm && filteredData.length !== 0
                      ? "text-brandGreen4x"
                      : "text-brandRed1x"
                  }`}
                />
              </label>

              <div className={`flex flex-col py-6 h-fit`}>
                {messagesData?.map((message, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => openMessage(message)}
                      className={`flex flex-row gap-4 cursor-pointer w-full py-4 px-2 rounded-ten hover:bg-brandBlue1x/10`}
                    >
                      <UserImg
                        src={message.project_photo}
                        width={"w-12 h-12"}
                        minWidth={"min-w-12"}
                      />

                      <div className="flex flex-col gap-1">
                        <p
                          className={`text-sm font-avenirHeavy text-brandSec500`}
                        >
                          {message.name.charAt(0).toUpperCase() +
                            message.name.slice(1)}
                        </p>
                        <p className="text-brandGray4x font-avenirLight text-xs two-lined-text">
                          {message?.project_message?.[0]?.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {messagesData?.map((message, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => openMessage(message)}
                      className={`flex flex-row gap-4 cursor-pointer w-full py-4 px-2 rounded-ten hover:bg-brandBlue1x/10`}
                    >
                      <UserImg
                        src={message.project_photo}
                        width={"w-12 h-12"}
                        minWidth={"min-w-12"}
                      />

                      <div className="flex flex-col gap-1">
                        <p
                          className={`text-sm font-avenirHeavy text-brandSec500`}
                        >
                          {message.name.charAt(0).toUpperCase() +
                            message.name.slice(1)}
                        </p>
                        <p className="text-brandGray4x font-avenirLight text-xs two-lined-text">
                          {message?.project_message?.[0]?.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-4 w-full min-w-full lg:min-w-max px-4 border-r-0.5 border-r-brandGray4x/20 min-h-full">
            <div className={`overflow-y-auto h-full`}>
              <div className="z-20 sticky top-0 left-0 w-full min-w-full">
                {currentMessage?.map((message, idx) => {
                  return (
                    <div key={idx}>
                      <div className="w-full min-w-full flex flex-row gap-4 bg-white py-4 px-4 border-b-0.5 border-b-brandGray4x/20">
                        <button
                          onClick={() => {
                            closeMessage();
                          }}
                          title="Back to message list"
                          aria-label="Back to message list"
                          type="button"
                          className={`lg:hidden text-brandSec500 pt-1 hover:translate-x-2 transition-all duration-300 ease-in-out`}
                        >
                          <span className="sr-only">Back to message list</span>
                          <FaChevronLeft className="text-xl" />
                        </button>
                        <div className="flex flex-row gap-4 items-center">
                          <UserImg
                            src={message.project_photo}
                            alt={message.name}
                          />
                          <p className="text-lg font-avenirMedium">
                            {message.name.charAt(0).toUpperCase() +
                              message.name.slice(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {sortedMessages?.length == 0 ? (
                <div
                  className={`min-h-full py-28 justify-center bg-white flex flex-col gap-2 items-center text-brandSec500 rounded-ten w-full`}
                >
                  <FaPlus className="text-brandBlue1x text-2xl" />
                  <p className={`text-xs`}>No messages yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 min-h-full py-4 px-4 w-full min-w-full">
                  {sortedMessages?.map((message, idx) => {
                    const isUser = message?.user_id == user?.user_id;
                    // console.log("message", message)
                    return (
                      <div
                        key={idx}
                        className={`text-sm flex flex-col gap-2 ${
                          isUser ? "self-end" : ""
                        }`}
                      >
                        <div
                          className={`flex gap-2 items-center ${
                            isUser ? "self-end flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <UserImg
                            src={message.user.profile_photo}
                            alt={`${message.user.first_name} ${message.user.last_name}`}
                            width={"w-6"}
                          />
                          <p className={`capitalize text-xxs text-white`}>
                            {message.user.first_name} {message.user.last_name}
                          </p>
                        </div>
                        <div
                          className={`rounded-ten w-fit max-w-md ${
                            isUser
                              ? "bg-brandBlue1x text-white rounded-tr-none self-end"
                              : "bg-brandGray4x/20 text-brandBlue1x rounded-tl-none"
                          } px-3 py-2`}
                        >
                          <p>{message?.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <form
              className={`flex gap-2 py-1 px-2 w-full bg-white border-0.5 border-brandGray4x rounded-full mb-0 justify-self-end`}
            >
              <label htmlFor="message" className="w-full">
                <input
                  name="message"
                  id="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-1 px-2 rounded-l-full placeholder:text-sm`}
                  placeholder={"Send a message ..."}
                />
              </label>
              <button
                onClick={handleMessage}
                disabled={submitting}
                title="Send message"
                aria-label="Send message"
                className={`p-1 rounded-r-full flex items-center justify-center`}
              >
                <RiSendPlaneFill
                  className={`${
                    formik.values.message
                      ? "text-brandBlue1x hover:bg-brandBlue1x/20"
                      : "text-brandGray11x"
                  }
              text-2xl transition-all duration-300 ease-in-out`}
                />
              </button>
            </form>
          </div>
        </div>
      </MessageDashTemplate>
      <ToastContainer />
    </>
  );
};

export default Messages;
