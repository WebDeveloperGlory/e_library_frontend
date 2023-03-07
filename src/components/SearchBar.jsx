import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { search, close, comment, bookmark } from '../assets';
import { Expire } from '.'

function SearchBar({ data, screenSize, activeSearch, setActiveSearch }) {
    const [filteredData, setFilteredData] = useState([]);
    const [formInput, setFormInput] = useState("");
    const [showTemplate, setShowTemplate] = useState(false);
    const [desktopActiveSerch, setDesktopActiveSerch] = useState(false);

    const searchIcon = "w-6 h-6 ml-3 cursor-pointer";
    const inputStyles = "w-72 absolute right-0 h-9 p-2 focus:border focus:border-orange-500 rounded-xl bg-slate-100 focus:outline-none md:block xl:focus:w-760";

    const handleFilter = (e) => {
        setFormInput(e.target.value);
        const filter = data.filter(data => data.name.toLowerCase().includes(formInput.toLowerCase()));

        if(formInput === "") {
          setFilteredData([]);
          setShowTemplate(false);
        } else {
          setFilteredData(filter);
        }
    }
    const clearFormInput = () => {
      setFilteredData([]);
      setFormInput("");
      setActiveSearch(false);
      setDesktopActiveSerch(false);
    }
    const openSearch = () => {
      setActiveSearch(true)
    }

    const searchResults = filteredData.slice(0, 15).map((data) => (
      <div key={data._id} className="mt-2">
        {/* <div className='flex justify-between items-center'>
          <h3 className='font-bold text-3xl'>Manga</h3>
          <img src={search} alt="search icon" className={searchIcon} onClick={!activeSearch && screenSize < 760 ? openSearch : null}/> 
        </div> */}
        <div className='mt-5'>
          <div className="flex w-full bg-slate-700 p-2">
            <div className="w-20 h-28 bg-black">
              {/* <img src="" alt="" /> */}
            </div>
            <div className="py-1 px-3 text-2xl font-semibold">
              <h3>{data.name}</h3>
              <div className="flex justify-start items-center mt-1">
                <div className="flex justify-center items-center">
                  <img src={bookmark} alt="bookmark icon" className='w-6 h-6 mr-2' />
                  <p>{data.bookSize}</p>
                </div>
                <div className="flex justify-center items-center ml-3">
                  <img src={comment} alt="comments icon" className='w-6 h-6 mr-2' />
                  <p>{data.comments.length}</p>                
                </div>
              </div>
              <Link 
                to={data._id}
                className='mt-1'
                onClick={clearFormInput}
              >
                <p>Read Here...</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))
    const template = (
      <div className='ml-4 p-2'>
        <div className="w-20 h-5 bg-slate-700 rounded-lg mt-2 animate-pulse"></div>
        <div className="w-full h-12 bg-slate-700 rounded-lg mt-5 animate-pulse"></div>
        <div className="w-full h-12 bg-slate-700 rounded-lg mt-5 animate-pulse"></div>
        
        <div className="w-20 h-5 bg-slate-700 rounded-lg mt-2 animate-pulse"></div>
        <div className="w-full h-12 bg-slate-700 rounded-lg mt-5 animate-pulse"></div>
        <div className="w-full h-12 bg-slate-700 rounded-lg mt-5 animate-pulse"></div>
        
        <div className="w-20 h-5 bg-slate-700 rounded-lg mt-2 animate-pulse"></div>
        <div className="w-full h-12 bg-slate-700 rounded-lg mt-5 animate-pulse"></div>
        <div className="w-full h-12 bg-slate-700 rounded-lg mt-5 animate-pulse"></div>
      </div>
    )
  return (
    <div className='flex justify-center items-center relative'>
      <input 
        type="text" 
        value={formInput} 
        placeholder="Search..." 
        onChange={handleFilter}
        style={{color: '#000'}}
        onClick={( isFocus ) => {isFocus ? setDesktopActiveSerch(true) : null}}
        className={
          `
            ${inputStyles}
            ${activeSearch ? 'relative w-80 mr-0 ml-3 rounded-none sm:w-400 sm:ml-32' : 'hidden'}
            
          `
        }
      />
      <div className='z-10'>
        {
          formInput.length === 0 && !activeSearch ? 
            <img src={search} alt="search icon" className={searchIcon} onClick={!activeSearch && screenSize < 760 ? openSearch : null}/> 
          : 
            <img src={close} alt="close icon" className={`${searchIcon}`} onClick={clearFormInput} /> 
        }
      </div>
      {/* <div>{data.map((data, i) => (<p key={i}>{data.title}</p>))}</div> */}
      <div 
        className={
          `
            absolute p-3 pr-9 w-screen bg-th-dark-1 z-10 
            ${activeSearch ? '-left-2 top-11' : '-left-64 top-10'}
            ${activeSearch || desktopActiveSerch ? 'block' : 'hidden'}
            ${screenSize < 765 ? 'min-h-screen' : 'rounded-xl'}
            ${desktopActiveSerch ? '' : ''}
            
          `
        }
        style={screenSize > 1279 ? {left: '-720px'} : {}}
      >
        {formInput ? <Expire delay={1500} setShowTemplate={setShowTemplate}>{template}</Expire> : template}
        {formInput && showTemplate ? searchResults : null}
      </div>
    </div>
  )
}

export default SearchBar