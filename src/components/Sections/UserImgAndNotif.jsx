import React from 'react'
import NotificationButton from '../Buttons/NotificationButton'

const UserImgAndNotif = ({ user }) => {
    return (
        <div className={`flex flex-row items-center gap-3`}>
            <NotificationButton />
            <img src={user?.profile_photo} className={`skeleton--white rounded-full w-12 aspect-square`} />
        </div>
    )
}

export default UserImgAndNotif