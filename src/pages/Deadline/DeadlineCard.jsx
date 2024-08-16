import React, { useState } from 'react'
import StatusTag from '../../components/Sections/StatusTag'
import formatDateMonthText from '../../utils/formatDateMonthText'
import UserImg from '../../components/Sections/UserImg'
import usePagination from '../../utils/usePagination'
import Paginator from '../../components/Pagination/Paginator'
import DeadlineTemplate from './DeadlineTemplate'
import EmptyTable from '../../components/Sections/EmptyTable'
import { FaChevronUp } from 'react-icons/fa'

const DeadlineCard = ({ header, tasks, fetched, bgColor, isLoading }) => {

    const [rowLength, setRowLength] = useState(3)
    const [open, setOpen] = useState(false)

    const convertToSnakeCase = (str) => {
        return str
            ?.toLowerCase()  // Convert to lowercase
            .replace(/ /g, '_')  // Replace spaces with underscores
            .concat('_wrap');  // Append '_wrap'
    };

    const { currentPage, templates, loading: dataLoading, rows: paginatorRows, totalPages, dottedArray, movePageBy, paginate, displayedData } = usePagination(tasks, rowLength, () => convertToSnakeCase(header))


    // console.log(displayedData)

    return (
        <>
            {
                (isLoading || dataLoading)
                    ?
                    <DeadlineTemplate length={rowLength} />
                    :
                    <div id={() => convertToSnakeCase(header)} className={` ${bgColor ? bgColor : "bg-white"} rounded-ten w-full px-4 py-4 flex flex-col gap-4`}>
                        <div onClick={() => setOpen(prevOpen => !prevOpen)} className={`cursor-pointer flex flex-row items center justify-between w-full gap-10 ${!open ? "border-b py-4" : "pt-4"}`}>
                            <p className={`font-avenirHeavy text-xl`}>{header || "Today"}</p>
                            <div>
                                <FaChevronUp className={`text-brandSec500 ${!open ? "" : "rotate-180"} transition-all duration-300 ease-in-out`} />
                            </div>
                        </div>
                        <div className={`flex flex-col gap-2 ${!open ? "" : "h-0 opacity-0 pointer-events-none overflow-hidden"} transition-all duration-300 ease-in-out`}>
                            <div className='w-full overflow-x-auto'>
                                {
                                    !dataLoading && displayedData.length == 0
                                        ?
                                        <EmptyTable paddingY={"py-10"} message={"No tasks to display"} />
                                        :
                                        <table className='table overflow-x-auto w-full'>
                                            <tbody>
                                                {
                                                    displayedData.map((task, idx) => {
                                                        return <tr key={idx} className={`pr-2 rounded-ten hover:bg-brandBlue1x/10`}>
                                                            <td className='py-2 px-1'>
                                                                <label>
                                                                    <input type='checkbox' className={`accent-brandGreen4x`} />
                                                                </label>
                                                            </td>
                                                            <td className='py-2 px-1'>
                                                                <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium capitalize`}>{task.title || "Sample task"}</p>
                                                            </td>
                                                            <td className='py-2 px-1'>
                                                                <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium capitalize`}>{formatDateMonthText(task.due_date) || "January 11, 1999"}</p>
                                                            </td>
                                                            <td className='py-2 px-1'>
                                                                <StatusTag useFixed status={task.status || "pending"} />
                                                            </td>
                                                            <td className='py-2 px-1'>
                                                                <div className={`flex flex-row items-center gap-3`}>
                                                                    <UserImg src={task.project.project_photo} width={"w-8"} />
                                                                    <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium capitalize`}>{task.project.name || "Sample project"}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                }
                            </div>

                            <div className='pt-8 text-sm'>
                                {tasks && tasks.length > rowLength && <Paginator btnSize={"px-3 py-1"} arrowBtnSize={"px-3 py-1"} justifySection={"justify-center"} currentPage={currentPage} totalPages={totalPages} dottedArray={dottedArray} movePageBy={movePageBy} paginate={paginate} />}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default DeadlineCard