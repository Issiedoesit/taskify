import React, { useRef } from 'react'
import Logo from '../../assets/media/logos/TaskifyFullIcon.png'
import { NavLink, useLocation } from 'react-router-dom'
import useGetUser from '../../utils/useGetUser'
import NavData from '../../data/NavData'
import useComponentVisible from '../../hooks/useComponentVisible'

const Nav = ({ isOpen, setIsOpen, menuRef }) => {

  const navRef = useRef(false)

  const location = useLocation();


  const handleMobileNav = () => {
    setIsOpen(false)
  }

  useComponentVisible(navRef, menuRef, () => handleMobileNav())

  // useLayoutEffect(() => {
  //   handleMobileNav()
  // }, [location])

  const { logout } = useGetUser()



  return (
    <nav ref={navRef} id='nav' className={`fixed top-0 left-0 z-50 ${isOpen ? "" : '-translate-x-oneFiftyPercent'} bg-white shadow-md xl:-translate-x-0 transition-transform duration-500 ease-in-out xl:static xs:w-full w-72 h-full xl:h-screen max-h-screen`}>
      <div className='transition-transform duration-500 ease-in-out bg-white h-full max-h-screen font-avenirRegular max-w-sm flex flex-col w-full'>
        <NavLink to="/" className={`xs:px-4 px-9 pt-10`}>
          <img src={Logo} alt='logo' className='w-24' />
        </NavLink>
        <div className='xs:fixed xs:top-10 xs:right-4 xs:block hidden xs:z-70'>
          <button id='closeMobileNav' aria-label='close menu' onClick={handleMobileNav} className={`h-full z-70 ${isOpen && ''} transition-all duration-300 space-y-1 xl:hidden group`}>
            <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${isOpen ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
            <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten  ${isOpen ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
            <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${isOpen ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
            <span className="sr-only">Menu</span>
          </button>
        </div>
        <div className={`h-full flex flex-col justify-between pb-5 xs:pt-5 pt-8 overflow-y-auto xs:text-xs `}>
          <div className='flex flex-col xs:gap-2 gap-2 h-fit xs:pt-5 pt-10 xs:px-2 px-4 overflow-y-auto'>
            {NavData.map((item, idx) => {
              return <NavLink exact="true" key={idx} end={item.end && 'true'} to={item.link} className={({ isActive }) => (isActive ? 'text-brandBlue1x bg-brandBlue1x/30 font-avenirMedium nav--shadow rounded-five flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-eightPixel w-ninetyPercent capitalize' : 'capitalize hover:bg-brandBlue1x/20 text-brandGray1x/60 rounded-five flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-eightPixel w-ninetyPercent transition ease-in-out duration-400 font-avenirRoman')}>
                {location.pathname == item.link ? item.activeIcon : item.icon}
                <p className='whitespace-nowrap text-md'>{item.pageName}</p>
              </NavLink>
            })}
          </div>
        </div>

        {/* logout */}
        <div className={`border-t-1.5 py-2`}>
          <button onClick={logout} className={`capitalize text-md hover:bg-white/60 text-brandGray1x/60 rounded-five flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-eightPixel w-ninetyPercent transition ease-in-out duration-400 font-avenirRoman`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#292D3299" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 12H3.62" stroke="#292D3299" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#292D3299" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            Logout
          </button>
        </div>


        {/* <ProfileMenu /> */}

      </div>
    </nav>
  )
}

export default Nav