import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminRec, filterGenre } from '../constants'

function Homepage({ books, activeMenu }) {
        const [tag, setTag] = useState("action")

        const rand = books[Math.floor(Math.random() * books.length)];
        const now = () => {
            let bookArr = books.map(book => book);
            return bookArr.slice(books.length - 10, books.length)
        };
        const filter = () => {
            let bookArr = [];
    
            books.map(book => (
                book.genres.map((genre, i) => (
                    genre.toLowerCase() === tag ? bookArr.push(book) : null
                ))
                // book.genres.includes(tag) ? bookArr.push(book) : null
            ));
            return bookArr.slice(0, 20);
        }

        const recent = now();
        const filteredBooks = filter();
    return (
        <div className={
            `
                p-6 my-4 mt-14 md:mt-5 md:p-5 xl:p-7 xl:px-12
                ${activeMenu ? 'md:ml-72' : ''}
            `
        }>
            {rand != undefined ? <AdminReccomendation book={rand}/> : null}
            {recent.length > 0 ? <RecentlyAdded books={recent} /> : null}
            {books.length > 0 ? <TagsBrowse books={filteredBooks} tag={tag} setTag={setTag}/> : null}
        </div>
    )
}



const AdminReccomendation = ({ book }) => {
    const rec = (
        <div className="flex justify-start items-center flex-col md:flex-row">
            <div className="basis-4/4 w-full md:basis-2/3">
                <h1 className='text-xl p-2 bg-th-blue font-semibold md:text-2xl'>Admin Recommendation</h1>
                <div className="flex justify-start items-center p-2 bg-white text-black">
                    <div className="w-20 h-24 bg-slate-700">
                        {/* <img src="" alt="Recommendation Pic" /> */}
                    </div>
                    <div className="flex justify-start p-2 flex-col text-sm md:text-lg">
                        <Link
                            to={book._id}
                        >
                            <h3 className='text-lg text-th-red font-extrabold'>
                                {book.name}
                            </h3>
                        </Link>
                        <p>
                            {adminRec.year}
                            <span className='text-cu-blue'>
                                2012
                            </span>
                        </p>
                        <p>
                            {adminRec.series}
                            <span className='text-cu-blue'>
                                {book.part}
                            </span>
                        </p>
                        <p>
                            {adminRec.genres}
                            {book.genres.map((genre, i) => (
                                <span key={`${genre}-${i}`} className='text-cu-blue'>
                                    {i != book.genres.length - 1 ? `${genre}, ` : genre}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            <div className="basis-4/4 w-full h-36 mt-5 bg-th-blue md:basis-1/3 md:mt-0 md:ml-5 md:h-48">
                {/* <img src="" alt="Banner PlaceHolder" /> */}
            </div>
        </div>
    );
   return ( <div>{rec}</div> ) 
}

const RecentlyAdded = ({ books }) => {
        const recentList = (
            <div className="flex justify-center itemss-center flex-wrap bg-white md:py-2">
                {books.map((book, i) => (
                    <Link
                        key={book._id}
                        to={book._id}
                        className='cursor-default'
                    >
                        <div className="h-48 w-36 bg-th-dark-2 m-2 p-2 relative lg:h-72 lg:w-52 lg:m-4 hover:cursor-pointer">
                            <p className='text-white text-lg font-semibold absolute bottom-0 mx-1 mb-1 z-0'>{book.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    return (
        <div className='my-4'>
            <h1 className='text-xl p-2 bg-th-blue font-semibold md:text-2xl'>Recently Added</h1>
            {recentList}
        </div>
    )
}

const TagsBrowse = ({ tag, setTag, books }) => {
        const tags = filterGenre.genres.map((genre, i) => (
            <h3
                key={genre.state} 
                className={`text-cu-blue cursor-pointer ${tag === genre.state ? 'text-2xl md:text-xl font-bold' : 'text-xl md:text-lg '}`}
                onClick={() => setTag(genre.state)}
            >
                {genre.name}
                {i != filterGenre.genres.length - 1 ? <span className='mx-3 cursor-default text-black'>/</span> : null}
            </h3>
        ));
        const bookList = books.map((book, i) => (
            <div key={book._id} className="text-black flex basis-2/2 w-full py-2 px-4 md:basis-1/2 xl:basis-1/3">
                <div className="bg-slate-700 w-1/4 h-28 2xl:w-1/5">
                    {/* <img src="" alt="book pic" /> */}
                </div>
                <div className="flex justify-center flex-col px-4 py-2 bg-slate-200 w-3/4 2xl:w-4/5">
                    <Link
                        to={book._id}
                    >
                        <h3 className='text-th-red font-semibold text-xl'>{book.name}</h3>
                    </Link>
                    <p className='text-lg'>Order In Series: <span className='text-cu-blue'>{book.part}</span></p>
                    {book.currentlyReading.length < book.bookSize ?
                        <p className='text-lg font-bold text-green-500'>Available</p>
                    :
                        <p className='text-lg font-bold text-red-500'>Unavailable</p>
                    }
                </div>
            </div>
        ))

    return (
        <div className="">
            <div className="flex justify-center items-center w-full bg-white h-16 flex-wrap px-3">
                {tags}
            </div>
            <div className="mt-4 w-full">
                <h1 className='text-xl p-2 bg-th-blue font-bold md:text-2xl capitalize'>{tag}</h1>
                <div className="w-full bg-white flex flex-wrap justify-center items-center md:py-2">
                    {bookList}
                </div>
            </div>
        </div>
    )
}
export default Homepage