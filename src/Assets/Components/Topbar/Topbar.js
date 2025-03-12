"use client"

import React, { useState, useEffect, useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Toolbar } from "primereact/toolbar"
import { Avatar } from "primereact/avatar"
import Sidebar1 from "../Sidebar/Sidebar1"
import { LogoutButton } from "../../Logout/Logout"
import "./Topbar.css"

export default function Topbar() {
  const { user } = useAuth0()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const startContent = <React.Fragment></React.Fragment>

  const centerContent = (
    <div className="flex flex-wrap align-items-center gap-3">
      <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-home text-2xl"></i>
      </button>
      <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-user text-2xl"></i>
      </button>
      <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-search text-2xl"></i>
      </button>
      <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <Sidebar1 />
      </button>
    </div>
  )

  const endContent = (
    <div className="user-profile-wrapper" ref={dropdownRef}>
      {user ? (
        <>
          <div className="profile-trigger" onClick={toggleDropdown}>
            <img src={user.picture || "/placeholder.svg"} alt={user.name} className="profile-img" />
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <div className="logout-button-container">
                <LogoutButton />
              </div>
            </div>
          )}
        </>
      ) : (
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
      )}
    </div>
  )

  return (
    <div className="card">
      <Toolbar
        start={startContent}
        center={centerContent}
        end={endContent}
        className="bg-gray-900 shadow-2"
        style={{
          borderRadius: "0rem",
          backgroundColor: "#AB72C3",
        }}
      />
    </div>
  )
}

