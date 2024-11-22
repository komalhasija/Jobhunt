import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import Applicationjobtable from './Applicationjobtable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllApplication from '@/hooks/useGetAllApplication'

const skills = ["HTML", "Css", "Javascript", "Reactjs"];
const isResume = true;

const Profile = () => {
  useGetAllApplication();
 const [open,setopen]=useState(false);
 const {user}=useSelector(store=>store.auth);
 
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex item-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />

            </Avatar>


            <div>
              <h1 className='font-medium text-xl'>{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>

          </div>

          <Button onClick={()=>setopen(true)}className="text-right" variant="outline"><Pen /></Button>
        </div>
        <div className='my-5' >
          <div className='flex items-center gap-3'>
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className='flex items-center gap-3'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>Skills not found</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {
            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-600 w-full hover:underline cursor-pointer'> {user?.profile?.resumeOriginalName} </a> : <span>Not Applicable</span>
          }
        </div>
        
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
            <Applicationjobtable/> 
      </div>
      <UpdateProfileDialog open={open} setopen={setopen}/>
    </div>
  )
}

export default Profile
