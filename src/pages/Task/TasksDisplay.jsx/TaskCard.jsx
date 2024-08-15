import React from 'react'
import Avatar1 from "../../../assets/media/avatars/avatar-1.png"
import Avatar2 from "../../../assets/media/avatars/avatar-2.png"
import Avatar3 from "../../../assets/media/avatars/avatar-3.png"
import Avatar4 from "../../../assets/media/avatars/avatar-4.png"
import { Avatar } from '@mantine/core'

const TaskCard = ({ members, project, taskName, taskStart, taskDue, priority, tags }) => {
    return (
        <div className={`py-6 px-4 bg-white rounded-ten flex flex-col gap-8 shadow-md`}>
            <div className={`flex items-center justify-between gap-8`}>
                <Avatar.Group>
                    <Avatar src={Avatar1} />
                    <Avatar src={Avatar2} />
                    <Avatar src={Avatar3} />
                    <Avatar>+2</Avatar>
                </Avatar.Group>
                <div className={`bg-brandLightViolet1x text-brandDarkViolet1x text-xs rounded-full px-3 py-1`}>
                    <p>{priority || "Medium"}</p>
                </div>
            </div>
            <div className=''>
                <p className={`text-brandSec500 font-avenirMedium text-lg`}>{taskName || "Demo task for card"}</p>
                <p className={`text-brandSec500/50 font-avenirMedium text-sm`}>{project || "Project Name"}</p>
                <div className='flex items-center gap-2 py-3'>
                    <div className={`bg-brandLightBlue1x text-brandBlue1x text-xs rounded-full px-3 py-1`}>
                        <p>{priority || "Design"}</p>
                    </div>
                    <div className={`bg-brandPeach1x text-brandRed3x text-xs rounded-full px-3 py-1`}>
                        <p>{priority || "Arts"}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TaskCard