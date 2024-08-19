import React, { useState } from 'react'
import ProjectRow from './ProjectRow'
import formatDateMonthText from '../../../utils/formatDateMonthText'
import useGetUser from '../../../utils/useGetUser'
// import formatDateMonthText from '../../utils/FormatDateMonthText'

const ProjectTable = ({data}) => {

    const [sortBy, setSortBy] = useState('')

    const {user} = useGetUser()

    // const sortedCustomers = [...customersData].sort((a, b) => {
    //     if (sortBy === "date") {
    //      
    //     } else if (sortBy === "amount") {
    //       const amountA = parseFloat(a.amount);
    //       const amountB = parseFloat(b.amount);
    //       return amountA - amountB;
    //     } else {
    //       if (a[sortBy] < b[sortBy]) {
    //         return -1;
    //       } else if (a[sortBy] > b[sortBy]) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     }
    //   });      

  return (
    <table id='transactionHistoryTable' className='table table-auto w-full text-left'>
        <thead className='text-sm font-spaceGroteskMedium'>
            <tr className='rounded-ten'>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x rounded-l-ten'>
                    <input type="checkbox" name="master-check-transaction-history" id="masterCheckTransactionHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('name')} title='Sort customers by name' aria-label='Click to sort customers by name'>
                        Name
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('createdBy')} title='Sort customers by email' aria-label='Click to sort customers by email'>
                        Created By
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('role')} title='Sort customers by date joined' aria-label='Click to sort customers by date joined'>
                        Role
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('date')} title='Sort customers by date joined' aria-label='Click to sort customers by date joined'>
                        Created At
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('date')} title='Sort customers by date joined' aria-label='Click to sort customers by date joined'>
                        Date Joined
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('date')} title='Sort customers by date joined' aria-label='Click to sort customers by date joined'>
                        Date Updated
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('users')} title='Sort customers by date joined' aria-label='Click to sort customers by date joined'>
                        Participants
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    
                </td>
            </tr>
        </thead>
        <tbody>
            {/* {sortedCustomers.map((data, idx)=>{
                return <CustomersRow avatar={data.customerdata.user_dp} key={idx} name={data.customerdata.name} email={data.customerdata.email} date={formatDateMonthText(data.dateAdded)} amount={new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(data.total_spent)} verification={data.customerdata.is_verified} />
            })} */}
            {
                data?.map((project, idx) => {
                    const currentUser = project?.users?.filter(u => u?.user?.user_id == user?.user_id)[0]
                    // console.log("Current user in project => ", project?.users?.filter(u => u?.user?.user_id == user?.user_id)[0])
                    return <ProjectRow key={idx} creator={project?.creator} avatar={project.project_photo}  userDetail={currentUser} role={currentUser?.role} projectId={project.project_id} name={project.name} dateCreated={formatDateMonthText(project.created_at)} users={project.users.length} updatedAt={formatDateMonthText(project.updated_at)} />
                })
            }
        </tbody>
    </table>
  )
}

export default ProjectTable