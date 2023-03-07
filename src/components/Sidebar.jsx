import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { sideLinks } from '../constants'

function Sidebar({ activeMenu, setActiveMenu, screenSize, random }) {
    const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 font-semibold";
    const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-black text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
    
    function toggleCloseSidebar() {
        if(activeMenu && screenSize <= 900) setActiveMenu(false);
    }
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        {activeMenu && (
            <>
                <div className="flex justify-between items-center">
                    <Link 
                        to='/' 
                        onClick={toggleCloseSidebar} 
                        className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                    >
                        <span>{sideLinks.title}</span>
                    </Link>
                    <button 
                        type='button' 
                        onClick={() => {setActiveMenu(false)}}
                        className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                        style={{color: '#000'}}
                    >
                        X
                    </button>
                </div>
                <div className="mt-10">
                    {sideLinks.links.map((item) => (
                        <div key={item.title}>
                            <p className='text-gray-400 m-3 mt-4 uppercase'>
                                {item.title}
                            </p>
                            {item.links.map((link) => (
                                <NavLink
                                    to={`/${link.ref == 'random' ? random : link.ref}`}
                                    key={link.name}
                                    onClick={toggleCloseSidebar}
                                    className={({ isActive }) => isActive ? activeLink : normalLink}
                                    style={({ isActive }) => isActive ? {backgroundColor: 'var(--blue)'} : null}
                                >
                                    <img 
                                        src={link.icon}
                                        alt={`${link.name} icon`}
                                        style={{width: '30px'}}
                                    />
                                    <span className='capitalize mr-5'>{link.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Sidebar