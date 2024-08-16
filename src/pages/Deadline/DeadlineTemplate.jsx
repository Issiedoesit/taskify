import React, { useState } from 'react'

const DeadlineTemplate = ({bgColor, length}) => {

    const [rowLength, setRowLength] = useState(length || 3)

    const fauxArray = Array.from({ length: rowLength }, (_, index) => index + 1);



  return (
    <div className={` ${bgColor ? bgColor : "bg-white"} rounded-ten w-full px-4 py-4 flex flex-col gap-4`}>
        <div className={`h-8 w-28 skeleton--white rounded-ten`}></div>
        <div className={`flex flex-col gap-10`}>
            <div className='w-full overflow-x-auto flex flex-col gap-8'>
                {
                    fauxArray.map((faux, idx) => {
                        return <div key={idx} className={`flex flex-row gap-10 justify-between items-center`}>
                        <div className={`flex flex-row gap-4 justify-between items-center`}>
                            <div className='skeleton--white rounded-sm h-4 w-4'></div>
                            <div className='skeleton--white rounded-ten h-6 w-40'></div>
                        </div>
                        <div className='skeleton--white rounded-ten h-6 w-32'></div>
                        <div className='skeleton--white rounded-ten h-6 w-32'></div>
                        <div className={`flex flex-row gap-4 justify-between items-center`}>
                            <div className='skeleton--white rounded-full aspect-square h-8 w-8'></div>
                            <div className='skeleton--white rounded-ten h-6 w-32'></div>
                        </div>
                    </div>
                    })
                }
            </div>

        </div>

    </div>
  )
}

export default DeadlineTemplate