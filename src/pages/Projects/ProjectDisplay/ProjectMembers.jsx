import React from 'react'
import useGetUser from '../../../utils/useGetUser'

const ProjectMembers = ({users, creator, isAdmin}) => {

    const {user:currentUser} = useGetUser()

  return (
    <div>
            {
            users?.length !== 0
            ?
            <div className={`py-4 grid grid-cols-1 gap-4`}>
                {
                    users?.map((user, idx) => {
                        return <div className={`flex flex-row gap-2 items-center py-4 border-b-0.5`}>
                            <img src={user.user.profile_photo} className={`rounded-full w-10 aspect-square`} />
                            <div>
                                <p className={`capitalize font-avenirMedium text-sm text-lexf text-brandSec500`}>{user.user.first_name} {user.user.last_name} 
                                    <span className={"text-xxs text-brandBlue3x"}> {creator.user_id == user.user.user_id && "(Creator)"}</span>
                                    <span className={"text-xxs text-brandOrange2x"}> {currentUser.user_id == user.user.user_id && "(You)"}</span>
                                </p>
                                <p className={`text-lexf capitalize font-avenirLight text-xs ${user.role == "admin" ? "text-brandGreen4x" : "text-brandBlue1x"}`}>{user.role}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            :
            <div className={`flex flex-col items-center`}>
                <EmptyTable paddingY={"py-14"} message={"No Users Yet"} />
               {isAdmin && <ButtonPrimaryIcon handleClick={()=>setIsOpen(true)} bgColor={"bg-brandSec500"} text={"Add Users"} />}
            </div>
        }
    </div>
  )
}

export default ProjectMembers