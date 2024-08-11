import React, { useRef, useState } from 'react'
import Nav from '../Navigation/Nav'
import Logo from "../../assets/media/logos/TaskifyIcon.png"
import { NavLink } from 'react-router-dom'
import UserImgAndNotif from '../Sections/UserImgAndNotif'
import useGetUser from '../../utils/useGetUser'
import useScrollDirection from '../../hooks/useScrollDirection'

const DashTemplate = ({ children }) => {

  const menuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useGetUser()

  const {scrollUp} = useScrollDirection()

  return (
    <div className='z-20 flex w-full bg-brandDashGray1x min-h-full'>
      <Nav menuRef={menuRef} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='z-20 w-full'>
        <div className={`h-60px ${scrollUp && "sticky top-0 left-0 bg-brandDashGray1x shadow-md"}  xl:hidden border-b-0.5 border-b-brandGray2x`}>
          <div className='flex xl:hidden h-full items-center justify-between gap-10 px-8 md:px-10'>
            <NavLink to="/" className=''>
              <img src={Logo} alt='logo' className='w-7' />
            </NavLink>
            <div className={`flex flex-row gap-3 items-center`}>
              <div className={`block sm:hidden`}>
                <UserImgAndNotif user={user} />

              </div>
              <button ref={menuRef} id='menu' onClick={() => setIsOpen(prev => !prev)} aria-label='Open Menu' className='flex gap-1 flex-col'>
                <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${isOpen ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten  ${isOpen ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
                <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${isOpen ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
              </button>
            </div>

          </div>
        </div>
        <div className={`pb-48 lg:pb-24 pt-8 px-8 md:px-10 overflow-y-auto h-full min-h-full w-full flex flex-col max-w-full overflow-x-hidden`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashTemplate