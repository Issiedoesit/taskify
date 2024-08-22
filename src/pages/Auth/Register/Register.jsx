import React, { useEffect, useState } from 'react'
import AltAuthTemplate from '../../../components/Wraps/AltAuthTemplate'
import AuthFormWrap from '../Widgets/AuthFormWrap'
import AuthInput from '../Widgets/AuthInput'
import AuthPassword from '../Widgets/AuthPassword'
import AuthSelect from '../Widgets/AuthSelect'
import PhoneInput from '../../../components/Form/PhoneInput'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import YupPassword from 'yup-password'
import useDocTitle from '../../../hooks/useDocTitle'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import { ToastContainer, toast } from 'react-toastify'
import FormFileInput from '../../../components/Form/FormFileInput'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';



YupPassword(Yup)


const Register = () => {

    useDocTitle('Taskify - Register')


    const [submitting, setSubmitting] = useState(false)
    const [minimumEight, setMinimumEight] = useState(0);
    const [oneUpper, setOneUpper] = useState(0);
    const [oneLower, setOneLower] = useState(0);
    const [oneNumber, setOneNumber] = useState(0);

    const formik = useFormik({
        initialValues : {
          firstName:'',
          lastName:'',
          email:'',
          password:'',
          profile_photo:'',
          phone:''
        },
        validationSchema : Yup.object({
          firstName : Yup.string()
            .min(2, 'Firstname should be two or more characters')
            .required('Firstname required'),
          lastName : Yup.string()
            .min(2, 'Lastname should be two or more characters')
            .required('Lastname required'),
          email: Yup
            .string()
            .email('Invalid email address')
            .required('Email Required'),
          password: Yup
            .string()
            .required('Password Required')
            .minLowercase(1, 'Password must contain at least 1 lower case letter')
            .minUppercase(1, 'Password must contain at least 1 upper case letter')
            .minNumbers(1, 'Password must contain at least 1 number')
            // .minSymbols(1, 'Password must contain at least 1 special character'),
            .min(8, 'Password must be up to eight (8) characters'),
            phone: Yup
            .string()
            .required('Phone number required')
            .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
              const formattedPhoneNumber = useFormatPhoneTest(value);
              return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),
            profile_photo : Yup.mixed()
            .nullable()
            .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
                // console.log(value && value.size)
                return value && value.size <= import.meta.env.VITE_MAX_FILE_SIZE;
            })      
        })
      })

      const strength = minimumEight + oneNumber + oneUpper + oneLower
  

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

  const handleSignUp = (e) => {
    e.preventDefault()
    if(formik.errors.firstName || formik.errors.lastName || (formik.values.profile_photo !== "" && formik.errors.profile_photo) || formik.errors.phone ||  formik.errors.email || formik.errors.password){
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('first_name', formik.values.firstName)
    formData.append('last_name', formik.values.lastName)
    formData.append('email', formik.values.email)
    formData.append('password', formik.values.password)
    formData.append('phone', formik.values.phone)
    formData.append('profile_photo', formik.values.profile_photo)


    try {

        // console.log(formik.values);
        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);
        // setSubmitting(false)

        axios.post(`${import.meta.env.VITE_BASEURL}/auth/signup`, formData)
        .then((res)=>{
        //   console.log('signup', res.data);
        //   console.log('signup', res.data.message);
            if(res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message){
                toast.error(res.data.message, {
                    // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                    autoClose: 2500,
                    // hideProgressBar: false,
                    // closeOnClick: true,
                    // pauseOnHover: true,
                    // draggable: true,
                    // progress: undefined,
                  });
                console.log(res.data.message);
                setSubmitting(false)
            }else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                toast.success("Registration successful, Redirecting...", {
                    // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                    autoClose: 2500,
                    // hideProgressBar: false,
                    // closeOnClick: true,
                    // pauseOnHover: true,
                    // draggable: true,
                    // progress: undefined,
                });
                
                
                setTimeout(() => {
                    window.location.href = '/auth/login'
                }, 2000);   
                setSubmitting(false)      
            }

            setSubmitting(false)
            
        })
        .catch((err)=>{
            console.error(err); 
            setSubmitting(false)
        })
        
    } catch (error) {
        setSubmitting(false)
        console.error(error)
    }
  }

    const handlePhoneInputChange = (e, handleChange) => {
        const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
        handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
    }

  return (
    <AltAuthTemplate>
        <AuthFormWrap>
        <div>
            <FormFileInput formik={formik} fileValue={formik.values.profile_photo} fileInputId={"profile_photo"} fileInputName={"profile_photo"} />
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className='w-full md:w-fiftyPercent'>
            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.firstName} fieldError={formik.touched.firstName && formik.errors.firstName} inputLabel={'First name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'firstName'} inputId={'firstName'}  />
          </div>
          <div className='w-full md:w-fiftyPercent'>
            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.lastName} fieldError={formik.touched.lastName && formik.errors.lastName} inputLabel={'Last name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'lastName'} inputId={'lastName'}  />
          </div>
        </div>
        <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputLabel={'Email address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
        <AuthPassword handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.password} fieldError={formik.touched.password && formik.errors.password} inputLabel={'Password'} inputName={'password'} inputId={'password'} paddingY={'py-3'} fontSize={'text-base'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} eyeIcon />
        {(formik.touched.password && formik.errors.password) && <p className="text-xs text-brandRed1x">{formik.errors.password}</p>}
        <div className={`bg-brandGray42x h-2 w-full`}>
          <div className={`transition-all duration-500 ease-in-out ${strength == 1 && 'bg-brandRed1x'} ${strength == 2 && 'bg-brandOrange2x'} ${strength == 3 && 'bg-brandGreen1x/50'} ${strength == 4 && 'bg-brandGreen1x'} h-full`} style={{width:`calc((${strength}/4) * 100%)`}} >
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
         <div className='w-full'>
          <fieldset className='gap-2.5 flex flex-col col-span-1 w-full'>
            <label htmlFor="phone" className='text-black font-avenirMedium text-lg'>Phone</label>
            <PhoneInput maxLength={15} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`pl-12 pr-4 py-3.5 text-sm min-w-full autofill:bg-transparent rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full min-w-full`} required />
            {/* {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>} */}
          </fieldset>
         </div>
        </div>

        <div>
          <p className='text-xs text-brandGray20x text-center'>On Clicking “Create my account” you agree to the Taskify <NavLink to={'#'} className="text-brandBlue1x">Privacy Policy</NavLink> and <NavLink to={'#'} className="text-brandBlue1x">Terms of Service</NavLink>. You will receive an email verification link and also receive a one-time verification code to your phone number by SMS. Message and data rates may apply.</p>
        </div>

        <ButtonPrimary disabled={submitting} bgColor={"bg-brandBlue1x"} disabledBgColor={'bg-brandGray16x'} handleClick={handleSignUp} text={'Create my account'} type={'button'} width={'w-full'} />
        <div className={`text-center`}>
            <p className={`font-avenirMedium`}>Have an account? <NavLink to={'/auth/login'} className={`text-brandBlue1x underline underline-offset-2`}>Sign In </NavLink></p>
        </div>
        </AuthFormWrap>
        <ToastContainer />
    </AltAuthTemplate>
  )
}

export default Register