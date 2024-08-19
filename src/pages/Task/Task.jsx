import React, { useMemo, useState } from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import CardWrap from '../../components/Wraps/CardWrap'
import TaskStatusWrap from './TasksDisplay.jsx/TaskStatusWrap'
import useGetUser from '../../utils/useGetUser'
import axios from 'axios'
import useSWR from 'swr'
import useLoadMore from '../../utils/useLoadMore'
import PageLoaderNoNav from '../../components/Loaders/PageLoaderNoNav'
import { FaSearch } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import ViewTask from './TasksDisplay.jsx/ViewTask'

const Task = () => {

    const { user, token } = useGetUser()
    const [searchTerm, setSearchTerm] = useState("")
    const [isViewTaskOpen, setIsViewTaskOpen] = useState(false)
    const [currentTask, setCurrentTask] = useState([])


    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    const { data: task, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/task`, fetcher, { refreshInterval: 200 })


    // !isLoading && task?.data && console.log(task)
    // !isLoading && task?.data && console.log(task.data)

    const taskData = task?.data?.data || []

    const openViewTask = (data) => {
        console.log("currentTask =>", data)
        setCurrentTask([data])
        setIsViewTaskOpen(true)
    }

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) {
            return taskData;
        }
        return taskData?.filter(item =>
            // console.log(item)
            item?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.project?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, taskData]);

    const pendingTasks = filteredData?.filter((task => task.status == "pending"))
    const inProgressTasks = filteredData?.filter((task => task.status == "in progress"))
    const completedTasks = filteredData?.filter((task => task.status == "completed"))

    const isAdmin = currentTask?.[0]?.project?.users.filter(u => u?.user?.user_id == user?.user_id)?.[0].role == "admin"
    const isAssignee = currentTask?.[0]?.project?.users.filter(u => u?.user?.user_id == user?.user_id)

    // console.log(pendingTasks)
    
    const { slicedDataRows, moreRows, rows, rowsPerView } = useLoadMore(taskData, 2)

    if (isLoading) return <DashTemplate><PageLoaderNoNav /></DashTemplate>

    return (
        <>
            <DashTemplate>
                <UserImgHeader subHeader={"Manage your tasks!"} />
                <div className={`pt-10 flex flex-col gap-10`}>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-8 lg:gap-10`}>
                        <div className={`flex flex-col xxl:flex-row items-center my-auto gap-4 h-fit`}>
                            <CardWrap width={"w-full"}>
                                {/* <p className={`text-xl text-white font-avenirMedium`}>Running Task</p> */}
                                <div className='pt-4 flex flex-row items-center gap-6'>
                                    <div className={`p-2 rounded-full bg-brandBlue1x aspect-square`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" />
                                            <path d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.67999 6.38L10.72 2.06006" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.38 6.39001L17.32 2.05005" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.70001 12H15.7" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.70001 16H14.7" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                    <div className={`flex flex-col gap-1 text-left`}>
                                        <p className={`text-2xl font-avenirHeavy`}>{pendingTasks?.length}</p>
                                        <p className='text-lg'>Pending tasks</p>
                                    </div>
                                </div>
                            </CardWrap>
                            <CardWrap width={"w-full"} bgColor={"bg-brandSec500/50"} >
                                {/* <p className={`text-xl text-white font-avenirMedium`}>Running Task</p> */}
                                <div className='pt-4 flex flex-row items-center gap-6'>
                                    <div className={`p-2 rounded-full bg-white aspect-square`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" />
                                            <path d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.67999 6.38L10.72 2.06006" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.38 6.39001L17.32 2.05005" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.70001 12H15.7" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.70001 16H14.7" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                    <div className={`flex flex-col gap-1 text-left`}>
                                        <p className={`text-2xl font-avenirHeavy`}>{inProgressTasks?.length}</p>
                                        <p className='text-lg'>In Progress tasks</p>
                                    </div>
                                </div>
                            </CardWrap>
                            <CardWrap width={"w-full"} bgColor={"bg-brandBlue1x"} >
                                {/* <p className={`text-xl text-white font-avenirMedium`}>Running Task</p> */}
                                <div className='pt-4 flex flex-row items-center gap-6'>
                                    <div className={`p-2 rounded-full bg-white aspect-square`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" />
                                            <path d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.67999 6.38L10.72 2.06006" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.38 6.39001L17.32 2.05005" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.70001 12H15.7" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.70001 16H14.7" stroke="#141522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                    <div className={`flex flex-col gap-1 text-left`}>
                                        <p className={`text-2xl font-avenirHeavy`}>{completedTasks?.length}</p>
                                        <p className='text-lg'>Completed tasks</p>
                                    </div>
                                </div>
                            </CardWrap>
                        </div>
                        <CardWrap width={"w-full"} colSpan={"col-span-2"} bgColor={"bg-brandDashGray2x"} textColor={"text-brandSec500"} >
                            <div className='flex flex-row gap-2 justify-between'>
                                <p className={`text-xl font-avenirMedium`}>Activity</p>
                                <button className={`font-avenirMedium flex flex-row gap-2 items-center`}>
                                    This Week
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.95999 4.47501L6.69999 7.73501C6.31499 8.12001 5.68499 8.12001 5.29999 7.73501L2.03999 4.47501" stroke="#54577A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`bg-white rounded-ten p-4 h-60 w-full`}>

                            </div>
                        </CardWrap>
                    </div>
                </div>
                <div className='py-8'>
                    <label htmlFor='searchTasks' className='sticky top-0 left-0 z-20 bg-white rounded-ten px-4 flex flex-row items-center gap-2'>
                        <input
                            type="search"
                            name="searchTasks"
                            id="searchTasks"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Search for task'
                            className={`w-full px-4 py-2 bg-white rounded-ten`}
                        />
                        <FaSearch className={`${!searchTerm ? "text-brandGray11x" : ""} ${(searchTerm && filteredData.length !== 0) ? "text-brandGreen4x" : "text-brandRed1x"}`} />
                    </label>
                </div>

                <div className={`grid lg:grid-cols-3 pb-20 gap-8`}>
                    <TaskStatusWrap openViewTask={openViewTask} cardBgColor={"bg-brandOrange2x/20"} data={pendingTasks} />
                    <TaskStatusWrap openViewTask={openViewTask} status={"In Progress"} cardBgColor={"bg-brandYellow4x/10"} data={inProgressTasks} />
                    <TaskStatusWrap openViewTask={openViewTask} status={"Completed"} cardBgColor={"bg-brandGreen4x/10"} data={completedTasks} />
                </div>
            </DashTemplate>
            <ViewTask mutate={mutate} isAdmin={isAdmin} isAssignee={isAssignee} users={taskData?.[0]?.project?.users} setIsOpen={setIsViewTaskOpen} isOpen={isViewTaskOpen} taskData={currentTask} />
            <ToastContainer />
        </>
    )
}

export default Task