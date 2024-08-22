import React, { useState } from 'react'
import ModalWrap from '../../../components/Modal/ModalWrap'
import ModalInner from '../../../components/Modal/ModalInner'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import useGetUser from '../../../utils/useGetUser'
import StatusTag from '../../../components/Sections/StatusTag'
import formatDateMonthText from '../../../utils/formatDateMonthText'
import ConfirmDelete from '../../../components/Sections/ConfirmDelete'
import ButtonPrimaryIcon from '../../../components/Buttons/ButtonPrimaryIcon'
import axios from 'axios'
import { toast } from 'react-toastify'
import EditTask from '../EditTask'

const ViewTask = ({ isOpen, setIsOpen, taskData, users, isAdmin, isAssignee, mutate }) => {

    const { user, token } = useGetUser()
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [edit, setEdit] = useState(false)
    const [submitting, setSubmitting] = useState(false)


    // console.log(taskData)
    // console.log(confirmDelete)

    const handleDeleteTask = () => {
        if (!taskData?.[0]?.project_id) {
            return
        }
    
        setSubmitting(true)
    
    
    
        try {
    
            axios.delete(`${import.meta.env.VITE_BASEURL}/task/interface/${taskData?.[0]?.project_id}/${taskData?.[0]?.task_id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    console.log('delete task data', res.data);
                    console.log('delete task message', res.data.message);
                    if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
                        toast.error(res.data.message, {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });
                        console.log(res.data.message);
                        setSubmitting(false)
                    } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                        setIsOpen(false)
                        setConfirmDelete(false)
                        mutate()
                        toast.success(res?.data?.message, {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });
    
    
                        setSubmitting(false)
                    }
    
                    setSubmitting(false)
    
                })
                .catch((err) => {
                    console.error(err); 
                    setSubmitting(false)
                })
    
        } catch (error) {
            setSubmitting(false)
            console.error(error)
        }
    }

    return (
        <ModalWrap hideOverflow={edit} id={"viewTaskModal"} modalState={isOpen} handleModal={() => {setIsOpen(false); setEdit(false); setConfirmDelete(false)}} >
            {
                confirmDelete && 
                <ConfirmDelete submit={submitting} setIsOpen={()=>setConfirmDelete(false)} deleteName={"Task"} typeIn={taskData?.[0]?.title} name={taskData?.[0]?.title} sansWrap handleDelete={handleDeleteTask} />
            }
            {
                edit &&
                <EditTask task={taskData?.[0]} users={users} mutate={mutate} setIsOpen={()=>setEdit(false)} />
            }
            {
                (!confirmDelete && !edit) && 
                    taskData.map((task, idx) => {
                        return <ModalInner formTopPad={"pt-4"} key={idx} title={task.title} headerPosition={"text-left capitalize text-brandSec500"}>
                            <div className='border-b-0.5 pb-2 flex gap-2 justify-end'>
                                {
                                    isAdmin
                                    &&
                                    <>
                                        <div className=''>
                                            <ButtonPrimaryIcon text={" "} handleClick={()=>setConfirmDelete(true)} disabled={submitting} icon={<FaTrashAlt />} gap={"gap-0"} bgColor={"bg-brandRed1x"} />
                                        </div>
                                        <div className=''>
                                            <ButtonPrimaryIcon text={" "} handleClick={()=>setEdit(true)} disabled={submitting} icon={<FaEdit />} gap={"gap-0"} bgColor={"bg-brandBlue1x/20"} textColor={"text-brandSec500"} />
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