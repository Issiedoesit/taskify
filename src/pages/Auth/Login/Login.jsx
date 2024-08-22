import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import axios from 'axios'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import AuthFormWrap from '../Widgets/AuthFormWrap'
import AuthPassword from '../Widgets/AuthPassword'
import PhoneInput from '../../../components/Form/PhoneInput'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import useDocTitle from '../../../hooks/useDocTitle'
import AuthTemplate from '../../../components/Wraps/AuthTemplate'
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'

import 'react-toastify/dist/ReactToastify.css';
import AuthInput from '../Widgets/AuthInput'



YupPassword(Yup)



const Login = () => {
    
  useDocTitle('Taskify - Login')


  const [minimumEight, setMinimumEight] = useState(0);
  const [oneUpper, setOneUpper] = useState(0);
  const [oneLower, setOneLower] = useState(0);
  const [oneNumber, setOneNumber] = useState(0);
  const [submitting, setSubmitting] = useState(false)
  const [identifier, setIdentifier] = useState("phone")
  const location = useLocation()
  const navigate = useNavigate()
  const returnURL = location.state

  
  const formik = useFormik({
    initialValues:{
        phone:"",
        password:"",
        email:""
    },

    validationSchema:Yup.object({
        phone: Yup
            .string()
            .required('Phone number required')
            .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
              const formattedPhoneNumber = useFormatPhoneTest(value);
              return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),
          email: Yup
          .string()
          .email('Invalid email address')
          .required('Email Required'),
        password: Yup
            .string()
            .required('Password Required')
            .min(8, 'Password must be up to eight (8) characters')
            .minLowercase(1, 'Password must contain at least 1 lower case letter')
            .minUppercase(1, 'Password must contain at least 1 upper case letter')
            .minNumbers(1, 'Password must contain at least 1 number')
            // .minSymbols(1, 'Password must contain at least 1 special character')
            
    })  
  })

  

  const handleLogin = (e) => {
    if(identifier == "phone" ? formik.errors.phone : formik.errors.email || formik.errors.password){
        // console.log(formik.errors)
      return
    }

    setSubmitting(true)
    try {

      const body = {
        "identifier": formik.values[identifier == "phone" ? "phone" : "email"],
        "password": formik.values.password,
      }

    //   console.log("body => ", body)

      axios.post(`${import.meta.env.VITE_BASEURL}/auth/login`, body)
      .then((res) => {
        // console.log("Login => ", res)
        // console.log("Login data => ", res?.data)
        if(res?.data?.status !== "success" && res?.data?.responseCode !== "00" && res?.data?.message) {
          
          toast.error(res?.data?.message,{
            autoClose:2500
          })
          setSubmitting(false)


        } else if(res?.data?.status == "success" && res?.data?.responseCode == "00" && res?.data?.message) {

            // console.log(res?.data?.data?.token)
            // console.log(res?.data?.data?.user)

            Cookies.set("token", res?.data?.data?.token || "", {expires:1})
            Cookies.set("user", JSON.stringify(res?.data?.data?.user) || "", {expires:1})
          // Store the data in local storage
        //   localStorage.setItem('taskify_userData', JSON.stringify(res?.data?.data?.data));

            // console.log(JSON.parse(Cookies.get("user")))
        

          // navigate to dashboard
          setTimeout(() => {
            navigate(returnURL || "")
          }, 2000);

          toast.success("Logged in successfully. Redirecting ...", {
            autoClose:2500
          })
          setSubmitting(false)


        }else{

          // console.log(res);
          toast.error("Error logging in, Try again later", {
            autoClose:2500
          })
          setSubmitting(false)

        }
        setSubmitting(false)
      })
      .catch(err => {
        console.error(err)
        setSubmitting(false)
    })

    } catch (error) {
        setSubmitting(false)
      console.error(error);
    }
  }


  useEffect(() => {
    if (formik.values.password.length >= 8) {
      setMinimumEight(1);
    }else{
      setMinimumEight(0);
    }
    if (/[A-Z]/.test(formik.values.password)) {
      setOneUpper(1);
    }else{
      setOneUpper(0)
    }
    if (/[a-z]/.test(formik.values.password)) {
      setOneLower(1);
    }else{
      setOneLower(0)
    }
    if (/[0-9]/.test(formik.values.password)) {
      setOneNumber(1);
    }else{
      setOneNumber(0)
    }
  }, [formik.values.password]);
  

  const handlePhoneInputChange = (e, handleChange) => {
    const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
    handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
  }
  
  return (
    <AuthTemplate altActionLink={'/auth/register'}>
      <AuthFormWrap handleSubmit={formik.handleSubmit}>

        <div className='flex flex-col gap-4'>
            {
                identifier == "phone"
                ?
                <fieldset className='gap-2.5 flex flex-col col-span-1'>
                <label htmlFor="phone" className='text-black font-avenirMedium text-lg'>Phone</label>
                <PhoneInput maxLength={15} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-3 text-sm bg-transparent autofill:bg-transparent rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
                {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>}
                </fieldset>
                :
                <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputLabel={'Email address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
            }
            <button type='button' onClick={()=>setIdentifier(identifier == "phone" ? "email" : "phone")} className={`font-avenirMedium text-brandBlue1x text-right`}>
                Use {identifier == "phone" ? "email" : "phone"} instead
            </button>
        </div>

        


        <div>



          <AuthPassword paddingY={'py-3'} eyeIcon handleChange={formik.handleChange} inputValue={formik.values.password} fieldError={formik.touched.password && formik.errors.password} handleBlur={formik.handleBlur} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputName={'password'} inputId={'password'} />
          {/* <div className={'pt-4'}>
            {(formik.touched.password && formik.errors.password) && <p className="text-xs text-brandRed1x pb-4">{formik.errors.password}</p>}
            <div className={`bg-brandGray42x h-2 w-full`}>
              <div className={`transition-all duration-500 ease-in-out ${strength == 1 && 'bg-brandRed1x'} ${strength == 2 && 'bg-brandOrange2x'} ${strength == 3 && 'bg-brandGreen1x/50'} ${strength == 4 && 'bg-brandGreen1x'} h-full`} style={{width:`calc((${strength}/4) * 100%)`}} >
              </div>
            </div>
          </div> */}
        </div>
        <fieldset className='flex items-center gap-3'>
          <input type="checkbox" name="staySignedIn" id="staySignedIn" className='checked:accent-brandBlue1x hover:accent-brandBlue1x/70' />
          <label htmlFor="staySignedIn" className='font-avenirMedium text-sm cursor-pointer'>Stay signed in for a week</label>
        </fieldset>
        
        <div>
          <ButtonPrimary handleClick={handleLogin} bgColor={"bg-brandBlue1x"} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Continue'} type={'button'} width={'w-full'} paddingY={'py-3'}  />
        </div>
        <div className={`text-center`}>
            <p className={`font-avenirMedium`}>Don't have an account? <NavLink to={'/auth/register'} className={`text-brandBlue1x underline underline-offset-2`}>Sign Up </NavLink>
            </p>
        </div>
      </AuthFormWrap>
      <ToastContainer />
    </AuthTemplate>
  )
}

export default Login