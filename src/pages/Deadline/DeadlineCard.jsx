import React from 'react'
import StatusTag from '../../components/Sections/StatusTag'

const DeadlineCard = ({header, task, due_date, status, project, users, bgColor}) => {
  return (
    <div className={` ${bgColor ? bgColor : "bg-white"} rounded-ten w-full px-4 py-4 flex flex-col gap-4`}>
        <p className={`font-avenirHeavy text-xl`}>{header || "Today"}</p>
        <div className={`flex flex-col gap-2`}>
            <div className='w-full overflow-x-auto'>
                <table className='table overflow-x-auto w-full'>
                <tbody>
                <tr className={`pr-2 rounded-ten hover:bg-brandBlue1x/10`}>
                    <td className='py-2 px-1'>
                        <label>
                            <input type='checkbox' className={`accent-brandGreen4x`} />
                        </label>
                    </td>
                    <td className='py-2 px-1'>
                        <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium`}>{task || "Sample task"}</p>
                    </td>
                    <td className='py-2 px-1'>
                        <StatusTag useFixed status={status || "pending"} />
                    </td>
                    <td className='py-2 px-1'>
                        <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium`}>{project || "Sample project"}</p>
                    </td>
                </tr>
                <tr className={`pr-2 rounded-ten hover:bg-brandBlue1x/10`}>
                    <td className='py-2 px-1'>
                        <label>
                            <input type='checkbox' className={`accent-brandGreen4x`} />
                        </label>
                    </td>
                    <td className='py-2 px-1'>
                        <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium`}>{task || "Sample task"}</p>
                    </td>
                    <td className='py-2 px-1'>
                        <StatusTag useFixed status={status || "pending"} />
                    </td>
                    <td className='py-2 px-1'>
                        <p className={`px-4 py-2 whitespace-nowrap text-brandSec500 font-avenirMedium`}>{project || "Sample project"}</p>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default DeadlineCard