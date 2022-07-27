import React from 'react'

function HistoryLog({ history, handleHistoryIndex }) {
    return (
        <div className='history-log'>
            <h3>History Log</h3>
            <ul>
                {history.map((item, idx) => {
                    return <li key={idx} onClick={() => handleHistoryIndex(idx)}>
                        At {Math.floor(item.time / 1000)}s: {item.action} {Math.floor(item.videoTime)}s
                    </li>
                })}
            </ul>
        </div>
    )
}

export default HistoryLog