import React, { useEffect, useRef, useState } from 'react'
import StatusKeys from '../../data/StatusKeys'
import useComponentVisible from '../../hooks/useComponentVisible'
import useGetUser from '../../utils/useGetUser'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FadeLoader } from 'react-spinners'

const StatusTag = ({ status, regStatusState, closeView, hideDrop, isFinalStatus, projectId, taskId, isAssignee, isAdmin, cannotClick, useFixed, mutate }) => {

    const buttonRef = useRef(null)
    const dropRef = useRef(null)

    const [submitting, setSubmitting] =  useState(false)

    const { token } = useGetUser()

    const [selectedStatus, setSelectedStatus] = useState(false)

    const [showDrop, setShowDrop] = useState(false)
    const [position, setPosition] = useState({
        top: "",
        left: ""
    })

    useComponentVisible(buttonRef, dropRef, () => setShowDrop(false))

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top,
                left: rect.left + window.scrollX,
            });
        }
    };

    useEffect(() => {
        // Update the position initially
        updatePosition();

        // Add scroll and resize event listeners to update the position
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        // console.log(position)
        // Clean up the event listeners on component unmount
        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [buttonRef.current?.scrollHeight]);

    const handleStatusChange = () => {
        if ((isFinalStatus && regStatusState !== "completed") || !projectId || !taskId) {
            return
        }
        setShowDrop(false)

        setSubmitting(true)


        const body = isFinalStatus 
        ?
        {
            "final_status": selectedStatus
        }
        :
        {
            "task_id": taskId,
            "project_id": projectId,
            "status": selectedStatus
        }

        try {

            // console.log(formik.values);
            // const formValues = Object.fromEntries(formData.entries());
            // console.log(formValues);
            // setSubmitting(false)

            axios.patch(`${import.meta.env.VITE_BASEURL}/task/${isFinalStatus ? "status" : `interface/${projectId}/${taskId}`}`, body, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    // console.log('update task status data', res.data);
                    // console.log('update task status message', res.data.message);
                    if (res.data.status !== "success" && res.data.responseCode !== "00" && res.data.message) {
                        toast.error(res.data.message, {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });
                        // console.log(res.data.message);
                        setSelectedStatus("")
                        setSubmitting(false)
                    } else if (res.data.status == "success" && res.data.responseCode == "00" && res.data.message) {
                        mutate()
                        toast.success(res.data.message, {
                            // position: toast.POSITION.TOP_RIGHT, //can't find position, throwing error
                            autoClose: 2500,
                        });
                        closeView()


                        // setIsOpen(false)

                        setSelectedStatus("")
                        setSubmitting(false)
                    }

                    setSelectedStatus("")
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

    useEffect(() => {
        if (selectedStatus) {
            handleStatusChange()
        }
    }, [selectedStatus])


    return (
        <div className={`relative flex items-center gap-2`}>
            <button ref={buttonRef} type='button' onClick={() => setShowDrop(prevShowDrop => !prevShowDrop)} className={`
                rounded-ten py-1 px-4 text-xxs w-fit capitalize
                transition-all duration-300 ease-in-out
                ${(cannotClick) ? "pointer-events-none" : ""}
                ${status == "pending" && "bg-brandOrange2x/20 text-brandOrange2x"}
                ${status == "in progress" && "bg-brandYellow3x/20 text-brandYellow3x"}
                ${status == "completed" && "bg-brandGreen4x/20 text-brandGreen4x"}
                `}>
                {status}
            </button>
            {
                
                submitting
                &&
                <div className='animate-spin h-8 bg-white aspect-square rounded-full border-x-brandBlue1x/50 border-x-2 border-x-dashed border-t-brandBlue1x/50 border-t-2 border-t-dashed'>
                    
                </div>
            }
            {
                hideDrop
                ||
                <div ref={dropRef} style={{ top: `${useFixed && position.top + "px"}` }} className={`${showDrop ? "translate-y-2" : "opacity-0 h-0 pointer-events-none translate-y-10"} ${useFixed ? "fixed translate-y-8" : "absolute"} transition-all duration-300 ease-in-out flex flex-col gap-1 items-start bg-white shadow-md top-hundredPercent z-20 w-fit min-w-40 h-fit py-2 px-2 rounded-ten`}>
                    {
                        StatusKeys.map((key, idx) => {
                            return <button type='button' onClick={() => setSelectedStatus(key.status)} key={idx} className={`${key.status == status ? "bg-brandBlue1x/30 text-brandBlue1x" : "hover:bg-brandBlue1x/10 text-brandGray4x"} transition-all duration-300 ease-in-out rounded-ten pl-2 pr-6 w-full text-left text-sm py-2 font-avenirLight`}>{key.name}</button>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default StatusTag