import React from 'react'

function Members({ members }) {
    return (
        <>
            <div className='members-list'>
                <h3>Members</h3>
                <ul>
                    {members.map((member, idx) => <li key={idx}>{member}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Members