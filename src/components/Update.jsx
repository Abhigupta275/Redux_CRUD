import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../features/userDetailSlice';

function Update() {

    const {id} = useParams();
    const {users , loading} = useSelector((state)=> state.app)
    const [updateData, setUpdateData] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(()=>{
        if(id){
            const singleUser = users.filter((ele) =>ele.id === id);
            setUpdateData(singleUser[0])
        }
    },[])

    const newData = (e) =>{
        setUpdateData({...updateData, [e.target.name]: e.target.value})
    }

    const handleUpdate = (e) =>{
        e.preventDefault();
        dispatch(updateUser(updateData));
        navigate('/read');
    }   

    return (
        <div>
            <h2 className='my-2'>Edit The data</h2>
            <form className='w-50 mx-auto my-56' onSubmit={handleUpdate} >
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="tex" name='name' value={updateData && updateData.name} onChange={newData} class="form-control"  />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name='email' value={updateData && updateData.email} onChange={newData} class="form-control"  />
                </div>
                <div class="mb-3 ">
                    <label class="form-label">Age</label>
                    <input type="number" name='age' value={updateData && updateData.age} onChange={newData} class="form-control"  />
                </div>
                <div class="mb-3">
                    <input class="form-check-input" name='gender' value="Male" onChange={newData} checked= {updateData && updateData.gender === "Male" }  type="radio"  />
                    <label class="form-check-label" >
                        Male
                    </label>
                </div>
                <div class="mb-3">
                    <input class="form-check-input" name='gender' type="radio" onChange={newData} checked={updateData && updateData.gender === "Female"} value="Female"  />
                    <label class="form-check-label">
                        Female
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Update