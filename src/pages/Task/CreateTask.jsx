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
import AuthTextArea from '../Auth/Widgets/AuthTextArea'
import DisplayAllUsers from '../../components/Sections/DisplayAllUsers'
import formatDateMonthText from '../../utils/formatDateMonthText'

const CreateTask = ({ isOpen, setIsOpen, mutate, projectId }) => {

    const [submitting, setSubmitting] = useState(false)
    const [selectId, setSelectId] = useState("")
    const { token } = useGetUser()
    const [step, setStep] = useState(0)

    // {
    //     "title":"test-title" ,
    //     "description" :"test-description",
    //     "user_id":"6db97edf-dfa6-4e60-9826-e1886b595e08",
    //     "project_id":"6d206158-1f9d-4ee0-9021-ac4ba4df36f8",
    //     "due_date":"2024-08-11 13:56:28.257",
    //     "notes":"" //optional
    //  }

    const formik = useFormik({
        initialValues: {
            title: "",
            description: '',
            notes: "",
            due_date: `${new Date()}`,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(2, 'Title should be two or more characters')
                .required('Title required'),
            description: Yup.string()
                .min(2, 'Description should be two or more characters')
                .required('Description required'),
            notes: Yup.string()
                .nullable()
                .min(3, "Note should be 3 or more characters"),
            due_date: Yup.date()
                .required("Due date required")
                .min(new Date(), 'Due date cannot be in the past')
        })
    })

    const clearForm = () => {
        formik.resetForm()
        setStep(0)
    }

    const handleProjectCreate = (e) => {
        e.preventDefault()
        if (formik.errors.title || formik.errors.description) {
            return
        }

        setSubmitting(true)


        const body = {
            'title': formik.values.title,
            'description': formik.values.description,
            "user_id": selectId,
            "project_id": projectId,
            "due_date": formik.values.due_date,
            "notes": formik.values.notes //optional
        }



        try {

            // console.log(formik.values);
            // const formValues = Object.fromEntries(formData.entries());
            // console.log(formValues);
            // setSubmitting(false)

            axios.post(`${import.meta.env.VITE_BASEURL}/task`, body, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    console.log('create task data', res.data);
                    console.log('create task message', res.data.message);
                    if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
                        toast.error(res.data.message, {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });
                        console.log(res.data.message);
                        setSubmitting(false)
                    } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                        mutate()
                        toast.success("Task creation successful.", {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });

                        clearForm()
                        setIsOpen(false)

                        setSubmitting(false)
                    }

                    setSubmitting(false)

                })
                .catch((err) => {
                    console.error(err);
                })

        } catch (error) {
            setSubmitting(false)
            console.error(error)
        }
    }

    const nextstep = () => {

        console.log(formik.errors)
        
        if (formik.values.title == "" || formik.values.description == "" || formik.values.due_date == "") {
            setStep(0)
        }else{
            setStep(1)
        }
        // if (formik.errors.title || formik.errors.description || formik.errors.due_date) {
        //     setStep(0)
        // }
    }


    return (
        <ModalWrap hideOverflowid={"createTaskModal"} modalState={isOpen} handleModal={() => setIsOpen(false)} >

            {
                step == 0
                &&
                <ModalInner title={"Create a Task"}>
                    <AuthInput inputId={"title"} inputName={"title"} inputLabel={"Title"} inputPlaceholder={"Task X"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.title} fieldError={formik.touched.title && formik.errors.title} />
                    <AuthInput inputId={"description"} inputName={"description"} inputLabel={"Description"} inputPlaceholder={"A design file for task X space mission..."} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.description} fieldError={formik.touched.description && formik.errors.description} />
                    <AuthInput inputType={"date"} inputId={"due_date"} inputName={"due_date"} inputLabel={"Due date"} inputPlaceholder={""} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.due_date} fieldError={formik.touched.due_date && formik.errors.due_date} />
                    <AuthTextArea textAreaLabel={"Notes (Optional)"} textAreaPlaceholder={"Add a note ..."} textAreaId={"notes"} textAreaName={"notes"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} textAreaValue={formik.values.notes} fieldError={formik.touched.notes && formik.errors.notes} />
                    <div className='pt-4'>
                        <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Assign User"} bgColor={"bg-brandBlue1x"} handleClick={nextstep} />
                    </div>
                </ModalInner>
            }

            {
                step == 1
                &&
                <ModalInner formHeight={"h-full pb-20"} formTopPad={"pt-4"} height={"h-full"} title={"Create a Task"}>
                    <div className='h-full pb-20'>
                        <div className={`pb-4 text-xs`}>
                            <p>
                                Assign
                                <span className={`text-brandBlue1x`}> {formik.values.title} </span>
                                due
                                <span className={`text-brandBlue1x`}> {`${formatDateMonthText(formik.values.due_date)}`} </span>
                                to:
                            </p>
                        </div>
                        {/* <div className='flex w-full h-fit bg overflow-y-auto'>
                        </div> */}
                        <div className='flex-grow grid h-full overflow-y-auto'>
                        <DisplayAllUsers selectId={selectId} setSelectId={setSelectId} />

                        </div>
                        <div className='pt-6 flex flex-row gap-2'>
                            <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Back"} bgColor={"bg-brandSec500"} handleClick={()=>setStep(0)} />
                            <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Create"} bgColor={"bg-brandBlue1x"} handleClick={handleProjectCreate} />
                        </div>
                    </div>
                </ModalInner>
            }
        </ModalWrap>
    )
}

export default CreateTask