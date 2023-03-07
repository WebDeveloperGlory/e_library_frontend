import { useState, useEffect } from 'react'
import axios from 'axios'
import './css/Contact.css'

function Profile({ user, activeMenu, updateUser }) {
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:8081/api/users/${user._id}`
      })
        .then((res) => {
          // setData(res)
          localStorage.setItem('user', JSON.stringify(res.data));
          updateUser((prev) => prev+1)

        }).catch(handleErrors)
    }, [])
    
    function handleErrors(err) {
      if(err.response) {
          console.log('Problem With Response', err.response.status)
      } else if(err.request) {
          console.log('Problem With Request')
      } else {
          console.log('Error', err.message)
      }
    }

    const tmp = [];
  return (
    <div className={`mt-16 p-4 ${activeMenu ? 'md:ml-72' : ''} relative`}>
      <UserProfile user={user} editProfile={editProfile} updateUser={updateUser} />
      <History history={user.read || []} />
      <Bookmarks bookmarks={tmp} />
      <EditProfile editProfile={editProfile} setEditProfile={setEditProfile}/>
    </div>
  )
}

const UserProfile = ({ user, editProfile, updateUser }) => {
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");

    function handleSubmit(e) {
      e.preventDefault();
        axios.put(`http://localhost:8081/api/users/${user._id}/email`, {
          username: username,
          email: email
        })
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            updateUser((prev) => prev+1);
            console.log('success')
          })
          .catch(handleErrors);
    }
    function handleErrors(err) {
      if(err.response) {
          console.log('Problem With Response', err.response.status)
      } else if(err.request) {
          console.log('Problem With Request')
      } else {
          console.log('Error', err.message)
      }
    }

    const textStyle = { color: 'var(--red)', fontSize: '20px' };
    const lineStyle = { background: 'var(--red)' };
    const inputStyle = { color: '#fff' };

    const userDetails = (
      <>
        <h3 className='text-th-red text-3xl font-semibold mt-4'>{user.username}</h3>
        <p className='mt-1'>{user.email != undefined ? user.email : 'update-email@edit.profile'}</p>
        <p className='mt-1'>Status: 
          {' '}
          <span 
            className={
              `
                ${user.role == "guest" ? 'text-green-400' : 'text-cu-yellow'}
                text-xl capitalize font-semibold
              `
            }
          >
            {user.role}
          </span>
        </p>
        <p>Points: {' '}<span className='text-xl font-semibold text-cu-yellow'>{user.points}</span></p>
      </>
    );
    const editDetails = (
      <form className='contents' onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row100' >
            <div className="col">
              <div className="inputBox">
                <input value={username} required='required' onChange={(e) => setUsername(e.target.value)} style={inputStyle}></input>
                <span className='text' style={textStyle}>Username</span>
                <span className='line' style={lineStyle}></span>
              </div>
            </div>
            <div className="col">
              <div className="inputBox">
                <input value={email} required='required' onChange={(e) => setEmail(e.target.value)} style={inputStyle}></input>
                <span className='text' style={textStyle}>Email</span>
                <span className='line' style={lineStyle}></span>
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  return (
    <>
      <div className="w-full bg-th-blue">
        <h3 className='text-2xl font-bold p-4'>User Profile</h3>
      </div>
      <div className='w-full bg-white flex items-center flex-col p-4 text-black text-lg'>
        <div className="h-36 w-36 bg-slate-200">
          {/* <img src="" alt="Profile Pic" /> */}
        </div>
        { editProfile ? editDetails : userDetails}
      </div>
    </>
  )
}

const History = ({ history }) => {
    const read = (
      <>
        <p>Read Books</p>
      </>
    )
    const noRead = (
      <h3>No Read Chapters Yet</h3>
    )
  return (
    <>
      <div className="w-full bg-th-blue mt-4">
        <h3 className='text-2xl font-bold p-4'>History</h3>
      </div>
      <div className='w-full bg-white flex items-center flex-col p-4 text-black text-lg'>
        {history.length > 0 ? read : noRead}
      </div>
    </>
  )
}

const Bookmarks = ({ bookmarks }) => {
    const bookmark = (
      <>
        <p>Bookmarked Chapters</p>
      </>
    )
    const noBookmark = (
      <>
        <h3>Feature Not Yet Added</h3>
      </>
    )
  return (
    <>
      <div className="w-full bg-th-blue mt-4">
        <h3 className='text-2xl font-bold p-4'>Bookmarks</h3>
      </div>
      <div className='w-full bg-white flex items-center flex-col p-4 text-black text-lg'>
        {bookmarks.length > 0 ? bookmark : noBookmark}
      </div>
    </>
  )
}

const EditProfile = ({ editProfile, setEditProfile }) => {
  return (
    <div className=''>
      <button 
      type='submit'
        className='bg-th-yellow px-4 py-2 rounded-lg font-semibold text-lg text-black hover:bg-th-red hover:text-white'
        style={{transition: '0.5s'}}
        onClick={() => setEditProfile(prevState => !prevState)}
      >
        {editProfile ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  )
}

export default Profile