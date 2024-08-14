import React, { useState } from 'react'
import ModalWrap from '../../components/Modal/ModalWrap'
import ModalInner from '../../components/Modal/ModalInner'
import AuthInput from '../Auth/Widgets/AuthInput'
import { useFormik } from 'formik'
import * as Yup from "yup"
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import FormFileInput from '../../components/Form/FormFileInput'
import { toast } from 'react-toastify'
import axios from 'axios'
import useGetUser from '../../utils/useGetUser'

const CreateProject = ({isOpen, setIsOpen, mutate}) => {

    const [submitting, setSubmitting] = useState(false)
    const {token} = useGetUser()

    const formik = useFormik({
        initialValues:{
            name:"",
            description:'',
            project_photo:""
        },
        validationSchema : Yup.object({
            name : Yup.string()
              .min(2, 'Name should be two or more characters')
              .required('Name required'),
            description : Yup.string()
              .min(2, 'Description should be two or more characters')
              .required('Description required'),
              project_photo : Yup.mixed()
            //   .nullable()
              .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
                  // console.log(value && value.size)
                  return value && value.size <= import.meta.env.VITE_MAX_FILE_SIZE;
              })      
          })
    })

    const handleProjectCreate = (e) => {
        e.preventDefault()
        if(formik.errors.name || formik.errors.description || (formik.values.project_photo !== "" && formik.errors.project_photo) || formik.errors.project_photo){
            return
          }
      
          setSubmitting(true)
          const formData = new FormData()
          formData.append('name', formik.values.name)
          formData.append('description', formik.values.description)
          formData.append('project_photo', formik.values.project_photo)
      
      
          try {
      
              // console.log(formik.values);
              // const formValues = Object.fromEntries(formData.entries());
              // console.log(formValues);
              // setSubmitting(false)
      
              axios.post(`${import.meta.env.VITE_BASEURL}/project`, formData, {headers:{Authorization:`Bearer ${token}`}})
              .then((res)=>{
                console.log('create project data', res.data);
                // console.log('create project message', res.data.message);
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
                    mutate()  
                    toast.success("Project creation successful.", {
                          // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                          autoClose: 2500,
                          // hideProgressBar: false,
                          // closeOnClick: true,
                          // pauseOnHover: true,
                          // draggable: true,
                          // progress: undefined,
                      });
                      
                      
                      setIsOpen(false)

                      setSubmitting(false)      
                  }
      
                  setSubmitting(false)
                  
              })
              .catch((err)=>{
                  console.error(err);
              })
              
          } catch (error) {
              setSubmitting(false)
              console.error(error)
          }
    }


  return (
    <ModalWrap id={"createProjectModal"} modalState={isOpen} handleModal={()=>setIsOpen(false)} >
        <ModalInner title={"Create a project"}>
            <div>
                <FormFileInput actionText={"Choose Project Photo"} formik={formik} fileValue={formik.values.project_photo} fileInputId={"project_photo"} fileInputName={"project_photo"} />
            </div>
            <AuthInput inputId={"name"} inputName={"name"} inputLabel={"Name"} inputPlaceholder={"Project X"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.name} fieldError={formik.touched.name && formik.errors.name} />
            <AuthInput inputId={"description"} inputName={"description"} inputLabel={"Description"} inputPlaceholder={"A design file for project X space mission..."} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.description} fieldError={formik.touched.description && formik.errors.description} />
            <div className='pt-4'> 
                <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"New Project"} bgColor={"bg-brandBlue1x"} handleClick={handleProjectCreate} />
            </div>
        </ModalInner>
    </ModalWrap>
  )
}

export default CreateProject