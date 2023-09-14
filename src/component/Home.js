import React, { useEffect } from 'react'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      {localStorage.getItem('token') && <Notes />}
    </div>
  )
}

export default Home
