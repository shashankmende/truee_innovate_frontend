

import React, { useState } from 'react'
import './AddCandidate.css'
import axios from 'axios'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';


const AddCandidate = () => {

    const [name,setName]=useState("")
    const [phone,setphone]= useState("")
    const [email,setEmail]=useState("")
    const [gender,setGender]= useState('')
    const [experience,setExperience]=useState(0)
    const [skills,setSkills] = useState([])
    const [status,setStatus]= useState("")

    const handleInputChange = (e)=>{
        const field = e.target.id 
        const value = e.target.value
        if (field==="name"){
            setName(value)
        }
        else if(field==='phone'){
            setphone(value)
        }
        else if(field==="gender"){
            setGender(value)
        }
        else if(field==="email"){
            setEmail(value)
        }
        else if(field==='experience'){
            setExperience(value)
        }
        else if(field==='skills'){
            setSkills(value.split(","))
        }
    }

    const onSubmitForm = async(e)=>{
        e.preventDefault()
        const reqbody = {
            name,
            email,
            phone,
            experience,
            skills,
            gender
        }
        try {
            const response = await axios.post('http://localhost:4000/api/v1/candidate',reqbody)
            setStatus("Candidate Added")
            
        } catch (error) {
            console.log("error in adding new candidate",error)
        }

    }


  return (
    <div className='section-new-candidate'>
        <div className='content'>
            <div className='back-arrow-heading--container'>
                <Link to='/'><IoArrowBackSharp size={24}/></Link>
            <h1>Add candidate</h1>
            </div>
            {status && <p style={{color:"green"}}>{status}</p>}
            <form action="" onSubmit={onSubmitForm}>
                <div className='input-control'>
                    <label htmlFor="name">Name</label>
                <input value={name} type="text" id='name' onChange={handleInputChange} />
                </div>
                <div className='input-control'>
                    <label htmlFor="phone">Phone</label>
                <input value={phone} type="phone" id='phone'   onChange={handleInputChange} />

                </div>
                <div className='input-control'>
                    <label htmlFor="gender">Gender</label>
                <select value={gender} name="gender" id="gender"  onChange={handleInputChange} >
                    <option value="" >Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                </div>
                
                <div className='input-control'>
                    <label htmlFor="email">Email</label>
                <input value={email} type="text" id='email'  onChange={handleInputChange}  />

                </div>
                <div className='input-control'>
                    <label htmlFor="experience">Experience</label>
                <input value={experience} type="number" id='experience'   onChange={handleInputChange} />

                </div>
                <div className='input-control'>
                    <label htmlFor="skills">Skills</label>
                    <textarea value={skills} name="skills" id="skills" placeholder='Enter comma-separated skills' cols={10} rows={10}  onChange={handleInputChange} ></textarea>
                </div>

                <div className='btn-container'>
                    <button type='submit'>Add</button>
                </div>
                
            </form>
        </div>

    </div>
  )
}

export default AddCandidate