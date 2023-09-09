import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {showUser} from '../features/userDetailSlice';
import { Link } from 'react-router-dom';
import CustomModal from './CustomModal';
import { deleteUser } from '../features/userDetailSlice';

function Read() {

    const dispatch = useDispatch(); 

    const [id, setId] = useState()
    const [showPopup, setShowPopup] = useState(false)

    const {users , loading} = useSelector((state)=> state.app)
 
    useEffect(()=>{
        dispatch(showUser())
    },[])

    if(loading){
        return (<h2>loading...</h2>)
    }

    return (
        <div>
           { showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup}/>}
            <h2>All Data</h2>
            {users && users.map((ele) =>(<div>
                <div key={ele.id} className="card w-50 mx-auto">
                    <div className="card-body">
                        <h5 className="card-title">{ele.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{ele.gender}</h6>
                        <button className='card-link' onClick={() => [setId(ele.id), setShowPopup(true)]}>view</button>
                        <Link to={`/edit/${ele.id}`} className='card-link'>Edit</Link>
                        <Link onClick={()=> dispatch(deleteUser(ele.id))} className='card-link'>Delete </Link>
                    </div>
                </div>
            </div>))}
        </div>
    )
}

export default Read