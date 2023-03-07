import React from 'react'
import { LatestBook, AllBooks } from '.'

const BookPage = ({ bookList }) => {
        const latestBook = bookList[bookList.length - 1];

    return (
        <div className='recent'>
            <LatestBook book={latestBook} />
            <AllBooks bookList={bookList} />        
        </div>
    )        
}

export default BookPage