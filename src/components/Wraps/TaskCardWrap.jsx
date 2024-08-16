import React, { useState } from 'react'
import Progress from '../Sections/Progress'
import { NavLink } from 'react-router-dom'
import { Avatar, Tooltip } from '@mantine/core'
import UserImg from '../Sections/UserImg'

const TaskCardWrap = ({ taskImg, name, link, description, creator, members, date, maxWidth, hideDue }) => {

    const [stackedPics, setStackedPics] = useState(2)

    return (
        <NavLink to={link} className={`w-full rounded-ten shadow-md ${maxWidth ? maxWidth : "md:max-w-xs"}`}>

            {
                taskImg
                    ?
                    <img src={taskImg} alt={name} className={`h-40 skeleton--white w-full object-cover rounded-t-ten`} />
                    :
                    <div className={`h-40 rounded-t-ten bg-brandLightBlue1x w-full flex items-center justify-center p-6`}>
                        <svg className={`h-20 w-20 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

            }

            <div className={`p-4 flex flex-col gap-2`}>
                <p className='text-xl font-avenirHeavy capitalize'>{name || "Short Task Name"}</p>
                <p className='text-sm two-lined-text text-brandGray1x first-letter:capitalize'>{(description.charAt(0).toUpperCase() + description.slice(1)) || "2 line of description text in small font with text wrap if longer the containing element as shown here?"}</p>
            </div>
            <div className={`flex flex-col gap-1 p-4`}>
                <p className={`text-xs`}> Created by:</p>
                <div className={`flex flex-row gap-8 justify-between items-center`}>
                    <p className={`text-brandBlue1x font-avenirMedium capitalize`}>{`${creator.first_name} ${creator.last_name}` || "Jim Create"}</p>
                    <UserImg src={creator?.profile_photo} width={"w-8"} />
                </div>
                <Progress />
            </div>
            <div className={`flex flex-col gap-1 px-4 pb-4`}>
                <div className={`flex flex-row gap-8 items-center`}>
                    {
                        creator?.profile_photo
                            ?
                            <div className={`flex w-full items-center justify-end`}>

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
                            </div>
                            :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#141522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#141522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#141522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                    }
                </div>

            </div>
            {
                hideDue
                ||
                <div className={`flex flex-row gap-8 justify-between px-4 pb-4`}>
                    <div className={`flex flrx-row items-center gap-2`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2498 12.0005C21.2498 17.1095 17.1088 21.2505 11.9998 21.2505C6.89082 21.2505 2.74982 17.1095 2.74982 12.0005C2.74982 6.89149 6.89082 2.75049 11.9998 2.75049C17.1088 2.75049 21.2498 6.89149 21.2498 12.0005Z" stroke="#54577A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.4314 14.9429L11.6614 12.6939V7.84692" stroke="#54577A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        3 days left
                    </div>
                </div>
            }
        </NavLink>
    )
}

export default TaskCardWrap