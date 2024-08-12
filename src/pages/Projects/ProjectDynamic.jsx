import React, { useState } from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import axios from 'axios'
import useSWR from 'swr'
import useGetUser from '../../utils/useGetUser'
import PageLoaderNoNav from "../../components/Loaders/PageLoaderNoNav"
import ErrorPageNotFound from '../../components/Error/ErrorPageNotFound'
import HeaderAndText from '../../components/Sections/HeaderAndText'

const ProjectDynamic = () => {

    const [projectId, setProjectId] = useState(location.pathname.split('projects/')[1])
    const [tab, setTab] = useState("tasks")

    const tabs = [
        {
            id:"tasks",
            name:"Tasks"
        },
        {
            id:"members",
            name:"Members"
        }
    ]

    const { token } = useGetUser()

    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    const { data: project, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/project/${projectId}`, fetcher, { refreshInterval: 1000 })


    // !isLoading && project?.data && console.log(project)
    !isLoading && project?.data && console.log(project.data)

    const projectData = [project?.data?.data] || []
    console.log(projectData)

    if (isLoading) return <DashTemplate><PageLoaderNoNav /></DashTemplate>
    if (error || project.data.code == 400) return <ErrorPageNotFound page={"Projects"} link={"/projects"} message={project?.data?.message} />

    return (
        <DashTemplate>
            <UserImgHeader subHeader={"Manage your projects easily!"} />
            <div className='grid md:grid-cols-3 gap-10 h-full pt-10'>
                <div className={`flex flex-col gap-10 md:col-span-2`}>
                    {
                        projectData?.map((project, idx) => {
                            return <>
                                <div className='w-full rounded-ten'>
                                    {
                                        project.project_photo
                                        ?
                                        <img src={project.project_photo} alt={project.name} className={`skeleton--white w-full h-60 object-cover rounded-ten`} />
                                        :
                                        <div className={`h-60 rounded-ten bg-brandLightBlue1x w-full flex items-center justify-center p-6`}>
                                            <svg className={`h-20 w-20 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    }
                                </div>

                                {/* project details */}
                                <HeaderAndText header={project.name} subHeader={project.description} hasNoButton />

                                <div className=''>
                                    <p className={`text-sm text-brandBlue1x`}>Creator</p>
                                    <div className={`flex pt-2 flex-row items-center gap-2`}>
                                        <img src={project?.creator?.profile_photo} alt={`${project?.creator?.first_name} ${project?.creator?.last_name}`} className={`skeleton--white rounded-full w-12 aspect-square`}  />
                                        <p className='capitalize font-avenirHeavy'>{`${project?.creator?.first_name} ${project?.creator?.last_name}`}</p>
                                    </div>
                                </div>
                            </>
                        })
                    }
                </div>
                <div className='col-span-1 bg-brandSec500 h-full min-h-screen sticky top-0 right-0'>

                </div>
            </div>
        </DashTemplate>
    )
}

export default ProjectDynamic