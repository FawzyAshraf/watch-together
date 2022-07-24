import React from 'react'

function Members({ members }) {
    return (
        <>
            <h3>Connected Members</h3>
            <ul>
                {members.map((member, idx) => <li key={idx}>{member}</li>)}
            </ul>
        </>
    )
}

export default Members