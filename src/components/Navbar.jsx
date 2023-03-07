import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SearchBar } from '.'
import { downArrow, menu, user } from '../assets'
import { navLinks } from '../constants'

function Navbar({ username, isLoggedIn, showUserCard, setShowUserCard, activeMenu, setActiveMenu, books, activeSearch, setActiveSearch, screenSize }) {
  const logo = "items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900";
  const navigate = useNavigate();

  function toggleCard() {
    if(showUserCard) setShowUserCard(false)
    else setShowUserCard(true); 
  }
  function redirect() {
    navigate('/login', { replace: true })
  }

  return (
    <div className={`flex p-2 md:mx-6 relative ${activeMenu ? 'justify-end' : 'justify-between'}`}>
      {
        !activeMenu && !activeSearch ? (
          <div className='flex justify-center items-center'>
            <img
              src={menu}
              alt="menu icon"
              style={{width: '30px', cursor: 'pointer'}}
              onClick={() => setActiveMenu(true)}  
            />
            <h4 style={{color: '#000'}}>
              <NavLink to="/" className={logo}>{navLinks.siteName}</NavLink>
            </h4>
          </div>
        ) : null
      }
      <div className='flex justify-center items-center relative'>
        {
        Object.keys(books).length > 0 ? 
          <SearchBar 
            activeSearch={activeSearch} setActiveSearch={setActiveSearch}
            screenSize={screenSize} data={books}  
          /> 
        : 
          null
        }
        {!activeSearch ? 
          <div 
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg ml-3"
            onClick={isLoggedIn ? toggleCard : redirect}
          >
            <img src={user} alt="user icon" className='w-8 h-8' />
            {
              isLoggedIn ? (
                <p>
                  <span className='text-gray-400 text-14 hidden md:contents'>Welcome Back,</span> {' '}
                  <span className='text-gray-400 font-bold ml-1 text-14 hidden md:contents'>{username}</span>
                </p>
              ) : null
            }
            <img src={downArrow} alt="down arrow icon" className='w-4 h-4' />
          </div> : null
        }
      </div>      
    </div>
  )
}

export default Navbar