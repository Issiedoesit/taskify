import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/media/logos/TaskifyFullIcon.png'


const AuthTemplate = ({id, children, altAction, altActionCentered, altActionText, altActionLinkText, altActionLink}) => {
  return (
    <div id={id} className='bg-brandLightBlue2x min-h-screen px-4 sm:px-8 md:px-10'>
        <div className='sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg mx-auto py-32'>
            <div className='pb-9'>
                <img src={Logo} alt='logo' className='xs:w-28 w-32' />
            </div>

            {children}

            {altAction
            ?
            <div className={`${altActionCentered ? 'text-center' : 'text-left'} pt-9 pb-5`}>
                <p className={`font-avenirMedium`}>Don't have an account? <NavLink to={altActionLink || '/auth/register'} className={`text-brandBlue1x underline underline-offset-2`}>Sign up</NavLink></p>
            </div>
            :
            ''
            }


        </div>
    </div>
  )
}

export default AuthTemplate