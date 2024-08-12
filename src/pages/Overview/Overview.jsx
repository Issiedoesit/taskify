import React from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import CardWrap from '../../components/Wraps/CardWrap'
import HeaderAndText from '../../components/Sections/HeaderAndText'
import TaskCardWrap from '../../components/Wraps/TaskCardWrap'

const Overview = () => {
    return (
        <DashTemplate>
            <UserImgHeader />
            <div className={`h-full pt-10 flex flex-col gap-10`}>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-8 lg:gap-10`}>
                    <CardWrap width={"w-full"}>
                        <p className={`text-xl text-white font-avenirMedium`}>Running Task</p>
                        <div className='text-4xl font-avenirHeavy'>
                            <p>65</p>
                        </div>
                        <div className='pt-4 flex flex-row items-center gap-6'>
                            <div className={`w-32 rounded-full bg-brandBlue1x aspect-square`}>

                            </div>
                            <div className={`flex flex-col gap-1 text-left`}>
                                <p className={`text-2xl font-avenirHeavy`}>100</p>
                                <p className='text-lg'>Task</p>
                            </div>
                        </div>
                    </CardWrap>
                    <CardWrap width={"w-full"} colSpan={"col-span-2"} bgColor={"bg-brandDashGray2x"} textColor={"text-brandSec500"} >
                        <div className='flex flex-row gap-2 justify-between'>
                            <p className={`text-xl font-avenirMedium`}>Activity</p>
                            <button className={`font-avenirMedium flex flex-row gap-2 items-center`}>
                                This Week
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.95999 4.47501L6.69999 7.73501C6.31499 8.12001 5.68499 8.12001 5.29999 7.73501L2.03999 4.47501" stroke="#54577A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={`bg-white rounded-ten p-4 h-60 w-full`}>

                        </div>
                    </CardWrap>
                </div>

                <div className={`flex flex-col gap-8 w-full`}>
                    <HeaderAndText header={"Current Tasks"} subHeader={"A glimpse into your tasks"} />

                    <div className={`flex flex-row gap-8 w-full`}>
                        <div className={`w-full grid md:grid-cols-2 gap-y-8 md:gap-x-8`}>
                            <TaskCardWrap />
                            <TaskCardWrap />
                        </div>
                    </div>
                </div>

            </div>
        </DashTemplate>
    )
}

export default Overview