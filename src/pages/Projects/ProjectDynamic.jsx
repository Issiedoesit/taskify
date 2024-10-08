import React, { useState } from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import axios from 'axios'
import useSWR from 'swr'
import useGetUser from '../../utils/useGetUser'
import PageLoaderNoNav from "../../components/Loaders/PageLoaderNoNav"
import ErrorPageNotFound from '../../components/Error/ErrorPageNotFound'
import HeaderAndText from '../../components/Sections/HeaderAndText'
import ProjectTask from './ProjectDisplay/ProjectTask'
import CreateTask from '../Task/CreateTask'
import { ToastContainer } from 'react-toastify'
import ProjectMembers from './ProjectDisplay/ProjectMembers'
import ButtonPrimaryIcon from '../../components/Buttons/ButtonPrimaryIcon'
import ViewTask from '../Task/TasksDisplay.jsx/ViewTask'
import { FaLock } from 'react-icons/fa'
import { FaMessage } from "react-icons/fa6";
import AddUser from './AddUser'
import InProjectMessage from './ProjectDisplay/InProjectMessage'
import ProjectManage from './ProjectDisplay/ProjectManage'
import ConfirmDelete from '../../components/Sections/ConfirmDelete'

const ProjectDynamic = () => {

    const [projectId, setProjectId] = useState(location.pathname.split('projects/')[1])
    const [currentTab, setCurrentTab] = useState("tasks")
    const [isOpen, setIsOpen] = useState(false)
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [isViewTaskOpen, setIsViewTaskOpen] = useState(false)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [deleteAction, setDeleteAction] = useState(null)
    const [typeIn, setTypeIn] = useState("")
    const [currentTask, setCurrentTask] = useState([])
    const [translate, setTranslate] = useState(false)
    const [header, setHeader] = useState(true)


    const { user, token } = useGetUser()

    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    const { data: project, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/project/${projectId}`, fetcher, { refreshInterval: 200 })
    const { data: messages, error:messagesError, isLoading:messagesIsLoading, mutate:mutateMessages } = useSWR(import.meta.env.VITE_BASEURL + `/message/group/${projectId}`, fetcher, { refreshInterval: 200 })


    const openDeleteMember = (action, typeToDelete) => {
        setIsConfirmDeleteOpen(true)
        setDeleteAction(()=>action)
        setTypeIn(typeToDelete)
    }
    const openDeleteProject = (action, typeToDelete) => {
        setIsConfirmDeleteOpen(true)
        setDeleteAction(()=>action)
        setTypeIn(typeToDelete)
    }

    // !isLoading && project?.data && console.log(project)
    // !isLoading && project?.data && console.log(project.data)
    // !messagesIsLoading && messages?.data && console.log(messages.data)

    const projectData = [project?.data?.data] || []
    const messagesData = messages?.data?.data || []
    // console.log("projectData[0].users => ", projectData?.[0]?.users)
    // console.log("Messages => ", messagesData)

    if (isLoading) return <DashTemplate><PageLoaderNoNav /></DashTemplate>
    if (error || messagesError || project.data.code == 400) return <ErrorPageNotFound page={"Projects"} link={"/projects"} message={"Something went wrong"} />

    const isAdmin = projectData[0].users.filter(u => u.user.user_id == user.user_id)[0].role == "admin"
    const isAssignee = currentTask?.[0]?.user_id == user.user_id

    const openViewTask = (data) => {
        setCurrentTask([data])
        setIsViewTaskOpen(true)
    }

    const tabs = [
        {
            id: "tasks",
            name: `Tasks (${projectData[0].tasks.length})`,
            element: <ProjectTask isAdmin={isAdmin} setIsViewTaskOpen={openViewTask} setIsOpen={setIsOpen} isOpen={isOpen} tasks={projectData[0].tasks} users={projectData[0].users} />,
            canView: "all"
        },
        {
            id: "members",
            name: `Members (${projectData[0].users.length})`,
            element: <ProjectMembers openDelete={openDeleteMember} users={projectData[0].users} creator={projectData[0].creator} isAdmin={isAdmin} projectId={projectId} mutate={mutate} />,
            canView: "all"
        },
        {
            id: "manage",
            name: "Manage",
            element:<ProjectManage openDelete={openDeleteProject} project={projectData?.[0]} projectId={projectId} mutate={mutate} users={projectData[0].users} creator={projectData[0].creator} isAdmin={isAdmin} setIsOpen={setIsAddUserOpen}  />,
            canView: "admin"
        }
    ]



    return (
        <>
            <DashTemplate>
                {header && <UserImgHeader subHeader={"Manage your projects easily!"} />}

                <div className='relative lg:static w-full overflow-hidden lg:overflow-visible'>
                    <div className={`flex ${translate ? "h-screen lg:h-full" : ""} lg:grid lg:grid-cols-3 lg:gap-10 h-full pt-10 w-full lg:w-full transition-transform duration-300 ease-in-out ${translate ? "-translate-x-hundredPercent lg:translate-x-0" : ""}`}>
                        <div className={`min-w-full md:col-span-2 w-full`}>
                            {
                                projectData?.map((project, idx) => {
                                    return <div key={idx} className='flex flex-col gap-6 w-full'>
                                        <div className='w-full rounded-ten'>
                                            {
                                                project.project_photo
                                                    ?
                                                    <img src={project.project_photo} alt={project.name} className={`skeleton--white w-full h-60 object-cover rounded-ten`} />
                                                    :
                                                    <div className={`h-60 rounded-ten bg-brandLightBlue1x w-full flex items-center justify-center p-6`}>
                                                        <svg className={`h-20 w-20 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                            }
                                        </div>

                                        {/* project details */}
                                        <HeaderAndText header={project.name} subHeader={project.description} hasNoButton />

                                        <div className=''>
                                            <p className={`text-sm text-brandBlue1x`}>Creator</p>
                                            <div className={`flex pt-2 flex-row items-center gap-2`}>
                                                <img src={project?.creator?.profile_photo} alt={`${project?.creator?.first_name} ${project?.creator?.last_name}`} className={`skeleton--white rounded-full w-12 aspect-square`} />
                                                <p className='capitalize font-avenirHeavy'>{`${project?.creator?.first_name} ${project?.creator?.last_name}`}</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-2 justify-end'>
                                            <div className='lg:hidden pt-10 pb-6'>
                                                <ButtonPrimaryIcon handleClick={() => { setTranslate(true), setHeader(false) }} bgColor={"bg-brandSec500"} text={" "} gap={"gap-0"} icon={<FaMessage className='text-xl' />} paddingX={"px-4"} />
                                            </div>
                                            {
                                                isAdmin
                                                &&
                                                <div className='flex gap-2 justify-end pt-10 pb-6'>
                                                    <ButtonPrimaryIcon bgColor={"bg-brandSec500"} text={"Add Task"} handleClick={() => setIsOpen(true)} />
                                                    <ButtonPrimaryIcon bgColor={"bg-brandSec500"} text={"Add User"} handleClick={() => setIsAddUserOpen(true)} />
                                                </div>
                                            }
                                        </div>

                                        <div className={`border-b-0.5 border-b-brandBlue1x/20 grid pt-8`}>
                                            <div className='overflow-x-auto flex flex-row'>
                                                {
                                                    tabs.map((tab, i) => {
                                                        return <div key={i} className={`pb-4 w-fit`}>
                                                            <button onClick={() => setCurrentTab(tab.id)} className={`flex flex-row items-center gap-2 py-2 px-6 whitespace-nowrap rounded-full ${currentTab == tab.id ? "bg-brandBlue1x text-white" : (tab.canView == "admin" && !isAdmin) ? "text-brandGray4x/50 pointer-events-none" : ""} transition-all duration-300 ease-in-out`}>
                                                                {tab.name}
                                                                {(tab.canView == "admin" && !isAdmin)
                                                                    &&
                                                                    <FaLock className={`text-brandGray4x/50`} />
                                                                }
                                                            </button>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className=''>
                                            {
                                                tabs.filter(tab => tab.id == currentTab)[0].element
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <InProjectMessage messages={messagesData} setHeader={setHeader} loading={messagesIsLoading} setTranslate={setTranslate} projectId={projectId} mutate={mutateMessages}  />
                    </div>
                </div>
            </DashTemplate>
            <ViewTask mutate={mutate} isAdmin={isAdmin} isAssignee={isAssignee} users={projectData?.[0]?.users} setIsOpen={setIsViewTaskOpen} isOpen={isViewTaskOpen} taskData={currentTask} />
            <AddUser projectMembers={projectData?.[0]?.users} setIsOpen={setIsAddUserOpen} isOpen={isAddUserOpen} mutate={mutate} projectId={projectId} projectName={projectData?.[0]?.name} />
            <CreateTask users={projectData?.[0].users} setIsOpen={setIsOpen} isOpen={isOpen} mutate={mutate} projectId={projectId} />
            <ConfirmDelete name={`${typeIn}`} isOpen={isConfirmDeleteOpen} setIsOpen={setIsConfirmDeleteOpen} handleDelete={deleteAction} typeIn={typeIn}  />
            <ToastContainer />
        </>
    )
}

export default ProjectDynamic