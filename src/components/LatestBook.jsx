import React from 'react'
import './css/LatestBook.css'

const LatestBook = ({ book }) => {
  return (
    <div className="recentContainer">
        <h2>Recently Added Books</h2>
        <div className='latest'>
            <div className='imgBlock'>                    
            </div>
            <div className="txtBlock">
                <h3>{book.name}</h3>
                <a href={`${book.bookLink}`}>Read...</a>
        </div>
    </div>

    </div>
  )
}

export default LatestBook