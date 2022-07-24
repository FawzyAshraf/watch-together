import React from 'react'

function Register({ socket }) {
    const submitData = async (event) => {
        event.preventDefault();
        const username = event.target.username.value, roomName = event.target.roomName.value;
        if (username !== '' && roomName !== '') {
            await socket.emit('registerUser', { username, roomName });
        }
    }

    return (
        <>
            <form onSubmit={submitData}>
                <input type="text"
                    placeholder='Name'
                    name='username'
                    id='username'
                />

                <input type="text"
                    name='roomName'
                    id='roomName'
                    placeholder='Room'
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Register