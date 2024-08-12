import React from 'react'
import dummyAvatar from "../../../assets/media/avatars/avatar-5.png"
import {FaChevronRight} from "react-icons/fa"
import LinkPrimaryIcon from '../../../components/Links/LinkPrimaryIcon'
import formatDateMonthText from '../../../utils/formatDateMonthText'

const ProjectRow = ({projectId, avatar, name, creator, role, users, dateCreated, userDetail, updatedAt, amount, currency}) => {
  return (
    <tr id={projectId} className='font-avenirRegular text-sm even:bg-brandBlue1x/10 project-row'>
        <td className="py-4 px-4 whitespace-nowrap">
            <input type="checkbox" name="project-row-check" id="projectRowCheck" className="accent-brandSec500 focus:outline-none focus:ring-none"  />
        </td>
        <td className="capitalize py-4 px-4 whitespace-nowrap">
            <div className='flex items-center gap-3 pr-4'>
                <img src={avatar || dummyAvatar} alt={name} className={'w-8 h-8 min-w-8 aspect-square rounded-full skeleton'} />
                <p className='text-brandBlue1x'>{name || 'Jim Create'}</p>
            </div>
        </td>
        {/* <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
            <p>{email || 'tom@pandascrow.io'}</p>
            { verification 
                ?
                <>
                    {verification == 1 && <p className='px-2.5 py-1 text-brandGreen1x bg-brandLightGreen1x rounded-five capitalize w-fit'>{'Verified Customer'}</p>}
                    {verification == 0 && <p className='px-2.5 py-1 text-brandYellow1x bg-brandLightYellow1x rounded-five capitalize w-fit'>{'Under Review'}</p>}
                </>
                : <p className='px-2.5 py-1 text-brandRed2x bg-brandLightRed1x rounded-five capitalize w-fit'>{'Unverified Customer'}</p>
            }
        </td> */}
         <td className="capitalize py-4 px-4 whitespace-nowrap">
            <div className='flex items-center gap-3 pr-4'>
                <img src={creator?.profile_photo || dummyAvatar} alt={name} className={'w-8 h-8 min-w-8 aspect-square rounded-full skeleton'} />
                <p className=''>{creator ?`${creator?.first_name} ${creator?.last_name}` : 'Jim Create'}</p>
            </div>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className={`capitalize text-sm ${role == "admin" ? "text-brandGreen3x" : "text-brandBlue1x"}`}>{role || 'Member'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{dateCreated || 'May 20, 1998'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{formatDateMonthText(userDetail?.assignedAt) || 'May 24, 1998'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{updatedAt || 'May 24, 1998'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap flex justify-center">
            <p className=''>{users || 0}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <LinkPrimaryIcon icon={<FaChevronRight />} flexDirection={"flex-row-reverse"} bgColor={"bg-brandSec500"} text={"View "} textWrap link={`./${projectId}`} />
        </td>
        
    </tr>
  )
}

export default ProjectRow