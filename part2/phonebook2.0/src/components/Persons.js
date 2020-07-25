import React from 'react'
 const Persons = (persons,clickDelete) => {
    return (
        <li>
            <button onClick = {clickDelete}>delete</button>
        </li>
    )
 }



export default Persons