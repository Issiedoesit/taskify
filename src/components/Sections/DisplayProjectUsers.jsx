import axios from 'axios'
import React, { useState, useMemo } from 'react'
import useGetUser from '../../utils/useGetUser'
import useSWR from 'swr'
import PageLoaderNoNav from '../Loaders/PageLoaderNoNav'
import UserImg from "./UserImg"

const DisplayProjectUsers = ({ selectId, setSelectId, height, useInProject, projectMembers, users }) => {
    const { token } = useGetUser();
    const [searchTerm, setSearchTerm] = useState(''); 

    
    const allUsersData = users || [];

    // const projectMemberIds = new Set(projectMembers?.map(member => member.user.user_id));

    // // Update allUsersData to include the InProject flag
    // const updatedUsers = allUsersData?.map(user => ({
    //     ...user,
    //     InProject: projectMemberIds.has(user.user_id)
    // }));

    // altdata sample =     {
    //     assignedAt: "2024-08-12T21:35:30.608Z",
    //     entry_id: "1dd4ae8a-f447-4f5d-a622-f9dbd7eb4a65",
    //     role: "admin",
    //     user: {
    //         email: "isyekwe@gmail.com",
    //         first_name: "isioma",
    //         last_name: "ekwemuka",
    //         phone: "+2348163135093",
    //         profile_photo: "https://res.cloudinary.com/dp1cc2ste/image/upload/v1723396944/TMS/m9itjydtyh2ssspg0xvn.png",
    //         user_id: "72497595-1175-4cca-aba1-cb658faf6b7a"
    //     }
    // },

    // normal data sample ={
    //     email: "tuoyo1456@gmail.com",
    //     first_name: "test",
    //     last_name: "test",
    //     phone: "+2348136603428",
    //     profile_photo: null,
    //     user_id: "6db97edf-dfa6-4e60-9826-e1886b595e08"
    // }

    

    // console.log("updatedUsers =>", updatedUsers)



    // console.log("allUsersData => ", allUsersData)

    const currentData = useInProject ? updatedUsers : allUsersData

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) {
            return currentData;
        }
        return currentData?.filter(item =>
            item?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allUsersData]);

    if (!users) return <PageLoaderNoNav padding={"py-24"} height={"h-full"} />

    return (
        <div className={`flex flex-col gap-4 py-4 relative ${height ? height : "h-full"}`}>
            <fieldset className='sticky top-0 left-0 z-20 bg-white'>
                <input
                    type="search"
                    name="searchUsers"
                    id="searchUsers"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search for user'
                    className={`w-full px-4 py-2 bg-brandGray11x/20 rounded-ten`}
                />
            </fieldset>
        
            {filteredData?.map((user, idx) => {
                return  <div
                    key={idx}
                    onClick={() => setSelectId(user.user.user_id)}
                    className={`${(useInProject && user.user.InProject) ? "pointer-events-none" : ""} ${selectId === user.user.user_id ? "bg-brandBlue1x/50" : "hover:bg-brandBlue1x/20"} transition-all duration-300 ease-in-out rounded-ten p-1 flex flex-row items-center gap-4`}
                >
                    <UserImg width={"w-12"} src={user.user.profile_photo} alt={`${user.user.first_name} ${user.user.last_name}`} />
                    <p className='capitalize'>{`${user.user.first_name} ${user.user.last_name}`} 
                    {
                        (useInProject && user.user.InProject)
                        &&
                        <span className='text-brandGreen4x text-xxs pl-1'>Added</span>
                    }
                    </p>
                </div>
            })}
        </div>
    );
};

export default DisplayProjectUsers;
