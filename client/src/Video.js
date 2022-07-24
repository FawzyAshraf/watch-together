import React, { useEffect, useRef } from 'react'

function Video({ socket, leader, roomName, history, historyIndex, handleHistoryIndex }) {
    const videoElement = useRef(null);

    const playFun = async () => {
        await socket.emit('videoChange', { leader, roomName, action: 'PLAY', time: videoElement.current.currentTime })
    }

    const pauseFun = async () => {
        await socket.emit('videoChange', { leader, roomName, action: 'PAUSE', time: videoElement.current.currentTime })
    }

    const seekedFun = async () => {
        await socket.emit('videoChange', { leader, roomName, action: 'SEEK', time: videoElement.current.currentTime })
    }

    useEffect(() => {
        const handleData = data => {
            switch (data.action) {
                case 'PLAY':
                    videoElement.current.play();
                    break;
                case 'PAUSE':
                    videoElement.current.pause();
                    break;
                case 'SEEK':
                    videoElement.current.currentTime = data.time;
                    break;
                default:
                    break;
            }

        };
        socket.on('updateVideo', data => handleData(data));

        return () => {
            socket.off('updateVideo', data => handleData(data));
        }
    }, [socket])

    useEffect(() => {
        if (historyIndex !== -1) {
            const { action, videoTime } = history[historyIndex]
            if (action === 'PLAY')
                videoElement.current.play();
            else if (action === 'PAUSE')
                videoElement.current.pause();
            videoElement.current.currentTime = videoTime
        }

        return (() => {
            handleHistoryIndex(-1);
        })
    }, [historyIndex, history, handleHistoryIndex])

    return (
        <>
            <video
                controls={socket.id === leader}
                src="https://storkyappstatic.s3.eu-west-1.amazonaws.com/uploads/sessionDox/file_example_MP4_640_3MG.mp4"
                width="800px"
                height="600px"
                onPlay={playFun}
                onSeeked={seekedFun}
                onPause={pauseFun}
                ref={videoElement}
            >

            </video>
        </>
    )
}

export default Video