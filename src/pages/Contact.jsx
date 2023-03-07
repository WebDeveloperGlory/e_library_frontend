import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { contactFields, requestFields } from '../constants'
import './css/Contact.css'

function Contact({ activeMenu, displayedForm, setDisplayedForm, user }) {
    const buttonClass = "h-5 w-5 rounded-sm ml-2 cursor-pointer";
    const navigate = useNavigate();

    const handleClick = () => {
        displayedForm === "contact" ? setDisplayedForm("request") : setDisplayedForm("contact");
        displayedForm === "contact" ? navigate('/request', { replace: true }) : navigate('/contact_us', { replace: true })
    }

  return (
    <div className={`flex justify-center items-center flex-col relative ${activeMenu ? 'md:ml-72' : ''}`} style={{minHeight: 'calc(100vh - 56px'}}>
        <div className="flex justify-center items-center absolute top-24 md:top-10 right-10">
            <div 
                className={`${buttonClass} ${displayedForm === "request" ? 'bg-cu-glowy-blue animate-bounceDelay' : 'bg-white animate-bounce'}`} 
                onClick={handleClick}
            ></div>
            <div
                className={`${buttonClass} ${displayedForm === "contact" ? 'bg-cu-glowy-blue animate-bounceDelay' : 'bg-white animate-bounce'}`}
                onClick={handleClick}
            ></div>
        </div>
        {
            displayedForm === "contact" ?
                <ContactUs userEmail={user} />
            :
                <RequestBook userEmail={user} />
        }
    </div>
  )
}

const ContactUs = () => {
        const [firstName, setFirstName] = useState("");
        const [secondName, setSecondName] = useState("");
        const [email, setEmail] = useState("");
        const [msg, setMsg] = useState("");

        const firstSection = contactFields.firstSection.map((field, i) => (
            <div key={field.id} className="col">
                <div className="inputBox">
                    <input
                        type="text"
                        value={i === 0 ? firstName : secondName}
                        required="required"
                        onChange={(e) => i === 0 ? setFirstName(e.target.value) : setSecondName(e.target.value)}
                    />
                    <span className='text'>{field.title}</span>
                    <span className='line'></span>
                </div>
            </div>
        ));
        const secondSection = contactFields.secondSection.map((field) => (
            <div key={field.id} className="col">
                <div className="inputBox">
                    <input type="text" value={email} required="required" onChange={(e) => setEmail(e.target.value)} />
                    <span className='text'>{field.title}</span>
                    <span className='line'></span>
                </div>
            </div>
        ));
        const thirdSection = contactFields.thirdSection.map((field) => (
            <div key={field.id} className="col">
                <div className="inputBox textarea">
                    <textarea value={msg} required='required' onChange={(e) => setMsg(e.target.value)}></textarea>
                    <span className='text'>{field.title}</span>
                    <span className='line'></span>
                </div>
            </div>
        ))
    return (
        <div className='container'>
            <h3>{contactFields.title}</h3>
            <div className='row100' >
                {firstSection}
            </div>
            <div className="row100">
                {secondSection}
            </div>
            <div className="row100">
                {thirdSection}
            </div>
            <div className="row100">
                <div className="col">
                    <input type="submit" value="Send" />
                </div>
            </div>
        </div>
    )
}

const RequestBook = ({ userEmail }) => {
        const [firstName, setFirstName] = useState("");
        const [secondName, setSecondName] = useState("");
        const [email, setEmail] = useState("");
        const [title, setTitle] = useState("");
        const [image, setImage] = useState("");
        const [link, setLink] = useState("");

    return (
        <div className="container mt-20 md:mt-0">
            <h3>{requestFields.title}</h3>
            <div className='row100' >
                <div className="col">
                    <div className="inputBox">
                        <input value={firstName} required='required' onChange={(e) => setFirstName(e.target.value)}></input>
                        <span className='text'>{requestFields.fields[0].title}</span>
                        <span className='line'></span>
                    </div>
                </div>
                <div className="col">
                    <div className="inputBox">
                        <input value={secondName} required='required' onChange={(e) => setSecondName(e.target.value)}></input>
                        <span className='text'>{requestFields.fields[1].title}</span>
                        <span className='line'></span>
                    </div>
                </div>
            </div>
            <div className='row100' >
                <div className="col">
                    <div className="inputBox">
                        <input value={userEmail != undefined ? email : userEmail} required='required' onChange={(e) => setEmail(e.target.value)}></input>
                        <span className='text'>{requestFields.fields[2].title}</span>
                        <span className='line'></span>
                    </div>
                </div>
                <div className="col">
                    <div className="inputBox">
                        <input value={title} required='required' onChange={(e) => setTitle(e.target.value)}></input>
                        <span className='text'>{requestFields.fields[3].title}</span>
                        <span className='line'></span>
                    </div>
                </div>
            </div>
            <div className='row100' >
                <div className="col">
                    <div className="inputBox">
                        <input value={image} required='required' onChange={(e) => setImage(e.target.value)}></input>
                        <span className='text'>{requestFields.fields[4].title}</span>
                        <span className='line'></span>
                    </div>
                </div>
                <div className="col">
                    <div className="inputBox">
                        <input value={link} required='required' onChange={(e) => setLink(e.target.value)}></input>
                        <span className='text'>{requestFields.fields[5].title}</span>
                        <span className='line'></span>
                    </div>
                </div>
            </div>
            <div className="row100">
                <div className="col">
                    <input type="submit" value="Send" />
                </div>
            </div>
        </div>
    )
}

export default Contact