import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';

function Create() {

    const [users,setUsers] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getUserData = (e) =>{
        setUsers({...users, [e.target.name]: e.target.value})
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault(); 
        console.log("users...",users);
        dispatch(createUser(users))
        navigate("/read")
    }
    return (
        <div>
        <h2 className='my-2'>Fill The data</h2>
            <form className='w-50 mx-auto my-56' onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="tex" name='name' class="form-control" onChange={getUserData} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name='email' class="form-control" onChange={getUserData}/>
                </div>
                <div class="mb-3 ">
                    <label class="form-label">Age</label>
                    <input type="number" name='age' class="form-control" onChange={getUserData}/>
                </div>
                <div class="mb-3">
                    <input class="form-check-input" name='gender' value="Male"   type="radio" onChange={getUserData}/>
                    <label class="form-check-label" >
                        Male 
                    </label>
                </div>
                <div class="mb-3">
                    <input class="form-check-input" name='gender' type="radio" value="Female"  onChange={getUserData}/>
                    <label class="form-check-label">
                        Female
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Create