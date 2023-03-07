import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { comment, favorite, bookmark } from '../assets'
import axios from 'axios'
import './css/Contact.css'

function Book({ activeMenu, user, url, offline }) {
    const [book, setBook] = useState({});
    const [commentText, setCommentText] = useState("");
    const [display, setDisplay] = useState("sympnosis")

    const location = useLocation();
    let comments;
    const inputStyle = { color: '#fff' };
    const textStyle = { color: 'var(--red)', fontSize: '20px' };
    const lineStyle = { background: 'var(--red)' };
    const buttonStyle = {
      border: 'none',
      padding: '7px 35px',
      cursor: 'pointer',
      background: '#f83038',
      outline: 'none',
      color: '#fff',
      fontSize: '18px',
      borderRadius: '2px'
    }

    useEffect(() => {
      axios({
        method: "GET",
        withCredentials: true,
        url: `${url}/api/books${location.pathname}`
      })
      .then((res) => {
        var book = res.data;
        setBook(book);
      })
      .catch(handleErrors)
    }, []);

    function handleErrors(err) {
        if(err.response) {
            console.log('Problem With Response', err.response.status)
        } else if(err.request) {
            console.log('Problem With Request')
        } else {
            console.log('Error', err.message)
        }
    }
    function handleSubmit(e) {
      e.preventDefault();
      axios.post(`${url}/api/books${location.pathname}/comments` , {
                authur: user._id,
                name: user.username,
                text: commentText
            })
            .then((res) => {
              console.log("success");
            })
            .catch(handleErrors);
      
      setCommentText("");
      setBook(
        { ...book, 
          comments: [...book.comments, {
            authur: user._id,
            authurName: user.username,
            text: commentText,
            date: Date.now()
          }]
        }
      )
      
    }

    const sympnosis = (
      <p className='text-black text-lg font-medium text-center bg-white p-2'>{book.sympnosis}</p>
    );
    if(book.comments !== undefined) {
      comments = book.comments.slice(0).reverse().map((comment, i) => (
        <div key={comment._id || i} className="flex flex-col text-black w-full p-2 bg-white text-lg my-2">
          <div>
            { book.comments ? 
              <p className='font-semibold'>
                <span className=' opacity-80 '>
                  {comment.authurName}
                </span> - <span className='opacity-60 italic'>{
                  String(comment.date).slice(0, 10)}
                </span>
              </p>
            : <p>...</p> }
          </div>
          <div className='my-4'>
            { book.comments ? 
              <p>{comment.text}</p>
            : <p>...</p>}
          </div>
          <div>
            <p className={`font-semibold opacity-60 italic`}>Verified User</p>
          </div>
        </div>
      ))
    };
    const genreDisplay = (
      <div className="flex justify-center items-center w-full flex-wrap mt-3 md:hidden">
        {book.genres ?
          book.genres.map((genre, i) => (
            <p key={`${genre}-${i}`} className="text-white font-bold text-base mx-1 my-1 py-1 px-2 bg-slate-500 rounded-lg">{genre}</p>
          ))
        : null}
      </div>
    );
    const interiorGenreDisplay = (
      <div className="md:flex justify-center items-center w-full flex-wrap mt-1 hidden">
        {book.genres ?
          book.genres.map((genre, i) => (
            <p key={`${genre}-${i}`} className="text-white font-bold text-base mx-1 my-1 py-1 px-2 bg-slate-500 rounded-lg">{genre}</p>
          ))
        : null}
      </div>
    )
    const commentForm = (
      <form onSubmit={handleSubmit} className='bg-white w-full' >
        <div className='container p-4'>
          <div className='row100' >
            <div className="col">
              <div className="inputBox textarea">
                <textarea value={commentText} required='required' onChange={(e) => setCommentText(e.target.value)} style={inputStyle}></textarea>
                <span className='text' style={textStyle}>Enter Comment Here...</span>
                <span className='line' style={lineStyle}></span>
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" style={buttonStyle} className=' ml-2 mt-2' />
        </div>
      </form>
      // border: none;
      // padding: 7px 35px;
      // cursor: pointer;
      // background: #45f3ff;
      // outline: none;
      // color: #000;
      // font-size: 18px;
      // border-radius: 2px;
    )

  return (
    <div 
      className='flex my-16 p-4 md:my-2 lg:overflow-hidden lg:my-0 lg:justify-center lg:items-center lg:p-6 xl:p-8 2xl:p-10'
      style={{height: 'calc(100vh - 56px'}}
    >
    <div className={`${activeMenu ? 'md:ml-72' : ''} w-full lg:basis-3/5`}>
      <div className='flex items-start'>
        <div className="w-28 lg:w-36 lg:h-44 h-36 bg-slate-200">
            {/* <img src="" alt="book image" /> */}
        </div>
        <div className="flex flex-col p-2 ml-2 h-36 relative lg:h-44">
          <h1 className='text-2xl font-bold '>{book.name}</h1>
          <p className='text-lg font-light italic'>{book.author}</p>
            {interiorGenreDisplay}
          <div className=" left-2 flex absolute bottom-0 font-bold text-lg">
            <div className="flex">
              <img src={favorite} alt="star icon" className='w-5 mr-1' />
              <p>{book.rating}</p>
            </div>
            <div className="flex ml-3">
              <img src={bookmark} alt="bookmark icon" className='w-5 mr-1' />
              {book.currentlyReading ? <p>{book.currentlyReading.length}</p> : <p>...</p>}
            </div>
            <div className="flex ml-3">
              <img src={comment} alt="comment icon" className='w-5 mr-1' />
              {book.comments ? <p>{book.comments.length}</p> : <p>...</p>}
            </div>
          </div>
        </div>
      </div>
        {genreDisplay}
      <div className='my-3'>
        <div className="flex">
          <button className='w-full py-3 bg-th-red font-semibold text-lg rounded-md'>Read</button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex bg-slate-500 p-4">
          <div 
            className={`mx-2 py-3 px-6 font-semibold cursor-pointer text-lg rounded-md ${display === "sympnosis" ? 'bg-th-red' : 'bg-slate-400'}`}
            onClick={() => setDisplay("sympnosis")}
          >
            <p>Sympnosis</p>
          </div>
          <div
            className={`mx-2 py-3 px-6 font-semibold cursor-pointer text-lg rounded-md ${display === "comments" ? 'bg-th-red' : 'bg-slate-400'} lg:hidden`}
            onClick={() => setDisplay("comments")}
          >
            <p>Comments</p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full bg-gray-300 p-4 flex-col mb-4">
          {display === "comments" ? commentForm : null}
          {display === "sympnosis" ? sympnosis : comments}
        </div>
      </div>
      
    </div>
      <div 
        className=
          "hidden lg:block ml-4 basis-2/5 2xl:ml-10 overflow-hidden overflow-y-scroll rounded-lg p-6 bg-slate-600 scrollbar-thin scrollbar-track-white scrollbar-thumb-th-red"
        style={{height: '650px'}}
      >
        <div className=''>
          <div className="flex bg-slate-500 p-4">
            <div
                className={`mx-2 py-3 px-6 font-semibold cursor-pointer text-lg rounded-md bg-th-red`}
              >
                <p>Comments</p>
              </div>
          </div>
          <div className="flex justify-center items-center w-full bg-gray-300 p-4 flex-col">
            { commentForm }
            { comments } 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book