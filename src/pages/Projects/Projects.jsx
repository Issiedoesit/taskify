import React, { useState } from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import CardWrap from '../../components/Wraps/CardWrap'
import HeaderAndText from '../../components/Sections/HeaderAndText'
import ProjectTable from './ProjectDisplay/ProjectTable'
import useGetUser from '../../utils/useGetUser'
import axios from 'axios'
import useSWR from 'swr'
import PageLoaderNoNav from '../../components/Loaders/PageLoaderNoNav'
import LoadMore from '../../components/Pagination/LoadMore'
import CreateProject from './CreateProject'
import { ToastContainer } from 'react-toastify'
import useLoadMore from '../../utils/useLoadMore'

const Projects = () => {

    const { user, token } = useGetUser()
    const [isOpen, setIsOpen] = useState(false)

    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    const { data: project, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/project`, fetcher, { refreshInterval: 200 })


    // !isLoading && project?.data && console.log(project)
    // !isLoading && project?.data && console.log(project.data)

    const projectData = project?.data?.data || []

    const {slicedDataRows, moreRows, rows, rowsPerView} = useLoadMore(projectData, 2)


    if (isLoading) return <DashTemplate><PageLoaderNoNav /></DashTemplate>

    return (
        <>
            <DashTemplate>
                <UserImgHeader subHeader={"Manage your projects easily!"} />
                <div className={`h-full pt-10 flex flex-col gap-10`}>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-8 lg:gap-10`}>
                        <div className={`flex flex-col xxl:flex-row items-center my-auto gap-4 h-fit`}>
                            <CardWrap width={"w-full"}>
                                {/* <p className={`text-xl text-white font-avenirMedium`}>Running Task</p> */}
                                <div className='pt-4 flex flex-row items-center gap-6'>
                                    <div className={`p-2 rounded-full bg-brandBlue1x aspect-square`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" />
                                            <path d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.67999 6.38L10.72 2.06006" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.38 6.39001L17.32 2.05005" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.70001 12H15.7" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6.70001 16H14.7" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div className={`flex flex-col gap-1 text-left`}>
                                        <p className={`text-2xl font-avenirHeavy`}>40</p>
                                        <p className='text-lg'>Projects Created</p>
                                    </div>
                                </div>
                            </CardWrap>
                            <CardWrap width={"w-full"} bgColor={"bg-brandBlue1x"} >
                                {/* <p className={`text-xl text-white font-avenirMedium`}>Running Task</p> */}
                                <div className='pt-4 flex flex-row items-center gap-6'>
                                    <div className={`p-2 rounded-full bg-white aspect-square`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" stroke="#141522" stroke-width="1.5" stroke-miterlimit="10" />
                                            <path d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" stroke="#141522" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.67999 6.38L10.72 2.06006" stroke="#141522" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.38 6.39001L17.32 2.05005" stroke="#141522" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.70001 12H15.7" stroke="#141522" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6.70001 16H14.7" stroke="#141522" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div className={`flex flex-col gap-1 text-left`}>
                                        <p className={`text-2xl font-avenirHeavy`}>25</p>
                                        <p className='text-lg'>Projects Joined</p>
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
                                        <path d="M9.95999 4.47501L6.69999 7.73501C6.31499 8.12001 5.68499 8.12001 5.29999 7.73501L2.03999 4.47501" stroke="#54577A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`bg-white rounded-ten p-4 h-60 w-full`}>

                            </div>
                        </CardWrap>
                    </div>

                    <div className={`flex flex-col gap-8 w-full`}>
                        <HeaderAndText handleClick={() => setIsOpen(true)} header={"Projects"} subHeader={"A glimpse into your projects"} buttonText={"New Project"} />
                        <div className={`w-full overflow-x-auto`}>
                            <ProjectTable data={slicedDataRows} />
                        </div>
                        <div className='pt-4'>
                            {projectData.length > rowsPerView && <LoadMore rows_per_view={rowsPerView} moreRows={moreRows} rows={rows} listLength={projectData.length} />}

                        </div>
                    </div>
                </div>
            </DashTemplate>
            <CreateProject isOpen={isOpen} setIsOpen={setIsOpen} mutate={mutate} />
            <ToastContainer />
        </>
    )
}

export default Projects