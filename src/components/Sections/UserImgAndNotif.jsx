import React from 'react'
import NotificationButton from '../Buttons/NotificationButton'
import UserImg from './UserImg'

const UserImgAndNotif = ({ user }) => {
    return (
        <div className={`flex flex-row items-center gap-3`}>
            <NotificationButton />
            <UserImg src={user?.profile_photo} alt={`${user?.first_name} ${user?.last_name}`} />
        </div>
    )
}

export default UserImgAndNotif