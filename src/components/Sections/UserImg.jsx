import React from 'react'
import { HiMiniUserCircle } from "react-icons/hi2";

const UserImg = ({src, width, alt}) => {
  return (
    <>
        {
            src
            ?
            <img src={src} className={`skeleton--white rounded-full ${width ? width : "w-12"} aspect-square object-cover`} alt={alt} />
            :
            <div className={`${width ? width : "w-12"} rounded-full aspect-square flex items-center justify-center bg-brandBlue1x/50`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`fill-white`} d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="#292D32"/>
                    <path className={`fill-white`} d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z" fill="#292D32"/>
                </svg>
            </div>
        }
    </>
  )
}

export default UserImg