import React, { useState } from "react";
import DashTemplate from "../../components/Wraps/DashTemplate";
import UserImgHeader from "../../components/Sections/UserImgHeader";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import useGetUser from "../../utils/useGetUser";
import useSWR from "swr";
import { FaSearch } from "react-icons/fa";
import UserImg from "../../components/Sections/UserImg";

const Messages = () => {
  const [translate, setTranslate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, token } = useGetUser();

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

  return (
    <>
      <DashTemplate
        messageView={"overflow-y-hidden min-h-full h-full"}
      >
        <div className="px-8 md:px-10 pt-8 pb-4">
          <UserImgHeader subHeader={"Chat in projects!"} />
        </div>
        <div className="relative lg:static w-full h-full overflow-hidden lg:overflow-visible bg-white border-t-0.5 border-t-brandGray4x/20">
          <div
            className={`flex ${
              translate ? "h-screen lg:h-full" : ""
            } lg:grid lg:grid-cols-6 lg:gap-10 h-full w-full lg:w-full transition-transform duration-300 ease-in-out ${
              translate ? "-translate-x-hundredPercent lg:translate-x-0" : ""
            }`}
          >
            <div className={`lg:col-span-2 w-full px-4 border-r-0.5 border-r-brandGray4x/20`}>
              <div className='py-8'>
                    <label htmlFor='searchMsgs' className='sticky top-0 left-0 z-20 bg-white rounded-ten px-4 flex flex-row items-center gap-2'>
                        <input
                            type="search"
                            name="searchMsgs"
                            id="searchMsgs"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Search Messages'
                            className={`w-full px-4 py-2 bg-white rounded-ten`}
                        />
                        <FaSearch className={`${!searchTerm ? "text-brandGray11x" : ""} ${(searchTerm && filteredData.length !== 0) ? "text-brandGreen4x" : "text-brandRed1x"}`} />
                    </label>

                  <div className={`flex flex-col py-6 h-full overflow-y-auto`}>
                      {
                        messagesData?.map((message, idx) => {
                          return <div key={idx} className={`flex flex-row gap-4 cursor-pointer w-full py-4 px-2 rounded-ten hover:bg-brandBlue1x/10`}>
                            <UserImg src={message.project_photo} width={"w-8 h-8"} minWidth={'min-w-8'} />

                            <div className="flex flex-col gap-4">
                              <p className={`text-sm font-avenirHeavy text-brandSec500`}>{message.name.charAt(0).toUpperCase() + message.name.slice(1)}</p>
                              <p className="text-brandGray4x">{message?.project_message?.[0]?.message}</p>
                            </div>
                          </div>
                        })
                      }
                  </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </DashTemplate>
      <ToastContainer />
    </>
  );
};

export default Messages;
