import axios from 'axios'
import React, { useState, useMemo } from 'react'
import useGetUser from '../../utils/useGetUser'
import useSWR from 'swr'
import PageLoaderNoNav from '../Loaders/PageLoaderNoNav'

const DisplayAllUsers = ({ selectId, setSelectId, height }) => {
    const { token } = useGetUser();
    const [searchTerm, setSearchTerm] = useState(''); 

    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } });

    const { data: allUsers, error, isLoading } = useSWR(import.meta.env.VITE_BASEURL + `/user/all`, fetcher, { refreshInterval: 200 });

    const allUsersData = allUsers?.data?.data || [];

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) {
            return allUsersData;
        }
        return allUsersData?.filter(item =>
            item?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allUsersData]);

    if (isLoading) return <PageLoaderNoNav padding={"py-24"} height={"h-full"} />

    return (
        <div className={`flex flex-col gap-4 py-4 relative ${height ? height : "h-full"}`}>
            <fieldset>
                <input
                    type="search"
                    name="searchUsers"
                    id="searchUsers"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search for user'
                    className={`w-full px-4 py-2 sticky top-0 left-0 bg-brandGray11x/20 rounded-ten`}
                />
            </fieldset>
            {filteredData?.map((user, idx) => (
                <div
                    key={idx}
                    onClick={() => setSelectId(user.user_id)}
                    className={`${selectId === user.user_id ? "bg-brandBlue1x/50" : "hover:bg-brandBlue1x/20"} transition-all duration-300 ease-in-out rounded-ten p-1 flex flex-row items-center gap-4`}
                >
                    <img src={user.profile_photo} className='skeleton--white rounded-full w-12 aspect-square object-cover' alt={`${user.first_name} ${user.last_name}`} />
                    <p className='capitalize'>{`${user.first_name} ${user.last_name}`}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayAllUsers;
