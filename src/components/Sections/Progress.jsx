import React from 'react'

const Progress = ({ current }) => {
    return (
        <div className={`py-4`}>
            <div className={`flex flex-row text-sm font-avenirLight text-brandGray1x gap-8 justify-between pb-2`}>
                <p>Progress</p>
                <p>{`${current ? current : "80"}%`}</p>
            </div>
            <div className={`w-full h-3 rounded-ten bg-brandBlue1x/20`}>
                <div style={{ width: `${current ? current : "80"}%` }} className={`h-full bg-brandBlue1x rounded-ten relative`}>
                    <div className={`absolute rounded-full ring-white ring-4 shadow-md h-full aspect-square -translate-y-fiftyPercent top-fiftyPercent -right-2 bg-brandBlue1x`}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress