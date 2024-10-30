import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import { api, BASE_URL } from '../../axios';
import { setUsers, setWorkers } from '../../redux/admin';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { setSelectedUser } from '../../redux/admin';
import { useNavigate } from 'react-router-dom';
import profile from '../../images/profile.png';


function Userslist({role}) {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const navigate = useNavigate();

  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  const users = useSelector(state=>state.admin.users)
  const workers = useSelector(state => state.admin.workers)

  const currentUsers =  users?users.slice(indexOfFirstUser, indexOfLastUser):[];

  const selectedUser = useSelector(state=> state.admin.selectedUser)
  const [loading, setLoading] = useState(false);

  
  useEffect(()=>{
    console.log('hi', 'workere');
    
    const fetchUsers = async () => {
      try {
        const res = await api.get('admin/users/');
        dispatch(setUsers(res.data)); 
        console.log(res.data); 
      } catch (err) {
        console.log(err); 
      }finally{
        setLoading(false);
      }
    };

    const fetchWorkers = async () => {
      try {
        const res = await api.get('admin/workers/');
        dispatch(setWorkers(res.data)); 
        console.log(res.data); 
      } catch (err) {
        console.log(err); 
      }finally{
        setLoading(false);
      }
    };

    if (role==='users'){
      setLoading(true)
      fetchUsers();
    }else if(role === 'workers'){
      console.log(workers, 'workers');
      setLoading(true)
      fetchWorkers();
    }

  },[])
  
  const handleclick = (user)=>{
    dispatch(setSelectedUser(user))
    console.log('hi  lfldl');
    if (role==='users'){
      navigate('/admin/user')
    }else{
      navigate('/admin/user')
    }
    console.log(user, 'usererr');
  }
  

  return (
    <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
      <div className=' w-4/5 bg-white flex flex-col mt-16 justify-between rounded-lg h-4/6'>
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
              {loading&&
                <tr>
                  <td colSpan="4" className="text-center font-semibold py-8">
                    LOADING...
                  </td>
                </tr>
              }
              {role ==='users'?
                currentUsers.map((user, index)=>(
                  <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                    <td className="px-8 py-3 flex gap-2 items-center cursor-pointer" onClick={()=>{handleclick(user)}}>
                      <img src={user.profile_pic?user.profile_pic:profile} alt="" className='w-7 h-7 rounded-full' />
                      {user.Name}
                    </td>
                    <td className="px-8 py-3">{user.email}</td>
                    <td className="px-8 py-3">{user.mob}</td>
                    <td className={`px-8 py-3 text-xs ${user.is_active?'text-green-500':'text-red-600'} font-bold tracking-wider`}>{user.is_active?'ACTIVE':'BLOCKED'}</td>
                  </tr>
                ))
              :
                workers?.map((worker, index)=>(
                  <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                    <td className="px-8 py-3 flex gap-2 items-center cursor-pointer" onClick={()=>{handleclick(worker)}}>
                      <img src={worker.profile_pic?worker.profile_pic:profile} alt='' className='w-7 h-7 rounded-full' />
                      {worker.Name}
                    </td>
                    <td className="px-8 py-3">{worker.email}</td>
                    <td className="px-8 py-3">{worker.mob}</td>
                    <td className={`px-8 py-3 text-xs ${worker.is_active?'text-green-500':'text-red-600'} font-bold tracking-wider`}>{worker.is_active?'ACTIVE':'BLOCKED'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination length={role=='users'? users?.length: workers?.length} postsPerPage={postsPerPage} currentPage={currentPage} onPageChange={setCurrentPage}/>
      </div>
    </div>
  )
}

export default Userslist
