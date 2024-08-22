import React, { useState } from 'react'
import useGetUser from '../../../utils/useGetUser'
import UserImg from '../../../components/Sections/UserImg'
import usePagination from '../../../utils/usePagination'
import Paginator from '../../../components/Pagination/Paginator'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import ButtonPrimaryIcon from '../../../components/Buttons/ButtonPrimaryIcon'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaTrashAlt } from 'react-icons/fa'

const ProjectMembers = ({ users, creator, isAdmin, projectId, mutate, setIsOpen, openDelete }) => {

    const { user: currentUser, token } = useGetUser()
    const [rowLength, setRowLength] = useState(8)
    const [submitting, setSubmitting] = useState(false)

    const { currentPage, templates, loading: dataLoading, rows: paginatorRows, totalPages, dottedArray, movePageBy, paginate, displayedData } = usePagination(users, rowLength, "projectMembersWrap")


    const handleUpdateRole = (e, userId, role) => {
        e.preventDefault()
        if (!userId || !projectId || !role) {
            return
        }

        setSubmitting(true)


        const body = {
            "user_id": userId,
            "project_id": projectId,
            "role": role //optional - admin or memeber
        }



        try {

            // console.log(formik.values);
            // const formValues = Object.fromEntries(formData.entries());
            // console.log(formValues);
            // setSubmitting(false)

            axios.patch(`${import.meta.env.VITE_BASEURL}/project/interface/user/role`, body, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    // console.log('update user data', res.data);
                    // console.log('update user message', res.data.message);
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
    const handleDeleteUser = async (e, userId) => {
        e.preventDefault();

        if (!userId || !projectId) {
            return;
        }

        if (submitting) return; // Prevent if already submitting

        setSubmitting(true);

        const body = {
            "user_id": userId,
            "project_id": projectId,
        };

        console.log("Deleting user:", userId); // Added for debugging

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASEURL}/project/interface/user`,
                { headers: { Authorization: `Bearer ${token}` }, data: body }
            );
            const res = response.data;

            if (res.status !== "success" || res.responseCode !== "00") {
                toast.error(res.message, { autoClose: 2500 });
                console.log(res.message);
                setSubmitting(false);
            } else {
                setIsOpen(false)
                mutate();
                toast.success(res.message, { autoClose: 2500 });
                setSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            setSubmitting(false);

        } finally {
            setSubmitting(false);
        }
    };



    const sortUsers = (users, creator) => {
        return users.sort((a, b) => {
            if (a.role === 'admin' && b.role !== 'admin') {
                return -1; // a should come before b
            }
            if (a.role !== 'admin' && b.role === 'admin') {
                return 1; // b should come before a
            }
            if (a.user.user_id === creator.user_id) {
                return -1; // Creator should come before anyone else
            }
            if (b.user.user_id === creator.user_id) {
                return 1; // Creator should come before anyone else
            }
            return 0; // No change in order
        });
    };



    return (
        <div id={"projectMembersWrap"}>
            {
                users?.length !== 0
                    ?
                    <div className={`py-4 grid grid-cols-1 gap-4`}>
                        {
                            sortUsers(users, creator)?.map((user, idx) => {
                                return <div key={idx} className={`flex flex-row gap-4 justify-between items-center py-4 border-b-0.5`}>
                                    <div className={`flex flex-row gap-2 items-center`}>
                                        <UserImg width={"w-10"} src={user.user.profile_photo} alt={`${user.user.first_name} ${user.user.last_name} `} />
                                        <div>
                                            <p className={`capitalize font-avenirMedium text-sm text-lexf text-brandSec500`}>{user.user.first_name} {user.user.last_name}
                                                <span className={"text-xxs text-brandBlue3x"}> {creator.user_id == user.user.user_id && "(Creator)"}</span>
                                                <span className={"text-xxs text-brandOrange2x"}> {currentUser.user_id == user.user.user_id && "(You)"}</span>
                                            </p>
                                            <p className={`text-left capitalize font-avenirLight text-xs ${user.role == "admin" ? "text-brandGreen4x" : "text-brandBlue1x"}`}>{user.role}</p>
                                        </div>
                                    </div>
                                    <div className={`pl-6 self-end justify-end flex felx-row items-center gap-2`}>
                                        {
                                            isAdmin
                                            &&
                                            user.role == "member"
                                            &&
                                            <ButtonPrimary handleClick={(e) => handleUpdateRole(e, user.user.user_id, "admin")} text={"Promote"} disabled={submitting} disabledBgColor={'disabled:bg-brandGray11x'} bgColor={"bg-brandGreen4x"} textColor={"text-white"} fontSize={"text-xs"} fontStyle={"font-avenirMedium"} paddingX={"px-2"} paddingY={"py-1"} />
                                        }
                                        {
                                            user.role == "admin" && creator.user_id !== user.user.user_id && currentUser.user_id !== user.user.user_id
                                            &&
                                            <ButtonPrimary handleClick={(e) => handleUpdateRole(e, user.user.user_id, "member")} text={"Demote"} disabled={submitting} disabledBgColor={'disabled:bg-brandGray11x'} bgColor={"bg-brandRed1x"} textColor={"text-white"} fontSize={"text-xs"} fontStyle={"font-avenirMedium"} paddingX={"px-2"} paddingY={"py-1"} />
                                        }
                                        {
                                            currentUser.user_id === creator.user_id && (creator.user_id !== user.user.user_id) &&
                                            <ButtonPrimaryIcon handleClick={(e) => openDelete(() => handleDeleteUser(e, user.user.user_id), `${user.user.first_name} ${user.user.last_name}`)} gap={" "} text={" "} icon={<FaTrashAlt />} disabled={submitting} disabledBgColor={'disabled:bg-brandGray11x'} bgColor={"bg-brandRed1x"} textColor={"text-white"} fontSize={"text-xs"} fontStyle={"font-avenirMedium"} paddingX={"px-2"} paddingY={"py-1"} />
                                        }
                                    </div>
                                </div>
                            })
                        }
                        <div className='pt-4 text-sm'>
                            {users && users.length > rowLength && <Paginator btnSize={"px-3 py-1"} arrowBtnSize={"px-3 py-1"} justifySection={"justify-center"} currentPage={currentPage} totalPages={totalPages} dottedArray={dottedArray} movePageBy={movePageBy} paginate={paginate} />}
                        </div>
                    </div>
                    :
                    <div className={`flex flex-col items-center`}>
                        <EmptyTable paddingY={"py-14"} message={"No Users Yet"} />
                        {isAdmin && <ButtonPrimaryIcon handleClick={() => setIsOpen(true)} bgColor={"bg-brandSec500"} text={"Add Users"} />}
                    </div>
            }
        </div>
    )
}

export default ProjectMembers