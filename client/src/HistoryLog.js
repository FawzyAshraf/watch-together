import React from 'react'

function HistoryLog({ history, handleHistoryIndex }) {
    return (
        <>
            <ul>
                {history.map((item, idx) => {
                    return <li key={idx} onClick={() => handleHistoryIndex(idx)}>
                        At {item.time}: {item.action} {item.videoTime}
                    </li>
                })}
            </ul>
        </>
    )
}

export default HistoryLog