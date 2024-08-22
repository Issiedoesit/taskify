import React, { useState } from 'react'

const MessageListTemplate = ({length}) => {

    const [rowLength, setRowLength] = useState(length || 10 )

    const fauxArray = Array.from({ length: rowLength }, (_, index) => index + 1);

  return (
    <div className='py-6'>
        {
            fauxArray.map((i)=>{
                return <div className='py-4 px-2 flex flex-row gap-4'>
                    <div className='w-12 min-w-12 aspect-square h-12 rounded-full skeleton--white'></div>
                    <div className='flex flex-col gap-4 w-full'>
                        <div className={`w-40 rounded-ten h-5 skeleton--white`}></div>
                        <div className={`w-eightyPercent min-w-60 rounded-ten h-2 skeleton--white`}></div>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default MessageListTemplate