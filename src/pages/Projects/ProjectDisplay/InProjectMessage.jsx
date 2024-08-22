import { useFormik } from "formik";
import React from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import HeaderAndText from "../../../components/Sections/HeaderAndText";
import * as Yup from "yup";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useGetUser from "../../../utils/useGetUser";
import UserImg from "../../../components/Sections/UserImg";
import { useLayoutEffect } from "react";
import timeSinceAlt from "../../../utils/timeSinceAlt";

const InProjectMessage = ({
  setTranslate,
  setHeader,
  mutate,
  projectId,
  messages,
  loading,
}) => {
    const {user, token} = useGetUser()
  const [submitting, setSubmitting] = useState(false);
  const [height, setHeight] = useState(0)

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
        .post(`${import.meta.env.VITE_BASEURL}/message/group`, body, { headers: { Authorization: `Bearer ${token}` }})
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
              formik.resetForm()
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
          console.error(err); setSubmitting(false)
          setSubmitting(false);
        });
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  const sortedMessages = messages?.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateA - dateB;
  })


  useLayoutEffect(()=>{
      // console.log(window.screen.availHeight)
        //   60 is menu height
        // 64 is Header Img height
      const tempHeight = window.screen.availHeight - (60 + 64 + 72)
      setHeight(tempHeight)
  })



  return (
    <div style={{height:`${height}px`}} className="flex flex-col gap-4 justify-between transition-all duration-300 ease-in-out min-w-full w-full col-span-1 bg-brandSec500 lg:sticky top-0 right-0 pt-8 pb-4 px-2">
      <div className=" h-full overflow-y-auto px-2 pb-8 relative">
        <div className="flex flex-row gap-4 items-start bg-brandSec500 sticky top-0 left-0 py-2 z-20">
          <button
            onClick={() => {setTranslate(false), setHeader(true)}}
            title="Back to project"
            aria-label="Back to project"
            type="button"
            className={`lg:hidden text-white pt-1 hover:translate-x-2 transition-all duration-300 ease-in-out`}
          >
            <span className="sr-only">Back to project</span>
            <FaChevronLeft className="text-xl" />
          </button>
          <HeaderAndText
            textColor="text-white"
            header={"Messages"}
            subHeader={" "}
            hasNoButton
          />
        </div>
        {loading ? (
          <div>Loading</div>
        ) : messages?.length == 0 ? (
          <div
            className={`min-h-full py-28 justify-center bg-white flex flex-col gap-2 items-center text-brandSec500 rounded-ten w-full`}
          >
            <FaPlus className="text-brandBlue1x text-2xl" />
            <p className={`text-xs`}>No messages yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-4 h-fit">
                {
                    sortedMessages?.map((message, idx) => {
                        const isUser = message?.user_id == user?.user_id
                        return <div key={idx} className={`w-fit max-w-eightyPercent text-sm flex flex-col gap-2 ${isUser ? "self-end" : ""}`}>
                            <div className={`flex gap-2 items-center ${isUser ? "self-end flex-row-reverse" : "flex-row"}`}>
                                <UserImg src={message.user.profile_photo} alt={`${message.user.first_name} ${message.user.last_name}`} width={"w-6"} />
                                <p className={`capitalize text-xxs text-white`}>{message.user.first_name} {message.user.last_name}</p>
                            </div>  
                            <div className={`rounded-ten ${isUser ? "bg-brandBlue1x text-white rounded-tr-0" : "bg-white text-brandBlue1x rounded-tl-0"} px-3 py-2`}>
                                <p>{message?.message}</p>
                            </div>
                            <p className={`${isUser ? "text-right" : "text-left"} text-xxs text-brandGray11x`}>{`${timeSinceAlt(message.created_at)}`}</p>
                        </div>
                    })
                }
          </div>
        )}
      </div>
      <form
        className={`flex gap-2 py-1 px-2 w-full bg-white rounded-full mb-0 justify-self-end`}
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
  );
};

export default InProjectMessage;
