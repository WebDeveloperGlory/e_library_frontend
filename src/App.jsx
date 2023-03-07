import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Navbar, Auth, Sidebar } from './components'
import { Homepage, Profile, Contact, Book } from './pages'
import { styles } from './styles'
import { myProfile } from './constants'
import './components/css/Animations.css'
import './App.css'

const Test = () => (<div>Testing, testing</div>)

function App() {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [userData, setUserData] = useState({});
  const [updateUser, setUpdateUser] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeSearch, setActiveSearch] = useState(false);
  const [displayedForm, setDisplayedForm] = useState("contact");

  const navigate = useNavigate();
  const url = "https://e-library-server-webdeveloperglory.onrender.com";
  const offline = "http://localhost:8081";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user) {
      setUserData(user);
      setIsLoggedIn(true);
    } else {
      setUserData({})
    };
  }, [isLoggedIn]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user) {
      setUserData(user);
      setIsLoggedIn(true);
    } else {
      setUserData({})
    };
  }, [updateUser]);

  useEffect(() => {
    // Function to setScreenSize to width of device browser
    const handleResize = () => setScreenSize(window.innerWidth);
    // call handleResize whenever browser/device size changes
    window.addEventListener('resize', handleResize);
    // calls handleResize function at least once per load
    handleResize();
    // removes the windows event listener due to react specifications
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      await axios({
        method: "GET",
        withCredentials: true,
        url: `${url}/api/books`
      })
        .then((res) => {
            var books = res.data.books;
            // console.log(books);
            setBooks(books);
            setLoading(false);
        })
        .catch(handleErrors);
      }

      dataFetch();
  }, [])

  function logout() {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${url}/api/auth/logout`
    }).then((res) => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      console.log(res.data.message);
    })
    .catch(handleErrors);
    
    // Redirect back to homepage
    navigate('/', { replace: true });
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
  let rand;
  books.length > 0 ? rand = books[Math.floor(Math.random() * books.length)]._id : null;

  if(isLoading) {
    return <Test />
  } else {
    return (
      <div>
        {
          activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg z-10 bg-white' style={{transition: '0.5s'}}>
              <Sidebar 
                activeMenu={activeMenu} setActiveMenu={setActiveMenu}
                screenSize={screenSize} random={rand}
              />
            </div>
          ) : (
            null
          )
        }
        <div className={`dark:bg-main-bg bg-main-bg ${activeMenu ? 'md:ml-72 sm:ml-72' : 'flex-2'}`}>
          <div className={`fixed md:static bg-inherit dark:bg-main-dark-bg navbar w-full z-10`}>
            <Navbar 
              username={userData.username} 
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
              showUserCard={showUserCard} setShowUserCard={setShowUserCard}
              setActiveMenu={setActiveMenu} activeMenu={activeMenu}
              logout={logout} screenSize={screenSize}
              activeSearch={activeSearch} setActiveSearch={setActiveSearch}
              books={books}
            />
          </div>
        </div>
        <header className={`${styles.flex} flexCol`}>
          {showUserCard ? <UserCard userData={userData} setShowUserCard={setShowUserCard} logout={logout}/> : null}
        </header>

        <div>
          <Routes>
            <Route path='/' element={<Homepage books={books} activeMenu={activeMenu}/>} />
            <Route path='/test' element={<Test />} />
            {
              isLoggedIn ? 
                <>
                  <Route path='/request' element={<Contact request={"true"} user={userData.email} activeMenu={activeMenu} displayedForm={displayedForm} setDisplayedForm={setDisplayedForm}/>} />
                  <Route path='/user' element={<Profile user={userData} activeMenu={activeMenu} updateUser={setUpdateUser} />} />
                </> 
              :
                <>
                  <Route path='/signup' element={<Auth r={"sign"} url={url} offline={offline} />} />
                  <Route path='/login' element={<Auth r={"log"} setIsLoggedIn={setIsLoggedIn} url={url} offline={offline} />} />
                </>
            }
            <Route path='/contact_us' element={<Contact request={"false"} user={userData.email} activeMenu={activeMenu} displayedForm={displayedForm} setDisplayedForm={setDisplayedForm}/>} />
            <Route path='/:id' element={<Book activeMenu={activeMenu} user={userData} url={url} offline={offline} />} />
          </Routes>
        </div>
      </div>
    )
  }
}
const UserCard = ({ userData, setShowUserCard, logout }) => {
  return (
    <div className={`userCard md:top-0 z-10 fixed`}>
      <div className="lines"></div>
      <div className={`content ${styles.flex} ${styles.flexCol}`}>
        <div className="head flex">
          <h3>{myProfile.dropdownHead}</h3>
          <button onClick={() => setShowUserCard(false)}>X</button>
        </div>
        <div className={`topSection ${styles.flex} ${styles.flexRow}`}>
          <div className="picBlock">

          </div>
          <div className="textBlock flex flexCol">
            <h3>{userData.username}</h3>
            <div>
              <h4>{userData.role}</h4>
              <p>{myProfile.dropdownPoints} <span>{userData.points}</span></p>
            </div>
          </div>
        </div>
        <div className={`middleSection ${styles.flex} ${styles.flexCol}`}>
          <div className="top flex flexRow">
            <div className="iconDiv"></div>
            <div className="txtDiv">
              <h4>{myProfile.dropdown[0].title}</h4>
              <p><Link to='/user' >{myProfile.dropdown[0].subTitle}</Link></p>
            </div>
          </div>
          <div className="mid flex flexRow">
            <div className="iconDiv"></div>
              <div className="txtDiv">
                <h4>{myProfile.dropdown[1].title}</h4>
                <p><Link to='/user' >{myProfile.dropdown[1].subTitle}</Link></p>
            </div>
          </div>
          <div className="last flex flexRow">
            <div className="iconDiv"></div>
              <div className="txtDiv">
                <h4>{myProfile.dropdown[2].title}</h4>
                <p><Link to='/request' >{myProfile.dropdown[2].subTitle}</Link></p>
            </div>
          </div>
        </div>
        <div className={`bottomSection ${styles.flex} ${styles.flexC}`}>
          <button onClick={() => {
            logout()
            setShowUserCard(false)
          }}>Logout</button>
        </div>
      </div>
    </div>
  )
}
// 53 lines of code, 172lines of css
export default App