import React, { useState } from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import CardWrap from '../../components/Wraps/CardWrap'
import HeaderAndText from '../../components/Sections/HeaderAndText'
import TaskCardWrap from '../../components/Wraps/TaskCardWrap'
import useGetUser from '../../utils/useGetUser'
import axios from 'axios'
import useSWR from 'swr'
import PageLoaderNoNav from '../../components/Loaders/PageLoaderNoNav'
import { PieChart } from 'react-minimal-pie-chart'
import CreateProject from '../Projects/CreateProject'
import OverviewChart from '../../components/Charts/OverviewChart'

const Overview = () => {


    const { user, token } = useGetUser()
    const [isOpen, setIsOpen] = useState(false)


    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    const { data: project, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/project`, fetcher, { refreshInterval: 200 })

    const { data: analytics, error: analyticsError, isLoading: analyticsLoading, mutate: analyticsMutate } = useSWR(import.meta.env.VITE_BASEURL + `/dashboard`, fetcher, { refreshInterval: 200 })

    // !isLoading && project?.data && console.log(project)
    // !isLoading && project?.data && console.log(project.data)
    !analyticsLoading && analytics?.data && console.log(analytics.data?.data?.task_data)

    const analyticsData = analytics?.data?.data || []

    const pending = analyticsData?.task_data?.total_number_of_pending_task
    const inProgess = analyticsData?.task_data?.total_number_of_in_progress_task
    const completed = analyticsData?.task_data?.total_number_of_completed_task

    const chartData = [
        { title: 'Pending', value: pending, color: '#D86417' },
        { title: 'In Progress', value: inProgess, color: '#FFF20D' },
        { title: 'Completed', value: completed, color: '#26B315' },
    ]


    const projectData = project?.data?.data || []

    if (isLoading) return <DashTemplate><PageLoaderNoNav /></DashTemplate>

    return (
        <>
            <DashTemplate>
                <UserImgHeader />
                <div className={`h-full pt-10 flex flex-col gap-10`}>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-8 lg:gap-10`}>
                        <CardWrap width={"w-full"}>
                            <p className={`text-xl text-white font-avenirMedium`}>Running Task</p>
                            <div className='text-4xl font-avenirHeavy'>
                                <p>{analyticsData?.task_data?.total_number_of_in_progress_task}</p>
                            </div>
                            <div className='pt-4 flex flex-row items-center gap-6 w-full'>
                                <div className='flex flex-col gap-4 w-full'>
                                    {
                                        !analyticsData || (!pending && !inProgess && !completed)
                                            ?
                                            <div className={`w-full ${analyticsLoading && "skeleton--white"} rounded-full bg-brandBlue1x/50 aspect-square`}>

                                            </div>
                                            :
                                            <PieChart lineWidth={12} paddingAngle={10} rounded={3.5} data={chartData} />
                                    }

                                </div>
                                <div className={`flex flex-col gap-1 text-left`}>
                                    <p className={`text-2xl font-avenirHeavy`}>{analyticsData?.task_data?.total_number_of_task}</p>
                                    <p className='text-lg'>Total Task</p>
                                </div>
                            </div>
                            <div className='text-xxs gap-1'>
                                {
                                    !analyticsData
                                        ?
                                        <div className={`w-32 ${analyticsLoading && "skeleton--white"} rounded-full bg-brandBlue1x aspect-square`}>

                                        </div>
                                        :
                                        <div className={`grid grid-cols-3 gap-2 items-center`}>
                                            {
                                                chartData.map((data, i) => {
                                                    return <div key={i} className='flex flex-row gap-3 items-center'>
                                                        <div style={{ backgroundColor: data.color }} className='w-3 rounded-full aspect-square' >

                                                        </div>
                                                        <div>
                                                            <p>{data.value}</p>
                                                            <p>{data.title}</p>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </CardWrap>
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
                            <OverviewChart overviewData={analyticsData?.task_data?.task_complete_count_by_day} />

                        </CardWrap>

                    </div>


                    <div className={`flex flex-col gap-8 w-full`}>
                        <HeaderAndText handleClick={() => setIsOpen(true)} header={"Current Projects"} subHeader={"A glimpse into your projects"} buttonText={"New Project"} />

                        <div className={`flex flex-row gap-8 w-full`}>
                            <div className={`w-full grid md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-x-8`}>
                                {
                                    projectData.slice(0, 3).map((project, idx) => {
                                        return <TaskCardWrap key={idx} link={`projects/${project.project_id}`} project={project} creator={project.creator} members={project.users} projectImg={project.project_photo} name={project.name} description={project.description} hideDue />
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </DashTemplate>
            <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} mutate={mutate} />
        </>
    )
}

export default Overview