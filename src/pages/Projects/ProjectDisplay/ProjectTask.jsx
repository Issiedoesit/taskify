import React, { useState } from 'react'
import EmptyTable from '../../../components/Sections/EmptyTable'
import ButtonPrimaryIcon from '../../../components/Buttons/ButtonPrimaryIcon'
import useGetUser from '../../../utils/useGetUser'
import StatusTag from '../../../components/Sections/StatusTag'
import { FaChevronRight } from 'react-icons/fa'
import UserImg from '../../../components/Sections/UserImg'
import Paginator from '../../../components/Pagination/Paginator'
import usePagination from '../../../utils/usePagination'

const ProjectTask = ({ tasks, users, setIsOpen, setIsViewTaskOpen, isAdmin }) => {

  const { user } = useGetUser()
  const [rowLength, setRowLength] = useState(8)


  const { currentPage, templates, loading: dataLoading, rows: paginatorRows, totalPages, dottedArray, movePageBy, paginate, displayedData } = usePagination(tasks, rowLength, "projectTaskWrap")


  return (
    <div id={"projectTaskWrap"}>
      {
        tasks?.length !== 0
          ?
          <div>
            {
              displayedData?.map((task, idx) => {
                return <div key={idx} className={`flex gap-4 border-b-0.5 py-4`}>
                  <input id={task.task_id} type='checkbox' className='accent-brandGreen4x text-white' />
                  <div className={`flex flex-row gap-8 justify-between w-full`}>
                    <div className={`flex flex-col gap-1`}>
                      <button type='button' onClick={() => setIsViewTaskOpen(task)} className={`capitalize group hover:text-brandBlue1x transition-all duration-300 ease-in-out font-avenirMedium flex flex-row gap-1 items-center`}>
                        {task.title}
                        <FaChevronRight className='font-avenirLight text-sm group-hover:text-brandBlue1x transition-all duration-300 ease-in-out group-hover:translate-x-1' />
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
                        <UserImg src={users.filter(u => u.user.user_id == task.user_id)?.[0].user.profile_photo} width={"w-6"} />
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
            <div className='pt-8 text-sm'>
              {tasks && tasks.length > rowLength && <Paginator btnSize={"px-3 py-1"} arrowBtnSize={"px-3 py-1"} justifySection={"justify-center"} currentPage={currentPage} totalPages={totalPages} dottedArray={dottedArray} movePageBy={movePageBy} paginate={paginate} />}
            </div>
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