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

const AddUser = ({ isOpen, setIsOpen, mutate, projectId, projectName, projectMembers }) => {

    const [submitting, setSubmitting] = useState(false)
    const [selectId, setSelectId] = useState("")
    const { token } = useGetUser()

    const handleAddUser = (e, role) => {
        e.preventDefault()
        if (!selectId) {
            return
        }

        setSubmitting(true)


        const body = {
            "user_id": selectId,
            "project_id": projectId,
            "role": role //optional - admin or memeber
        }



        try {

            // console.log(formik.values);
            // const formValues = Object.fromEntries(formData.entries());
            // console.log(formValues);
            // setSubmitting(false)

            axios.post(`${import.meta.env.VITE_BASEURL}/project/interface/user`, body, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    console.log('add user data', res.data);
                    console.log('add user message', res.data.message);
                    if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
                        toast.error(res.data.message, {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });
                        console.log(res.data.message);
                        setSubmitting(false)
                    } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                        mutate()
                        toast.success("User added successfully.", {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });

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




    return (
        <ModalWrap hideOverflowid={"addUserModal"} modalState={isOpen} handleModal={() => setIsOpen(false)} >
            <ModalInner formHeight={"h-full pb-20"} formTopPad={"pt-4"} height={"h-full"} title={"Add a User"}>
                <div className='h-full pb-20'>
                    <div className={`pb-4 text-xs`}>
                        <p>
                            Add
                            <span className={`text-brandBlue1x`}> New User </span>
                            to project:
                            <span className={`text-brandBlue1x`}> {projectName.charAt(0).toUpperCase() + projectName.slice(1)}</span>
        
                        </p>
                    </div>
                    {/* <div className='flex w-full h-fit bg overflow-y-auto'>
                        </div> */}
                    <div className='flex-grow grid h-full overflow-y-auto'>
                        <DisplayAllUsers useInProject projectMembers={projectMembers} selectId={selectId} setSelectId={setSelectId} />
                    </div>
                    <div className='pt-6 flex flex-row gap-2'>
                        <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"As Member"} bgColor={"bg-brandSec500"} handleClick={(e)=>handleAddUser(e,"member")} />
                        <ButtonPrimary disabled={submitting} disabledBgColor={"disabled:bg-brandGray16x"} width={"w-full"} text={"As Admin"} bgColor={"bg-brandBlue1x"} handleClick={(e)=>handleAddUser(e,"admin")} />
                    </div>
                </div>
            </ModalInner>
        </ModalWrap>
    )
}

export default AddUser