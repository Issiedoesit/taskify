import React, { useState } from 'react'
import { FaChevronUp } from "react-icons/fa"
import TaskCard from './TaskCard'
import formatDateMonthText from '../../../utils/formatDateMonthText'
import usePagination from '../../../utils/usePagination'
import Paginator from '../../../components/Pagination/Paginator'

const TaskStatusWrap = ({ status, data, cardBgColor }) => {


    const [open, setOpen] = useState(false)

    const { currentPage, templates, loading, rows, totalPages, dottedArray, movePageBy, paginate, displayedData } = usePagination(data, 5, `task_display_${status}_wrap`)



    return (
        <div id={`task_display_${status}_wrap`}>
            <div onClick={() => setOpen(prevOpen => !prevOpen)} className={`cursor-pointer flex flex-row items center justify-between w-full gap-10 py-4 border-b`}>
                <p className={`text-lg font-avenirMedium uppercase text-brandSec500`}>{status || "Pending"}</p>
                <div>
                    <FaChevronUp className={`text-brandSec500 ${!open ? "" : "rotate-180"} transition-all duration-300 ease-in-out`} />
                </div>
            </div>
            <div className={`${!open ? "py-2" : "h-0 opacity-0 collapse pointer-events-none overflow-hidden"} transition-all duration-300 ease-in-out`}>
                <div className={`grid grid-cols-1 auto-cols-fr auto-rows-fr gap-8`}>
                    {
                        data?.length == 0
                            ?
                            <div className={`py-6 px-4 text-sm text-center`}>
                                <p>Nothing to display here.</p>
                            </div>
                            :
                            <>
                                {
                                    data.map((task, idx) => {
                                        return <TaskCard key={idx} taskName={task.title} projectId={task.project_id} project={task.project.name} taskStart={task.created_at} taskDue={task.due_date} bgColor={cardBgColor} />
                                    })
                                }


                            </>
                    }
                </div>
                {
                    data.length !== 0 && <div className={`py-6`}>
                        {data && data.length > 5 && <Paginator currentPage={currentPage} totalPages={totalPages} dottedArray={dottedArray} movePageBy={movePageBy} paginate={paginate} />}
                    </div>
                }
            </div>
        </div>
    )
}

export default TaskStatusWrap