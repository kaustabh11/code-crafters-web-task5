import React, { useEffect, useState } from 'react'
import './Profile.css'

const Profile = () => {

    const [details, setDetails] = useState({})

    const userSearch = async () => {
        const url = "https://blog-backend55-97ceda30cc73.herokuapp.com/api/auth/getuser"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        if (json.name) {
            setDetails(json)
        } else {
            console.error('Error occured')
        }
    }

    useEffect(() => {
      userSearch()
    }, [])

    return (
        <div className="profile-container">
            <div className="cont">
                <div className="profile-img">
                    <img src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1698061774~exp=1698062374~hmac=f2b47f4d482efc75b71259c86f7f18f49227b32ad8f06265f0e31b13e808e62c" alt="" />
                </div>
                <div className="profile-name">
                    Name: {details.name}
                </div>
                <div className="profile-email">
                    Email: {details.email}
                </div>
                <div className="profile-info">
                    Total Posts: {details.posts}
                </div>
            </div>
        </div>
    )
}

export default Profile