import React, { useState } from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import DeadlineCard from './DeadlineCard'
import useGetUser from '../../utils/useGetUser'
import axios from 'axios'
import useSWR from 'swr'
import useFilterDeadline from '../../utils/useFilterDeadline'
import DeadlineTemplate from './DeadlineTemplate'
import ViewTask from '../Task/TasksDisplay.jsx/ViewTask'
import { ToastContainer } from 'react-toastify'

const Deadline = () => {


  const { user, token } = useGetUser()
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState([])

  const openViewTask = (data) => {
      setCurrentTask([data])
      setIsViewTaskOpen(true)
  }
  // const [isOpen, setIsOpen] = useState(false)

  const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

  const { data: task, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/task`, fetcher, { refreshInterval: 200 })


  // !isLoading && task?.data && console.log(task)
  // !isLoading && task?.data && console.log(task.data)

  const taskData = task?.data?.data || []

  const isAdmin = currentTask?.[0]?.project?.users.filter(u => u?.user?.user_id == user?.user_id)?.[0].role == "admin"
  const isAssignee = currentTask?.[0]?.project?.users.filter(u => u?.user?.user_id == user?.user_id)

  const { duePastDue, dueToday, dueTomorrow, dueThisWeek, dueThisMonth, dueNextMonth, dueRestOfYear, dueFuture } = useFilterDeadline(taskData)

  return (
    <>
      <DashTemplate>
        <UserImgHeader subHeader={"Timeline for your tasks!"} />
        <div className={`flex flex-col gap-10 pt-10`}>
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} bgColor={""} header={"Past Due"} tasks={duePastDue} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} bgColor={""} header={"Today"} tasks={dueToday} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} header={"Tomorrow"} bgColor={""} tasks={dueTomorrow} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} header={"This week"} bgColor={""} tasks={dueThisWeek} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} header={"This month"} bgColor={""} tasks={dueThisMonth} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} header={"Next month"} bgColor={""} tasks={dueNextMonth} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} header={"Rest of year"} bgColor={""} tasks={dueRestOfYear} />
          <DeadlineCard openTask={openViewTask} isLoading={isLoading} fetched={task} header={"Future"} bgColor={""} tasks={dueFuture} />
        </div>
      </DashTemplate>
      <ViewTask  mutate={mutate} isAdmin={isAdmin} isAssignee={isAssignee} users={taskData?.[0]?.project?.users} setIsOpen={setIsViewTaskOpen} isOpen={isViewTaskOpen} taskData={currentTask} />
      <ToastContainer />
    </>
  )
}

export default Deadline