import React from 'react'
import EmptyTable from '../../../components/Sections/EmptyTable'
import ButtonPrimaryIcon from '../../../components/Buttons/ButtonPrimaryIcon'

const ProjectTask = ({tasks, setIsOpen}) => {
  return (
    <div>
        {
            tasks
            ?
            ""
            :
            <div className={`flex flex-col items-center`}>
                <EmptyTable paddingY={"py-14"} message={"No Tasks Yet"} />
                <ButtonPrimaryIcon handleClick={()=>setIsOpen(true)} bgColor={"bg-brandSec500"} text={"New Task"} />
            </div>
        }
    </div>
  )
}

export default ProjectTask