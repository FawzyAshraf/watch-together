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
        <div>
            <form onSubmit={submitData} className="login-form">

                <div className="welcoming-message">
                    <h3>Join A Room</h3>
                    <p>If the room doesn't exist it will be created for you</p>
                </div>

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
                <button type='submit' className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default Register