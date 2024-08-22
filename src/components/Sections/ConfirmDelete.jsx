import React, { useState } from 'react';
import ModalWrap from '../Modal/ModalWrap';
import ModalInner from '../Modal/ModalInner';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import HeaderAndText from './HeaderAndText';
import AuthInput from '../../pages/Auth/Widgets/AuthInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ConfirmDelete = ({ id, isOpen, deleteName, setIsOpen, submit, name, typeIn, handleDelete, sansWrap }) => {
    const [submitting, setSubmitting] = useState(submit || false);

    const formik = useFormik({
        initialValues: {
            type: ""
        },
        validationSchema: Yup.object({
            type: Yup.string()
                .required("Required")
                .test('isValid', 'Invalid entry', function (value) {
                    return value?.toString().trim() === typeIn;
                })
        }),
        onSubmit: async (values) => {
            setSubmitting(true);
            await handleDelete();
            setSubmitting(false);
        }
    });

    const clearForm = () => {
        formik.setFieldValue("type", "")
        formik.resetForm()
    }

    const handleValidatedDelete = () => {
        formik.handleSubmit(); // Trigger form validation and submission
        clearForm()
    };


    return (
        <>
            {
                sansWrap
                    ?
                    <ModalInner title={`Delete ${deleteName || "User"}`}>
                            <HeaderAndText header={" "} hasNoButton subHeader={<span>Are you sure you want to delete <span className='font-avenirHeavy text-brandBlue1x capitalize'>{name || ""}?</span></span>} />

                            {typeIn && (
                                <>
                                    <AuthInput
                                        inputLabel={<span>Type in <span className='font-avenirHeavy text-brandRed1x'>{typeIn || ""}</span> to delete</span>}
                                        inputName={"type"}
                                        inputId={"type"}
                                        inputRequired={true}
                                        handleChange={formik.handleChange}
                                        handleBlur={formik.handleBlur}
                                        fieldError={formik.touched.type && formik.errors.type}
                                    />
                                    <p className={`text-xs text-left text-brandRed1x`}>{formik.touched.type && formik.errors.type}</p>
                                </>
                            )}

                            <div className={`flex flex-row items-center gap-8 pt-4`}>
                                <ButtonPrimary
                                    width={"w-full"}
                                    disabled={submitting}
                                    disabledBgColor={"bg-brandGray11x"}
                                    handleClick={handleValidatedDelete}
                                    text={"Confirm"}
                                    textColor={"text-white"}
                                    bgColor={"bg-brandGreen4x"}
                                />
                                <ButtonPrimary
                                    width={"w-full"}
                                    disabled={submitting}
                                    disabledBgColor={"bg-brandGray11x"}
                                    handleClick={() => { setIsOpen(false); clearForm() }}
                                    text={"Cancel"}
                                    textColor={"text-white"}
                                    bgColor={"bg-brandRed1x"}
                                />
                            </div>
                        </ModalInner>
                    :
                    <ModalWrap id={id || "confirmDeleteModal"} modalState={isOpen} handleModal={() => setIsOpen(false)} >
                        <ModalInner title={`Delete ${deleteName || "User"}`}>
                            <HeaderAndText header={" "} hasNoButton subHeader={<span>Are you sure you want to delete <span className='font-avenirHeavy text-brandBlue1x capitalize'>{name || ""}?</span></span>} />

                            {typeIn && (
                                <>
                                    <AuthInput
                                        inputLabel={<span>Type in <span className='font-avenirHeavy text-brandRed1x'>{typeIn || ""}</span> to delete</span>}
                                        inputName={"type"}
                                        inputId={"type"}
                                        inputRequired={true}
                                        handleChange={formik.handleChange}
                                        handleBlur={formik.handleBlur}
                                        fieldError={formik.touched.type && formik.errors.type}
                                    />
                                    <p className={`text-xs text-left text-brandRed1x`}>{formik.touched.type && formik.errors.type}</p>
                                </>
                            )}

                            <div className={`flex flex-row items-center gap-8 pt-4`}>
                                <ButtonPrimary
                                    width={"w-full"}
                                    disabled={submitting}
                                    disabledBgColor={"disabled:bg-brandGray11x"}
                                    handleClick={handleValidatedDelete}
                                    text={"Confirm"}
                                    textColor={"text-white"}
                                    bgColor={"bg-brandGreen4x"}
                                />
                                <ButtonPrimary
                                    width={"w-full"}
                                    disabled={submitting}
                                    disabledBgColor={"disabled:bg-brandGray11x"}
                                    handleClick={() => { setIsOpen(false); clearForm() }}
                                    text={"Cancel"}
                                    textColor={"text-white"}
                                    bgColor={"bg-brandRed1x"}
                                />
                            </div>
                        </ModalInner>
                    </ModalWrap>

            }
        </>

    );
};

export default ConfirmDelete;
