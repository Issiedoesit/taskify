import axios from 'axios'
import React from 'react'
import useGetUser from '../../utils/useGetUser'
import useSWR from 'swr'
import PageLoaderNoNav from '../Loaders/PageLoaderNoNav'

const DisplayAllUsers = ({selectId, setSelectId, height}) => {
    const {token} = useGetUser()

    const fetcher = async (url) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    const { data: allUsers, error, isLoading, mutate } = useSWR(import.meta.env.VITE_BASEURL + `/user/all`, fetcher, { refreshInterval: 1000 })


    // !isLoading && allUsers?.data && console.log(allUsers)
    !isLoading && allUsers?.data && console.log(allUsers.data)

    const allUsersData = allUsers?.data?.data || []
    console.log(allUsersData)

    if (isLoading) return <PageLoaderNoNav padding={"py-24"} height={"h-full"} />

  return (
    <div className={`flex flex-col gap-4 ${height ? height : "h-full"}`}>
        
        {
            allUsersData?.map((user, idx) => {
                return <div onClick={()=>setSelectId(user.user_id)} key={idx} className={`${selectId == user.user_id ? "bg-brandBlue1x/50" : "hover:bg-brandBlue1x/20"} transition-all duration-300 ease-in-out rounded-ten p-1 flex flex-row items-center gap-4`}>
                    <img src={user.profile_photo} className='skeleton--white rounded-full w-12 aspect-square object-cover' />
                    <p className='capitalize'>{`${user.first_name} ${user.last_name}`}</p>
                </div>
            })
        }
    </div>
  )
}

export default DisplayAllUsers