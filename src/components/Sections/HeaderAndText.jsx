import React from 'react'
import ButtonPrimaryIcon from '../Buttons/ButtonPrimaryIcon'

const HeaderAndText = ({header, subHeader, textColor, hasNoButton, buttonText, bgColor, btnTextColor, handleClick}) => {
     
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 justify-between w-full`}>
        <div className={`flex flex-col gap-2 ${textColor ? textColor : ""}`}>
            <h1 className={`font-avenirHeavy text-2xl capitalize`}>{header || `Header Test`}</h1>
            <p className={`capitalize--first`}>{subHeader || "Let's finish your task today!"}</p>
        </div>
       <div className={`w-fit self-end`}>
          {
            hasNoButton
            ||
            <ButtonPrimaryIcon handleClick={handleClick} textColor={btnTextColor} bgColor={bgColor || "bg-brandSec500"} text={buttonText || "New Task"} />
          }
       </div>
    </div>
  )
}

export default HeaderAndText