import React from 'react'

const ModalInner = ({ title, children, maxWidth, height, formHeight, formTopPad, stickyHeader, headerPosition }) => {
    return (
        <div className={`bg-white ${maxWidth ? maxWidth : "max-w-lg"} relative m-auto rounded-ten pb-8 px-5 md:pb-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent ${height ? height : "h-fit"}`}>
            <div className={`${headerPosition ? headerPosition : "text-center"} ${stickyHeader && "sticky top-0 left-0"}  bg-white pt-8 z-20`}>
                <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>{title || "Create an App"}</h4>
            </div>
            <form action="" method='post' className={`${formHeight ? formHeight : ""} ${formTopPad ? formTopPad : "pt-10"} flex flex-col gap-x-10 gap-y-5`}>
                {children}
            </form>
        </div>
    )
}

export default ModalInner