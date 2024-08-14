import React from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import DeadlineCard from './DeadlineCard'

const Deadline = () => {
  return (
    <DashTemplate>
        <UserImgHeader subHeader={"Timeline for your tasks!"} />
        <div className={`flex flex-col gap-10 pt-10`}>
            <DeadlineCard bgColor={""} />
            <DeadlineCard header={"Tomorrow"} bgColor={""} />
            <DeadlineCard header={"This week"} bgColor={""} />
        </div>
    </DashTemplate>
  )
}

export default Deadline