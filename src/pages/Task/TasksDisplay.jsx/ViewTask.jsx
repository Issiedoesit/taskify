import React, { useState } from 'react'
import ModalWrap from '../../../components/Modal/ModalWrap'
import ModalInner from '../../../components/Modal/ModalInner'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import useGetUser from '../../../utils/useGetUser'
import StatusTag from '../../../components/Sections/StatusTag'
import formatDateMonthText from '../../../utils/formatDateMonthText'

const ViewTask = ({ isOpen, setIsOpen, taskData, users, isAdmin, isAssignee, mutate }) => {

    const { user } = useGetUser()
    const [confirmDelete, setConfirmDelete] = useState(false)


    // console.log(taskData)

    const deleteTask = () => {

    }

    return (
        <ModalWrap id={"viewTaskModal"} modalState={isOpen} handleModal={() => setIsOpen(false)} >
            {
                taskData.map((task, idx) => {
                    return <ModalInner formTopPad={"pt-4"} key={idx} title={task.title} headerPosition={"text-left capitalize text-brandSec500"}>
                        <div className='border-b-0.5 pb-2 flex gap-4 justify-end'>
                            {
                                isAdmin
                                &&
                                <>
                                    <div className=''>
                                        <FaTrashAlt className='text-brandRed1x' />
                                    </div>
                                    <div className=''>
                                        <FaEdit className='text-brandSec500' />
                                    </div>
                                </>
                            }
                        </div>
                        <div className='flex flex-col gap-6 text-sm'>
                            <div className={`flex flex-row gap-10`}>
                                <p className='text-brandGray4x/50 min-w-24'>Assignee</p>
                                <div className='flex flex-row-reverse gap-1 items-center text-brandSec500'>

                                    {
                                        task.user_id == user.user_id
                                            ?
                                            "You"
                                            :
                                            <p className={`capitalize`}>{task.assigned_by_user.user.first_name} {task.assigned_by_user.user.last_name.split("")[0]}. </p>
                                    }
                                    {/* {console.log(users.filter(u => u.user.user_id == task.user_id))} */}
                                    <img src={users?.filter(u => u.user.user_id == task.user_id)?.[0].user.profile_photo} className={`skeleton--white rounded-full w-6 aspect-square`} />

                                </div>
                            </div>
                            <div className={`flex flex-row gap-10 ${(!isAssignee && !isAdmin) ? "pointer-events-none" : ""}`}>
                                <p className='text-brandGray4x/50 min-w-24'>Status</p>
                                <StatusTag mutate={mutate} closeView={() => setIsOpen(false)} projectId={task.project_id} taskId={task.task_id} status={task.status} />
                            </div>
                            <div className={`flex flex-row gap-10 ${(isAdmin && task.status == "completed") ? "" : "pointer-events-none"}`}>
                                <p className='text-brandGray4x/50 min-w-24'>Review</p>
                                <div className={`flex flex-row gap-2 items-center`}>
                                    <StatusTag mutate={mutate} closeView={() => setIsOpen(false)} projectId={task.project_id} taskId={task.task_id} isFinalStatus status={task.final_status} regStatusState={task.status} />
                                    {
                                        (isAdmin && (task.status !== "completed"))
                                        &&
                                        <p className='text-xxs text-brandGray4x/50'>*On Status Complete</p>
                                    }
                                </div>
                            </div>
                            <div className={`flex flex-row gap-10`}>
                                <p className='text-brandGray4x/50 min-w-24'>Project</p>
                                <p className='text-brandSec500 capitalize'>
                                    {task.project.name}
                                </p>
                            </div>
                            <div className={`flex flex-row gap-10`}>
                                <p className='text-brandGray4x/50 min-w-24'>Due date</p>
                                <p className='text-brandSec500 capitalize'>
                                    {formatDateMonthText(task.due_date)}
                                </p>
                            </div>
                            <div className={`flex flex-row gap-10`}>
                                <p className='text-brandGray4x/50 min-w-24'>Description</p>
                                <p className='text-brandSec500 first-letter:capitalize'>
                                    {task.description}
                                </p>
                            </div>
                            <div className={`flex flex-row gap-10`}>
                                <p className='text-brandGray4x/50 min-w-24'>Notes</p>
                                <p className='text-brandSec500 first-letter:capitalize'>
                                    {task.notes || "Nil"}
                                </p>
                            </div>
                        </div>
                    </ModalInner>
                })
            }
        </ModalWrap>

    )
}

export default ViewTask