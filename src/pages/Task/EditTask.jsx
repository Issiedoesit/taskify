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
import { DateTimePicker } from '@mantine/dates'
import FormDatePicker from '../Auth/Widgets/FormDatePicker'
import DisplayProjectUsers from '../../components/Sections/DisplayProjectUsers'
import convertToUppercase from '../../utils/convertToUppercase'

const EditTask = ({ isOpen, setIsOpen, mutate, projectId, users, task }) => {

    // console.log("task => ", task)


    const [submitting, setSubmitting] = useState(false)
    const [selectId, setSelectId] = useState(task?.user_id || "")
    const { token } = useGetUser()
    const [step, setStep] = useState(0)
    const [due, setDue] = useState(new Date(task?.due_date) || new Date())

    useState(()=>{

    }, [task])

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
            title: convertToUppercase(task?.title) || "",
            description: convertToUppercase(task?.description) || "",
            notes: convertToUppercase(task?.notes) || "",
            due_date: `${new Date(task?.due_date)}` || `${new Date()}`,
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
        setDue(new Date())
        setStep(0)
    }

    const handleProjectCreate = (e) => {
        e.preventDefault()
        if (formik.errors.title || formik.errors.description || !due) {
            return
        }

        setSubmitting(true)

        // Initialize an empty object to store the changed values
        const changedValues = Object.keys(formik.values).reduce((acc, key) => {
            // Check if the current value is different from the initial value
            if (formik.values[key] !== formik.initialValues[key]) {
                acc[key] = formik.values[key];
            }
            return acc;
        }, {});

        if(due !== new Date(task?.due_date)){
            changedValues.due_date = due.toISOString()
        }
        if(selectId !== task?.user_id){
            changedValues.user_id = selectId
        }

        // Now `changedValues` is an object that only contains the fields that were changed
        console.log("Changed Values => ", changedValues);

        // If you need to convert this object to a JSON string (for example, to send it in an API request), you can do:
        const body = changedValues
        // const body = JSON.stringify(changedValues);
        console.log(body)

        try {

            // console.log(formik.values);
            // const formValues = Object.fromEntries(formData.entries());
            // console.log(formValues);
            // setSubmitting(false)

            axios.patch(`${import.meta.env.VITE_BASEURL}/task/interface/${task?.project_id}/${task?.task_id}`, body, { headers: { Authorization: `Bearer ${token}` } })
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
                        toast.success(res?.data?.message, {
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
                    console.error(err); setSubmitting(false)
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
        } else {
            setStep(1)
        }
        // if (formik.errors.title || formik.errors.description || formik.errors.due_date) {
        //     setStep(0)
        // }
    }


    return (
        <>
            {
                step == 0
                &&
                <ModalInner title={"Edit Task"}>
                    <AuthInput inputId={"title"} inputName={"title"} inputLabel={"Title"} inputPlaceholder={"Task X"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.title} fieldError={formik.touched.title && formik.errors.title} />
                    <AuthInput inputId={"description"} inputName={"description"} inputLabel={"Description"} inputPlaceholder={"A design file for task X space mission..."} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.description} fieldError={formik.touched.description && formik.errors.description} />
                    {/* <AuthInput inputType={"date"} inputId={"due_date"} inputName={"due_date"} inputLabel={"Due date"} inputPlaceholder={""} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.due_date} fieldError={formik.touched.due_date && formik.errors.due_date} /> */}

                    <FormDatePicker inputId={"due_date"} inputName={"due_date"} fieldError={formik.touched.due_date && formik.errors.due_date} inputValue={due} handleChange={setDue} />
                    <AuthTextArea textAreaLabel={"Notes (Optional)"} textAreaPlaceholder={"Add a note ..."} textAreaId={"notes"} textAreaName={"notes"} handleChange={formik.handleChange} handleBlur={formik.handleBlur} textAreaValue={formik.values.notes} fieldError={formik.touched.notes && formik.errors.notes} />
                    <div className='pt-4'>
                        <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Change User"} bgColor={"bg-brandBlue1x"} handleClick={nextstep} />
                    </div>
                </ModalInner>
            }

            {
                step == 1
                &&
                <ModalInner formHeight={"h-full pb-20"} formTopPad={"pt-4"} height={"h-full"} title={"Edit Task"}>
                    <div className='h-full pb-20'>
                        <div className={`pb-4 text-xs`}>
                            <p>
                                Assign
                                <span className={`text-brandBlue1x`}> {formik.values.title} </span>
                                due
                                <span className={`text-brandBlue1x`}> {`${formatDateMonthText(due)}`} </span>
                                to:
                            </p>
                        </div>
                        {/* <div className='flex w-full h-fit bg overflow-y-auto'>
                        </div> */}
                        <div className='flex-grow grid h-full overflow-y-auto'>
                            <DisplayProjectUsers useInTask currentAssignee={task?.user_id} users={users} selectId={selectId} setSelectId={setSelectId} />

                        </div>
                        <div className='pt-6 flex flex-row gap-2'>
                            <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Back"} bgColor={"bg-brandSec500"} handleClick={() => setStep(0)} />
                            <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"Confirm"} bgColor={"bg-brandBlue1x"} handleClick={handleProjectCreate} />
                        </div>
                    </div>
                </ModalInner>
            }
        </>
    )
}

export default EditTask