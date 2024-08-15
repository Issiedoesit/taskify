import React from 'react'
import {FaChevronDown} from "react-icons/fa"
import TaskCard from './TaskCard'

const TaskStatusWrap = ({status, data}) => {

    

  return (
    <div>
        <div className={`flex flex-row items center justify-between w-full gap-10 py-4 border-b`}>
            <p className={`text-xl font-avenirMedium uppercase text-brandSec500`}>{status || "Pending"}</p>
            <button type='button'>
                <FaChevronDown className='text-brandSec500' />
            </button>
        </div>
        <div className='py-2 grid grid-cols-1 gap-8 auto-cols-fr auto-rows-fr'>
            <TaskCard />
            <TaskCard />
        </div>
    </div>
  )
}

export default TaskStatusWrap