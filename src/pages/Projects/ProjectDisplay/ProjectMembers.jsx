import React, { useState } from 'react'
import useGetUser from '../../../utils/useGetUser'
import UserImg from '../../../components/Sections/UserImg'
import usePagination from '../../../utils/usePagination'
import Paginator from '../../../components/Pagination/Paginator'

const ProjectMembers = ({ users, creator, isAdmin }) => {

    const { user: currentUser } = useGetUser()
    const [rowLength, setRowLength] = useState(8)


    const { currentPage, templates, loading: dataLoading, rows: paginatorRows, totalPages, dottedArray, movePageBy, paginate, displayedData } = usePagination(tasks, rowLength, "projectMembersWrap")

    return (
        <div id={"projectMembersWrap"}>
            {
                users?.length !== 0
                    ?
                    <div className={`py-4 grid grid-cols-1 gap-4`}>
                        {
                            users?.map((user, idx) => {
                                return <div className={`flex flex-row gap-2 items-center py-4 border-b-0.5`}>
                                    <UserImg width={"w-10"} src={user.user.profile_photo} alt={`${user.user.first_name} ${user.user.last_name} `} />
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
                        <div className='pt-4 text-sm'>
                            {tasks && tasks.length > rowLength && <Paginator btnSize={"px-3 py-1"} arrowBtnSize={"px-3 py-1"} justifySection={"justify-center"} currentPage={currentPage} totalPages={totalPages} dottedArray={dottedArray} movePageBy={movePageBy} paginate={paginate} />}
                        </div>
                    </div>
                    :
                    <div className={`flex flex-col items-center`}>
                        <EmptyTable paddingY={"py-14"} message={"No Users Yet"} />
                        {isAdmin && <ButtonPrimaryIcon handleClick={() => setIsOpen(true)} bgColor={"bg-brandSec500"} text={"Add Users"} />}
                    </div>
            }
        </div>
    )
}

export default ProjectMembers