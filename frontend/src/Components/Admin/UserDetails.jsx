import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api, BASE_URL } from '../../axios'
import { setSelectedUser } from '../../redux/admin';

function UserDetails() {

    const selectedUser = useSelector(state=>state.admin.selectedUser)
    const dispatch = useDispatch();

    const blockuser = async ()=>{
        const res = await api.post('block/', {"email":selectedUser.email})
        console.log(res, 'block response');
        console.log(selectedUser);
        const new_user = {...selectedUser }
        new_user.is_active = res.data.isActive
        dispatch(setSelectedUser(new_user))
    }

    console.log(selectedUser);

  return (
    <div className='w-9/12 flex justify-center items-center pr-11'>
        <div className=' w-full bg-white flex flex-col justify-around items-center rounded-lg h-4/6 p-4'>
            <div className='flex w-11/12 justify-center gap-6 items-end'>
                <div className='bg-white rounded-full w-[6rem] h-[6rem] drop-shadow-lg overflow-hidden'>
                    <img src={`${BASE_URL}${selectedUser.profile_pic}`} className='object-cover w-full h-full p-[2px] rounded-full' alt="" />
                </div>
                <div className='bg-[#3e689024] w-4/5 flex justify-between py-4 px-9 items-start rounded-lg'>
                    <div >
                        <h4>{selectedUser?.first_name} {selectedUser?.last_name}</h4>
                        <h4>{selectedUser?.email}</h4>
                        <h4>{selectedUser?.mob}</h4>
                    </div>
                    <button className='border border-gray-500  rounded-lg bg-white px-6 py-1' onClick={blockuser}>{selectedUser?.is_active ? "BLOCK" : 'UNBLOCK'}</button>
                </div>
            </div>
            <div className='bg-white border rounded-lg drop-shadow-lg h-3/5 w-11/12 px-9 py-4'>
                <h2 className='font-semibold text-[#4f4f4f]'>Recent Orders</h2>
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDetails
