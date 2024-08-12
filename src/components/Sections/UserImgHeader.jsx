import React from 'react'
import useGetUser from '../../utils/useGetUser'
import NotificationButton from '../Buttons/NotificationButton'
import UserImgAndNotif from './UserImgAndNotif'

const UserImgHeader = ({header, subHeader}) => {

    const {user} = useGetUser()
    // console.log(user)

    
  return (
    <div className={`flex items-center gap-10 justify-between w-full`}>
        <div className={`flex flex-col gap-2`}>
            <h1 className={`font-avenirHeavy text-2xl capitalize`}>{header || `Hi, ${user?.first_name} ${user?.last_name}`}</h1>
            <p>{subHeader || "Let's finish your task today!"}</p>
        </div>
       <div className={`hidden sm:block`}>
        <UserImgAndNotif user={user} />
       </div>
    </div>
  )
}

export default UserImgHeader