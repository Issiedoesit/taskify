import React from 'react'

const CardWrap = ({id, bgColor, textColor, padding, width, children, colSpan, flex}) => {
  return (
    <div id={id} className={`rounded-ten ${width ? width : "w-fit"} ${flex ? flex : "flex flex-col gap-4"} ${colSpan ? colSpan : "col-span-1"} ${padding ? padding : "p-5"} ${textColor ? textColor : "text-white"} ${bgColor ? bgColor : "bg-brandSec500"} `}>
        {children}
    </div>
  )
}

export default CardWrap