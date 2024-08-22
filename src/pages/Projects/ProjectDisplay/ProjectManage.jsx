import React, { useState } from 'react'
import FormFileInput from '../../../components/Form/FormFileInput'
import AuthInput from '../../Auth/Widgets/AuthInput'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import { useFormik } from 'formik'
import useGetUser from '../../../utils/useGetUser'
import * as Yup from "yup"
import axios from 'axios'
import convertToUppercase from '../../../utils/convertToUppercase'
import { toast } from 'react-toastify'
import ButtonPrimaryIcon from '../../../components/Buttons/ButtonPrimaryIcon'
import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ProjectManage = ({ mutate, projectId, project, creator, openDelete }) => {

  const [submitting, setSubmitting] = useState(false)
  const { user, token } = useGetUser()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: convertToUppercase(project?.name) || "",
      description: convertToUppercase(project?.description.charAt(0)) + project?.description.slice(0) || "",
      project_photo: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name should be two or more characters')
        .required('Name required'),
      description: Yup.string()
        .min(2, 'Description should be two or more characters')
        .required('Description required'),
      project_photo: Yup.mixed()
        //   .nullable()
        .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
          // console.log(value && value.size)
          return value && value.size <= import.meta.env.VITE_MAX_FILE_SIZE;
        })
    })
  })

  const handleUpdateProject = (e) => {
    e.preventDefault()
    if (formik.errors.name || formik.errors.description || (formik.values.project_photo !== "" && formik.errors.project_photo) || formik.errors.project_photo) {
      return
    }

    setSubmitting(true)
    const formData = new FormData();

    // Find the changed values
    const changedValues = Object.keys(formik.values).reduce((acc, key) => {
      if (formik.values[key] !== formik.initialValues[key]) {
        acc[key] = formik.values[key];
      }
      return acc;
    }, {});

    // Add the changed values to formData
    Object.keys(changedValues).forEach((key) => {
      formData.append(key, changedValues[key]);
    });

    for (let [key, value] of formData.entries()) {
      console.log("FORMDATA => ", `${key}: ${value}`);
    }


    try {

      // console.log(formik.values);
      // const formValues = Object.fromEntries(formData.entries());
      // console.log(formValues);
      // setSubmitting(false)

      axios.patch(`${import.meta.env.VITE_BASEURL}/project/${projectId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          // console.log('create project data', res.data);
          // console.log('create project message', res.data.message);
          if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
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
          } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
            mutate()
            toast.success(res?.data?.message, {
              // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
              autoClose: 2500,
              // hideProgressBar: false,
              // closeOnClick: true,
              // pauseOnHover: true,
              // draggable: true,
              // progress: undefined,
            });



            setSubmitting(false)
          }

          setSubmitting(false)

        })
        .catch((err) => {
          console.error(err); setSubmitting(false)
        })

    } catch (error) {
      setSubmitting(false)
      console.error(error)
    }
  }

  const handleFileInput = (e) => {
    formik.setFieldValue("project_photo", e.target.files[0])
  }

  const handleDeleteProject = (e) => {
    e.preventDefault()
    if (!projectId) {
        return
    }

    setSubmitting(true)



    try {

        axios.delete(`${import.meta.env.VITE_BASEURL}/project/${projectId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log('delete project data', res.data);
                console.log('delete project message', res.data.message);
                if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
                    toast.error(res.data.message, {
                        // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                        autoClose: 2500,
                    });
                    console.log(res.data.message);
                    setSubmitting(false)
                } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                    mutate()
                    toast.success(res?.data?.message, {
                        // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                        autoClose: 2500,
                    });
                    navigate("/projects")


                    setSubmitting(false)
                }

                setSubmitting(false)

            })
            .catch((err) => {
                console.error(err); 
                setSubmitting(false)
            })

    } catch (error) {
        setSubmitting(false)
        console.error(error)
    }
}

  return (
    <div className='flex flex-col gap-8 py-8'>
      {
        creator?.user_id == user?.user_id
        &&
        <ButtonPrimaryIcon handleClick={(e)=> openDelete((e)=>handleDeleteProject(e, user.user_id), `${project?.name}`) } bgColor={"bg-brandRed1x"} textColor={"text-white"} text={" "} gap={"gap-0"} flexDirection={"self-end"} icon={<FaTrashAlt />} />
      }
      <form className='flex flex-col gap-4 py-8 mx-auto max-w-md w-full'>
        <fieldset className='flex flex-col gap-3 mx-auto w-fit items-center justify-center relative'>
          <label htmlFor="project_photo" className='flex flex-col gap-4 items-center'>
            {
              project?.project_photo || formik.values.project_photo
                ?
                <img className='h-16 w-16 rounded-full aspect-square' src={formik.values.project_photo ? !(formik.values.project_photo instanceof File) ? formik.values.project_photo : URL.createObjectURL(formik.values.project_photo) : project?.project_photo} />
                :
                <div className={`p-2 rounded-full bg-brandBlue1x/20 aspect-square flex item-center justify-center w-fit`}>
                  <svg className={`h-10 w-10 opacity-20`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
            }
            <div className='text-xs rounded-fifty border-2 border-black py-2 px-4' >
              <span>{!(formik.touched.project_photo && formik.values.project_photo) ? ('Change Project photo') : formik.values.project_photo?.name}</span>
            </div>
          </label>
          <input type='file' name='project_photo' id={"project_photo"} onChange={(e) => handleFileInput(e)} onBlur={formik.handleBlur} className='absolute w-full h-full opacity-0' accept=".jpg,.jpeg,.png,.gif,image/*" />
        </fieldset>
        <AuthInput inputId={"name"} inputName={"name"} inputLabel={"Name"} inputPlaceholder={"Project X"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.name} fieldError={formik.touched.name && formik.errors.name} />
        <AuthInput inputId={"description"} inputName={"description"} inputLabel={"Description"} inputPlaceholder={"A design file for project X space mission..."} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.description} fieldError={formik.touched.description && formik.errors.description} />
        <div className='pt-4'>
          <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Update Project"} bgColor={"bg-brandBlue1x"} handleClick={handleUpdateProject} />
        </div>
      </form>
    </div>
  )
}

export default ProjectManage