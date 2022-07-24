import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import HistoryLog from './HistoryLog';
import Members from './Members';
import Register from './Register';
import Video from './Video';

const socket = io.connect('http://localhost:8000');
function App() {
	const [roomInfo, setRoomInfo] = useState({}); //[{name:String, leader:String, members:[String], creationTime:Int, history:[{action, videoTime, time}]}]
	const [registered, setRegistered] = useState(false);
	const [historyIndex, setHistoryIndex] = useState(-1);

	const handleHistoryIndex = idx => {
		if (socket.id === roomInfo.leader)
			setHistoryIndex(idx)
	};

	useEffect(() => {
		socket.on('updateRoomInfo', data => {
			console.log(data.roomInfo.history);
			setRoomInfo(data.roomInfo);
			setRegistered(true);
		});

		return () => {
			socket.off('updateRoomInfo',);
		}
	}, []);

	return (
		<>
			{registered ?
				<>
					<Members members={roomInfo.members} />
					<Video
						socket={socket}
						leader={roomInfo.leader}
						roomName={roomInfo.name}
						history={roomInfo.history}
						historyIndex={historyIndex}
						handleHistoryIndex={handleHistoryIndex} />
					<HistoryLog
						history={roomInfo.history}
						handleHistoryIndex={handleHistoryIndex}
					/>
				</>
				:
				<Register socket={socket} />
			}
		</>
	);
}

export default App;
