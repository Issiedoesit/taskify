import React, {useEffect, useRef, useState} from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/media/logos/TaskifyFullIcon.png'
import useComponentVisible from '../../hooks/useComponentVisible'


const AltAuthTemplate = ({id, children, tip, altAction, altActionCentered, altActionText, altActionLinkText, altActionLink}) => {
    const [toggleInfo, setToggleInfo] = useState(false)
    const [width, setWidth] = useState(document.body.clientWidth)
    const infoRef = useRef(null)

    useComponentVisible('infoRef', '#toggleInfo', ()=>setToggleInfo(false))

    useEffect(() => {
        const body = document.querySelector('body');
        const scrollPosition = window.pageYOffset;
        if (toggleInfo) {
          body.style.overflow = 'hidden';
          body.style.height = '100vh';
        } else {
          body.style.overflow = '';
          body.style.height = '';
        }
        window.scrollTo(0, scrollPosition);
      }, [toggleInfo]);

      const updateSize = () => {
        setWidth(document.body.clientWidth)
        width >= 1024 && setToggleInfo(false)
      }

      useEffect(() => {
        window.addEventListener('resize', ()=>updateSize())
      
        return () => {
            window.removeEventListener('resize', ()=>updateSize())
        }
      }, [])

     
      

    return (
    <div id={id} className='bg-brandLightBlue2x min-h-screen px-4 sm:px-8 md:px-10 lg:pl-20 flex flex-col lg:flex-row gap-8 lg:gap-16 py-24'>
        <div className='sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg'>
            <div className='pb-9'>
                <img src={Logo} alt='logo' className='xs:w-28 w-32 ml-0' />
            </div>
            {/* {width} */}
            <div id='info' className={`w-full lg:w-eightyPercent z-20 py-10 fixed bottom-0 left-0 ${toggleInfo ? 'translate-y-0' : 'translate-y-hundredPercent'} border-2 border-brandGray2x lg:border-0 trans-all-500-ease-in-out lg:transition-none lg:translate-y-0 rounded-t-thirty px-10 lg:px-0 lg:rounded-none shadow-2xl lg:shadow-none lg:static bg-white lg:bg-transparent`}>
                <div className='flex gap-3 py-4'>
                    <svg className='min-w-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_15318_26725)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5H0ZM11.3152 17.636L18.224 8.9992L16.976 8.0008L11.0848 15.3624L6.912 11.8856L5.888 13.1144L11.3152 17.6376V17.636Z" fill="#2A2AB3"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_15318_26725">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div>
                        <h2 className='text-xl font-avenirHeavy text-brandBlack1x'>Streamline Your Workflow</h2>
                        <p className='font-avenirBook text-brandGray6x text-sm lg:text-base'>Get started quickly with intuitive task management and real-time collaboration features.</p>
                    </div>
                </div>
                <div className='flex gap-3 py-4'>
                    <svg className='min-w-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_15318_26725)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5H0ZM11.3152 17.636L18.224 8.9992L16.976 8.0008L11.0848 15.3624L6.912 11.8856L5.888 13.1144L11.3152 17.6376V17.636Z" fill="#2A2AB3"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_15318_26725">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div>
                        <h2 className='text-xl font-avenirHeavy text-brandBlack1x'>Flexible Project Structures</h2>
                        <p className='font-avenirBook text-brandGray6x text-sm lg:text-base'>Track milestones, manage resources, and adjust plans seamlessly.</p>
                    </div>
                </div>
                <div className='flex gap-3 py-4'>
                    <svg className='min-w-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_15318_26725)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5H0ZM11.3152 17.636L18.224 8.9992L16.976 8.0008L11.0848 15.3624L6.912 11.8856L5.888 13.1144L11.3152 17.6376V17.636Z" fill="#2A2AB3"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_15318_26725">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div>
                        <h2 className='text-xl font-avenirHeavy text-brandBlack1x'>Empower Your Team</h2>
                        <p className='font-avenirBook text-brandGray6x text-sm lg:text-base'>Taskify helps teams of all sizes stay organized, on track, and efficient.</p>
                    </div>
                </div>
            </div>

            {altAction
            ?
            <div className={`${altActionCentered ? 'text-center' : 'text-left'} pt-9 pb-5`}>
                <p className={`font-avenirMedium`}>Don't have an account? <NavLink to={altActionLink || '/auth/join'} className={`text-brandBlue1x underline underline-offset-2`}>Sign up</NavLink></p>
            </div>
            :
            ''
            }

        </div>
        <div className='w-full lg:w-fortyPercent'>
            {children}
        </div>
    </div>
  )
}

export default AltAuthTemplate