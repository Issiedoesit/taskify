import React, { useState } from 'react'
import EmptyTable from '../../../components/Sections/EmptyTable'
import ButtonPrimaryIcon from '../../../components/Buttons/ButtonPrimaryIcon'
import useGetUser from '../../../utils/useGetUser'
import StatusTag from '../../../components/Sections/StatusTag'
import { FaChevronRight } from 'react-icons/fa'

const ProjectTask = ({ tasks, users, setIsOpen, setIsViewTaskOpen, isAdmin }) => {

  const { user } = useGetUser()
  

  return (
    <div>
      {
        tasks?.length !== 0
          ?
          <div>
            {
              tasks?.map((task, idx) => {
                return <div key={idx} className={`flex gap-4 border-b-0.5 py-4`}>
                  <input id={task.task_id} type='checkbox' className='accent-brandGreen4x text-white' />
                  <div className={`flex flex-row gap-8 justify-between w-full`}>
                    <div className={`flex flex-col gap-1`}>
                      <button type='button' onClick={()=>setIsViewTaskOpen(task)} className={`capitalize font-avenirMedium flex flex-row gap-1 items-center`}>
                        {task.title}
                        <FaChevronRight className='font-avenirLight text-sm' />
                      </button>
                      <StatusTag hideDrop status={task.status} finalStatus={task.final_status} cannotClick={(task.user_id !== user.user_id) && !isAdmin} />
                    </div>

                    <div className='text-xs flex flex-col gap-1 items-start h-fit self-end text-brandGray4x'>
                      {/* <p className={``}>Assigned to:</p> */}
                      <div className='flex flex-row gap-1 items-center text-brandSec500'>

                        {
                          task.user_id == user.user_id
                            ?
                            "You"
                            :
                            <p className={`capitalize`}>{task.assigned_by_user.user.first_name} {task.assigned_by_user.user.last_name.split("")[0]}. </p>
                        }
                        {/* {console.log(users.filter(u => u.user.user_id == task.user_id))} */}
                        <img src={users.filter(u => u.user.user_id == task.user_id)?.[0].user.profile_photo} className={`skeleton--white rounded-full w-6 aspect-square`} />

                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
          :
          <div className={`flex flex-col items-center`}>
            <EmptyTable paddingY={"py-14"} message={"No Tasks Yet"} />
            <ButtonPrimaryIcon handleClick={() => setIsOpen(true)} bgColor={"bg-brandSec500"} text={"New Task"} />
          </div>
      }
    </div>
  )
}

export default ProjectTask