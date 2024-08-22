import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import AuthInput from "../Auth/Widgets/AuthInput"
import PhoneInput from "../../components/Form/PhoneInput"
import useGetUser from '../../utils/useGetUser'
import useFormatPhoneNumber from '../../utils/useFormatPhoneNumber'
import useFormatPhoneTest from '../../utils/useFormatPhoneTest'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import convertToUppercase from '../../utils/convertToUppercase'



const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleReload = () => {
        navigate(location.pathname, { replace: true }); // Navigates to the current path, re-rendering the component
    };


    const { user, token } = useGetUser()

    const [submitting, setSubmitting] = useState(false)
    const [photo, setPhoto] = useState("")

 

    const formik = useFormik({
        initialValues: {
            first_name: convertToUppercase(user?.first_name) || "",
            last_name: convertToUppercase(user?.last_name) || "",
            email: convertToUppercase(user?.email) || "",
            profile_photo: "",
            phone: user?.phone || ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .min(2, 'Firstname should be two or more characters')
                .required('Firstname required'),
            last_name: Yup.string()
                .min(2, 'Lastname should be two or more characters')
                .required('Lastname required'),
            email: Yup
                .string()
                .email('Invalid email address')
                .required('Email Required'),
            phone: Yup
                .string()
                .required('Phone number required')
                .min(11, 'Phone number must be at least 11 digits')
                .max(14, 'Phone number must not be more than 14 digits')
                .test('isValid', 'Invalid phone number', function (value) {
                    const formattedPhoneNumber = useFormatPhoneTest(value);
                    return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
                }),
            profile_photo: Yup.mixed()
                .nullable()
                .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
                    // console.log(value && value.size)
                    return value && value.size <= import.meta.env.VITE_MAX_FILE_SIZE;
                })
        })
    })


    const handleProfileEdit = (e) => {
        e.preventDefault();
        
        if (formik.errors.first_name || formik.errors.last_name || (formik.values.profile_photo !== "" && formik.errors.profile_photo) || formik.errors.phone || formik.errors.email) {
            console.log(formik.values.profile_photo);
            console.log(formik.errors);
            return;
        }
    
        setSubmitting(true);
        const formData = new FormData();
    
        // Find the changed values
        const changedValues = Object.keys(formik.values).reduce((acc, key) => {
            if (formik.values[key] !== formik.initialValues[key]) {
                acc[key] = formik.values[key];
            }
            return acc;
        }, {});
    
        // Add the changed values to formData, excluding profile_photo for now
        Object.keys(changedValues).forEach((key) => {
            if (key !== 'profile_photo') {
                formData.append(key, changedValues[key]);
            }
        });
    
        // Handle profile photo separately to avoid duplication
        if (formik.values.profile_photo !== "" && formik.values.profile_photo !== formik.initialValues.profile_photo) {
            formData.append('profile_photo', formik.values.profile_photo);
        }
    
        // Debugging output
        for (let [key, value] of formData.entries()) {
            console.log("FORMDATA => ", `${key}: ${value}`);
        }
    
        console.log("changedValues =>", changedValues);
        console.log("formik.values => ", formik.values);
    
        try {
            axios.patch(`${import.meta.env.VITE_BASEURL}/user`, formData, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    console.log('edit profile', res.data);
                    console.log('edit profile', res.data.message);
                    if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
                        toast.error(res.data.message, {
                            autoClose: 2500,
                        });
                        setSubmitting(false);
                    } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                        toast.success(res?.data?.message, {
                            autoClose: 2500,
                        });
                        Cookies.set("user", JSON.stringify(res?.data?.data?.user) || "", { expires: 1 });
                        setSubmitting(false);
                    }
                    setSubmitting(false);
                })
                .catch((err) => {
                    console.error(err);
                    setSubmitting(false);
                });
        } catch (error) {
            setSubmitting(false);
            console.error(error);
        }
    }
    

    const handlePhoneInputChange = (e, handleChange) => {
        const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
        handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
    }

    const handleFileInput = (e) => {
        formik.setFieldValue("profile_photo", e.target.files[0])
    }

    return (
        <div className='w-full'>
            <form className='flex flex-col gap-4 w-full'>
                {/* <div>
            <FormFileInput formik={formik} fileValue={formik.values.profile_photo || user?.profile_photo} fileInputId={"profile_photo"} fileInputName={"profile_photo"} />
        </div> */}
                <fieldset className='flex flex-col gap-3 mx-auto w-fit items-center justify-center relative'>
                    <label htmlFor="profile_photo" className='flex flex-col gap-4 items-center'>
                        {
                            user?.profile_photo || formik.values.profile_photo
                                ?
                                <img className='h-16 w-16 rounded-full aspect-square' src={formik.values.profile_photo ? !(formik.values.profile_photo instanceof File) ? formik.values.profile_photo : URL.createObjectURL(formik.values.profile_photo) : user?.profile_photo} />
                                :
                                <div className={`p-2 rounded-full bg-brandBlue1x/20 aspect-square flex item-center justify-center w-fit`}>
                                    <svg className={`h-10 w-10 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                        }
                        <div className='text-xs rounded-fifty border-2 border-black py-2 px-4' >
                            <span>{!(formik.touched.profile_photo && formik.values.profile_photo) ? ('Change Profile photo') : formik.values.profile_photo?.name}</span>
                        </div>
                    </label>
                    <input type='file' name='profile_photo' id={"profile_photo"} onChange={(e) => handleFileInput(e)} onBlur={formik.handleBlur} className='absolute w-full h-full opacity-0' accept=".jpg,.jpeg,.png,.gif,image/*" />
                </fieldset>
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className='w-full md:w-fiftyPercent'>
                        <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.first_name} fieldError={formik.touched.first_name && formik.errors.first_name} inputLabel={'First name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'first_name'} inputId={'first_name'} />
                    </div>
                    <div className='w-full md:w-fiftyPercent'>
                        <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.last_name} fieldError={formik.touched.last_name && formik.errors.last_name} inputLabel={'Last name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'last_name'} inputId={'last_name'} />
                    </div>
                </div>
                <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputLabel={'Email address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'} />

                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className='w-full flex'>
                        <fieldset className='gap-2.5 flex flex-col w-full'>
                            <label htmlFor="phone" className='text-black font-avenirMedium text-lg'>Phone</label>
                            <PhoneInput maxLength={15} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`pl-12 pr-4 py-3.5 text-sm autofill:bg-transparent rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full min-w-full col-span-1`} required />
                            {/* {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>} */}
                        </fieldset>
                    </div>
                </div>

                <ButtonPrimary disabled={submitting} bgColor={"bg-brandBlue1x"} disabledBgColor={'bg-brandGray16x'} handleClick={handleProfileEdit} text={'Edit profile'} type={'button'} width={'w-full'} />
            </form>
        </div>
    )
}

export default Profile