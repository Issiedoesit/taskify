<div className="relative lg:static w-full bg-white border-t-0.5 border-t-brandGray4x/20">
          <div
            className={`flex ${
              translate ? "h-screen lg:h-full" : ""
            } lg:grid lg:grid-cols-6 h-full pt-10 w-full lg:w-full transition-transform duration-300 ease-in-out ${
              translate ? "-translate-x-hundredPercent lg:translate-x-0" : ""
            }`}
          >
            {/* message list */}
            <div
              className={`lg:col-span-2 w-full min-w-full px-4 border-r-0.5 border-r-brandGray4x/20 overflow-y-auto`}
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

            {/* alt message view */}
            <div className="flex flex-col gap-4 justify-between transition-all duration-300 ease-in-out text-white min-w-full w-full h-full col-span-1 bg-brandSec500 lg:sticky top-0 right-0 pt-8 pb-4 px-2">
              <div className=" h-fit overflow-y-auto px-2 pb-8 relative">
                <div className="flex flex-row gap-4 items-start bg-brandSec500 sticky top-0 left-0 py-2 z-20">
                  <button
                    onClick={() => {
                      setTranslate(false);
                    }}
                    title="Back to project"
                    aria-label="Back to project"
                    type="button"
                    className={`lg:hidden text-white pt-1 hover:translate-x-2 transition-all duration-300 ease-in-out`}
                  >
                    <span className="sr-only">Back to project</span>
                    <FaChevronLeft className="text-xl" />
                  </button>
                </div>

                <div className="text-3xl flex h-fit flex-col">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque mollitia dolorem veritatis libero laboriosam porro,
                    sapiente omnis enim doloribus, fugiat ipsam ut excepturi
                    dignissimos aliquam minus, provident tenetur error facilis?
                  </p>
                </div>
              </div>
            </div>
            {/* message view */}
            {/* <div className="lg:col-span-4 flex flex-col w-full min-w-full relative pb-10">
              <div className=" h-full overflow-y-auto pb-8 relative flex flex-col">
                <div className="z-20 sticky top-0 left-0 w-full min-w-full">
                  {
                    currentMessage?.map((message, idx) =>{
                      return <div key={idx}>
                        <div className="w-full min-w-full flex flex-row gap-4 bg-white py-4 px-4 border-b-0.5 border-b-brandGray4x/20">
                        <button
                          onClick={() => {closeMessage()}}
                          title="Back to message list"
                          aria-label="Back to message list"
                          type="button"
                          className={`lg:hidden text-brandSec500 pt-1 hover:translate-x-2 transition-all duration-300 ease-in-out`}
                        >
                          <span className="sr-only">Back to message list</span>
                          <FaChevronLeft className="text-xl" />
                        </button>
                            <div className="flex flex-row gap-4 items-center">
                              <UserImg src={message.project_photo} alt={message.name} />
                              <p className="text-lg font-avenirMedium">{message.name.charAt(0).toUpperCase() + message.name.slice(1)}</p>
                            </div>
                        </div>
                      </div>
                    })
                  }
                </div>

                {
                  sortedMessages?.length == 0 ? (
                    <div
                      className={`min-h-full py-28 justify-center bg-white flex flex-col gap-2 items-center text-brandSec500 rounded-ten w-full`}
                    >
                      <FaPlus className="text-brandBlue1x text-2xl" />
                      <p className={`text-xs`}>No messages yet</p>
                    </div>
                  )
                    :
                    <div className="flex flex-col gap-4 min-h-full pt-4 pb-96 px-4 w-full min-w-full">
                
                
                    { sortedMessages?.map((message, idx) => {
                            const isUser = message?.user_id == user?.user_id
                            // console.log("message", message)
                            return <div key={idx} className={`w-10/12 text-sm flex flex-col gap-2 ${isUser ? "self-end" : ""}`}>
                                <div className={`flex gap-2 items-center ${isUser ? "self-end flex-row-reverse" : "flex-row"}`}>
                                    <UserImg src={message.user.profile_photo} alt={`${message.user.first_name} ${message.user.last_name}`} width={"w-6"} />
                                    <p className={`capitalize text-xxs text-white`}>{message.user.first_name} {message.user.last_name}</p>
                                </div>  
                                <div className={`rounded-ten w-full max-w-md ${isUser ? "bg-brandBlue1x text-white rounded-tr-none self-end" : "bg-brandGray4x/20 text-brandBlue1x rounded-tl-none"} px-3 py-2`}>
                                    <p>{message?.message}</p>
                                </div>
                            </div>
                        })
                    }
                    { sortedMessages?.map((message, idx) => {
                            const isUser = message?.user_id == user?.user_id
                            // console.log("message", message)
                            return <div key={idx} className={`w-10/12 text-sm flex flex-col gap-2 ${isUser ? "self-end" : ""}`}>
                                <div className={`flex gap-2 items-center ${isUser ? "self-end flex-row-reverse" : "flex-row"}`}>
                                    <UserImg src={message.user.profile_photo} alt={`${message.user.first_name} ${message.user.last_name}`} width={"w-6"} />
                                    <p className={`capitalize text-xxs text-white`}>{message.user.first_name} {message.user.last_name}</p>
                                </div>  
                                <div className={`rounded-ten w-full max-w-md ${isUser ? "bg-brandBlue1x text-white rounded-tr-none self-end" : "bg-brandGray4x/20 text-brandBlue1x rounded-tl-none"} px-3 py-2`}>
                                    <p>{message?.message}</p>
                                </div>
                            </div>
                        })
                    }
              </div>
                    
                }
                </div>
            </div> */}
          </div>
        </div>