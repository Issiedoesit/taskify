import React from 'react'
import DashTemplate from '../../components/Wraps/DashTemplate'
import UserImgHeader from '../../components/Sections/UserImgHeader'
import HeaderAndText from '../../components/Sections/HeaderAndText'
import useDocTitle from '../../hooks/useDocTitle'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import Profile from './Profile'

const Settings = () => {
  useDocTitle('Taskify - Settings')

  const formik = useFormik({
    initialValues:{
      profile_photo:""
    }
  })

  // <fieldset className='flex flex-col mx-auto w-fit items-center gap-3'>
  //       {
  //                   user?.profile_photo || photo
  //                   ?
  //                   <img  className='h-16 w-16 rounded-full aspect-square'  src={photo ? !(photo instanceof File)? photo : URL.createObjectURL(photo) : user?.profile_photo} />
  //                   :
  //                   <div className={`p-2 rounded-full bg-brandBlue1x/20 aspect-square flex item-center justify-center w-fit`}>
  //                   <svg className={`h-10 w-10 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                     <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  //                     <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  //                   </svg>
  //                 </div>
  //               }
  //       <label htmlFor={"profile_photo"} className='w-fit cursor-pointer mx-auto flex flex-col gap-3 items-center justify-center'>
  //       <div className='text-xs rounded-fifty border-2 border-black py-2 px-4' >
  //         <span>{!(photo) ? ('Change Profile photo') : photo?.name}</span>
  //       </div>
  //     </label>
  //     <input readOnly={submitting} type='file' name='profile_photo' id={"profile_photo"} onChange={(e)=>setPhoto(e.target.files[0])} onBlur={formik.handleBlur} className='' accept=".jpg,.jpeg,.png,.gif,image/*"  />

  //     {formik.errors["profile_photo"] && formik.touched.profile_photo && photo
  //       ?
  //       <p className={`text-xs text-right text-brandRed1x py-2`}>*** {formik.errors.profile_photo}</p>
  //       :
  //       ""}
  //       </fieldset>

  return (
   <>
     <DashTemplate>
        <UserImgHeader subHeader={"Manage your settings!"} />
        <div className={`py-10 flex flex-col gap-8`}>
           <HeaderAndText  hasNoButton subHeader={" "} header={"Profile"}/>

           <Profile />

        </div>
    </DashTemplate>
    <ToastContainer />
   </>
  )
}

export default Settings