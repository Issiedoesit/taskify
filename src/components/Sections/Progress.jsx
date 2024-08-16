import React from 'react'

const Progress = ({ completed, total, percent }) => {
    return (
        <div className={`py-4`}>
            <div className={`flex flex-row text-sm font-avenirLight text-brandGray1x gap-8 justify-between pb-2`}>
                <p>Progress</p>
                <p>{`${percent ? percent : "0"}%`}</p>
            </div>
            <div className={`w-full h-3 rounded-ten bg-brandBlue1x/20`}>
                <div style={{ width: `${percent ? percent : "0"}%` }} className={`h-full bg-brandBlue1x rounded-ten relative`}>
                    <div className={`absolute rounded-full ring-white ring-4 shadow-md h-full aspect-square -translate-y-fiftyPercent top-fiftyPercent -right-2 bg-brandBlue1x`}>

                    </div>
                </div>
            </div>
            <div className='text-right text-xs font-avenirLight text-brandGray1x pt-2 '>
                <p>{completed || 0} / {total || 0} Tasks</p>
            </div>
        </div>
    )
}

export default Progress