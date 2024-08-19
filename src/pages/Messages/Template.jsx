import React from 'react'
import {NavLink} from "react-router-dom"
import Nav from '../../components/Navigation/Nav'

const Template = ({children, centerHeader, hideOverflowLarge, stickyNav, settingsStyle, showReturn, returnText, returnLink, headingText, subHeadingText, headingActions}) => {
  return (
    <div className={`${hideOverflowLarge ? "lg:overflow-y-hidden h-screen pb-10" : ""} ${settingsStyle ? "md:overflow-y-hidden md:h-screen flex flex-col" : ""}`}>
      <Nav stickyNav={stickyNav} />
      <div className={`px-4 sm:px-8 md:px-10 lg:px-20 ${hideOverflowLarge ? "pt-4" : "py-12"} ${settingsStyle ? "pt-4 pb-8 md:h-full flex flex-col md:overflow-y-hidden" : ""}`}>
        <div className={`pb-5`}>
          {showReturn && <NavLink to={returnLink} className={`flex flex-row font-avenirBlack text-brandOrange1x text-sm items-center gap-3 hover:gap-2 transition-all duration-300 ease-in-out`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_633_6025)">
                <path d="M0.88029 14.09L4.75029 18C4.84325 18.0938 4.95385 18.1681 5.07571 18.2189C5.19757 18.2697 5.32828 18.2958 5.46029 18.2958C5.5923 18.2958 5.72301 18.2697 5.84487 18.2189C5.96673 18.1681 6.07733 18.0938 6.17029 18C6.26402 17.9071 6.33841 17.7965 6.38918 17.6746C6.43995 17.5527 6.46609 17.422 6.46609 17.29C6.46609 17.158 6.43995 17.0273 6.38918 16.9054C6.33841 16.7836 6.26402 16.673 6.17029 16.58L2.61029 13H23.0003C23.2655 13 23.5199 12.8947 23.7074 12.7071C23.8949 12.5196 24.0003 12.2652 24.0003 12C24.0003 11.7348 23.8949 11.4805 23.7074 11.2929C23.5199 11.1054 23.2655 11 23.0003 11H2.55029L6.17029 7.38002C6.34758 7.19405 6.44648 6.94696 6.44648 6.69002C6.44648 6.43308 6.34758 6.186 6.17029 6.00002C6.07733 5.90629 5.96673 5.8319 5.84487 5.78113C5.72301 5.73036 5.5923 5.70422 5.46029 5.70422C5.32828 5.70422 5.19757 5.73036 5.07571 5.78113C4.95385 5.8319 4.84325 5.90629 4.75029 6.00002L0.88029 9.85002C0.318488 10.4125 0.00292969 11.175 0.00292969 11.97C0.00292969 12.765 0.318488 13.5275 0.88029 14.09Z" fill="#D85230"/>
                </g>
                <defs>
                <clipPath id="clip0_633_6025">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              {returnText || "Return to Applications"}
            </NavLink>
          }
          <div className={`${showReturn && "py-4"} ${centerHeader && !headingActions ? "flex flex-col items-center text-center" : ""} ${headingActions && "flex flex-col lg:flex-row gap-10 lg:items-center w-full justify-between"}`}>
            <div>
              <h1 className={`font-avenirBlack text-2xl`}>{headingText || "Welcome back, Tom!"}</h1>
              <h1 className={`font-avenirLight`}>{subHeadingText || ""}</h1>
            </div>
            <div>
              {headingActions}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Template