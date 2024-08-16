import React, { useState } from 'react'
import Avatar1 from "../../../assets/media/avatars/avatar-1.png"
import Avatar2 from "../../../assets/media/avatars/avatar-2.png"
import Avatar3 from "../../../assets/media/avatars/avatar-3.png"
import Avatar4 from "../../../assets/media/avatars/avatar-4.png"
import { Avatar, Tooltip } from '@mantine/core'
import { FaCalendar } from 'react-icons/fa'
import formatDateMonthText from '../../../utils/formatDateMonthText'
import { NavLink } from 'react-router-dom'

const TaskCard = ({ members, status, project, taskName, projectId, taskStart, taskDue, priority, tags, bgColor }) => {
    
    const [stackedPics, setStackedPics] = useState(2)
    
    return (
        <div className={`py-6 px-4  ${bgColor ? bgColor : "bg-white"} rounded-ten flex flex-col gap-8 shadow-md`}>
            <div className={`flex items-center justify-between gap-8`}>

                <Tooltip.Group>
                    <Avatar.Group className=''>
                        {
                            members.slice(0, stackedPics)?.map((member, i) => {
                                return member?.user?.profile_photo
                                    ?
                                    <Tooltip key={i} label={`${member?.user?.first_name} ${member?.user?.last_name}`} className='capitalize' withArrow>
                                        <Avatar src={member?.user?.profile_photo} />
                                    </Tooltip>
                                    :
                                    <Tooltip key={i} label={`${member?.user?.first_name} ${member?.user?.last_name}`} className='capitalize' withArrow>
                                        <Avatar name={`${member?.user?.first_name} ${member?.user?.last_name}`} color="initials" />
                                    </Tooltip>
                            })
                        }
                        {members.length > stackedPics
                            &&
                            <Avatar>+{members.length - stackedPics}</Avatar>
                        }
                        </Avatar.Group>
                        </Tooltip.Group>
                        <div className={`bg-brandLightViolet1x text-brandDarkViolet1x text-xs rounded-full px-3 py-1`}>
                            <p>{priority || "Medium"}</p>
                        </div>
                    </div>
                    <div className=''>
                        <p className={`text-brandSec500 font-avenirMedium text-lg first-letter:capitalize`}>{taskName || "Demo task for card"}</p>
                        <NavLink to={`/projects/${projectId}`} className={`text-brandSec500/50 font-avenirMedium text-sm first-letter:capitalize`}>{project.charAt(0).toUpperCase() + project.slice(1) || "Project Name"}</NavLink>
                        <div className='flex items-center gap-2 py-3'>
                            <div className={`bg-brandLightBlue1x text-brandBlue1x text-xs rounded-full px-3 py-1`}>
                                <p>{priority || "Design"}</p>
                            </div>
                            <div className={`bg-brandPeach1x text-brandRed3x text-xs rounded-full px-3 py-1`}>
                                <p>{priority || "Arts"}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-row gap-1 items-center text-xs`}>
                        <FaCalendar />
                        <p>{formatDateMonthText(taskStart)}</p>
                        <p>-</p>
                        <p className={`${new Date(taskDue) <= new Date() ? "text-brandRed4x" : ""}`}>{formatDateMonthText(taskDue)}</p>
                    </div>

            </div>
            )
}

            export default TaskCard