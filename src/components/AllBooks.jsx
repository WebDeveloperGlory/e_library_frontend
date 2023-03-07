import React from 'react'
import './css/AllBooks.css'

const AllBooks = ({ bookList }) => {
    const books = Object.keys(bookList).map((book, i) => (
        <div key={bookList[book]._id} className="book">
            <div className="top">

            </div>
            <div className="bottom">
                
            </div>
            <p>{bookList[book].name}</p>
            <a href={`${bookList[book].bookLink}`}>Read...</a>
            <ul>
                <li>
                    {bookList[book].currentlyReading.map(user => <p key={user._id}>{user.username}</p>)}
                </li>
            </ul>
            <ul>
                <li>
                    {bookList[book].comments.map(comment => <p key={comment._id}>{comment.text}</p>)}
                </li>
            </ul>
            <p>{bookList[book].date}</p>
        </div>
    ));

  return (
    <div className="placeholder">
        {books}
    </div>
  )
}

export default AllBooks