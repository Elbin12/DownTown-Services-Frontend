import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import { FaChevronDown } from "react-icons/fa";
import { api, BASE_URL } from '../../axios';
import { setUsers } from '../../redux/admin';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { setSelectedUser } from '../../redux/admin';
import { useNavigate } from 'react-router-dom';


function Userslist() {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const navigate = useNavigate();

  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  const users = useSelector(state=>state.admin.users)

  const currentUsers =  users?users.slice(indexOfFirstUser, indexOfLastUser):[];

  const selectedUser = useSelector(state=> state.admin.selectedUser)

  
  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const res = await api.get('users/');
        dispatch(setUsers(res.data)); 
        console.log(res.data); 
      } catch (err) {
        console.log(err); 
      }
    };
    fetchUsers();
  },[])
  
  const handleclick = (user)=>{
    dispatch(setSelectedUser(user))
    console.log(user, 'usererr');
    navigate('/admin/user')
  }
  

  return (
    <div className='w-5/6 flex justify-center items-center pr-11'>
      <div className=' w-full bg-white flex flex-col justify-between rounded-lg h-4/6'>
        <div>
          <div className='w-4/6 flex items-center px-6 justify-between py-4'>
            <h3 className='text-lg'>Customers</h3>
            < Searchbar />
          </div>
          <table className="table-auto w-full">
            <thead className="bg-[#EDF2F9] h-auto">
              <tr className="text-sm font-semibold text-[#505050]">
                <th className="px-8 py-1.5 text-left items-center">Name</th>
                <th className="px-8 py-1.5 text-left">Email</th>
                <th className="px-8 py-1.5 text-left">Phone</th>
                <th className="px-8 py-1.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index)=>(
                <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                  <td className="px-8 py-3 flex gap-2 items-center" onClick={()=>{handleclick(user)}}>
                    <img src={`${BASE_URL}${user.profile_pic}`} alt="" className='w-7 h-7 rounded-full' />
                    {user.Name}
                  </td>
                  <td className="px-8 py-3">{user.email}</td>
                  <td className="px-8 py-3">{user.mob}</td>
                  <td className={`px-8 py-3 text-xs ${user.is_active?'text-green-500':'text-red-600'} font-bold tracking-wider`}>{user.is_active?'ACTIVE':'BLOCKED'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination length={users?.length} postsPerPage={postsPerPage} currentPage={currentPage} onPageChange={setCurrentPage}/>
      </div>
    </div>
  )
}

export default Userslist
