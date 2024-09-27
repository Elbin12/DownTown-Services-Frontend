import React, { useEffect } from 'react'
import Searchbar from './Searchbar'
import { FaChevronDown } from "react-icons/fa";
import { api, BASE_URL } from '../../axios';
import { setUsers } from '../../redux/admin';
import { useDispatch, useSelector } from 'react-redux';


function Userslist() {

  const dispatch = useDispatch();
  const users = useSelector(state=>state.admin.users)
  
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

  console.log(users,'igigjkgj');
  

  return (
    <div className='w-5/6 flex justify-center items-center pr-11'>
      <div className=' w-full h-4/6 bg-white rounded-lg'>
        <div className='w-4/6 flex items-center px-6 justify-between py-4'>
          <h3 className='text-lg'>Customers</h3>
          < Searchbar />
        </div>
        <table className="table-auto w-full">
          <thead className="bg-[#EDF2F9]">
            <tr className="text-sm font-semibold text-[#505050]">
              <th className="px-8 py-1.5 text-left items-center">Name</th>
              <th className="px-8 py-1.5 text-left">Email</th>
              <th className="px-8 py-1.5 text-left">Phone</th>
              <th className="px-8 py-1.5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index)=>(
              <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                <td className="px-8 py-3 flex gap-2 items-center">
                  <img src={`${BASE_URL}${user.profile_pic}`} alt="" className='w-7 h-7 rounded-full' />
                  {user.Name}
                </td>
                <td className="px-8 py-3">{user.email}</td>
                <td className="px-8 py-3">{user.mob}</td>
                <td className="px-8 py-3 text-green-500 text-xs font-bold tracking-wider">ACTIVE</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Userslist
