import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import SocketIOClient from 'socket.io-client';
import Text from '@components/atoms/Text';
export default function Test() {
  const socket = null;

  useEffect(() => {
    const socket = SocketIOClient('https://chat.kiwes.org/');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('chat message', msg => {
      console.log('New message:', msg);
    });
  }, []);

  const sendMessage = msg => {
    socket?.emit('chat message', msg);
  };
  // const connectSocket = () => {
  //   const socket = socketIO('http://localhost:4000', {
  //     transports: ['websocket'],
  //     jsonp: false,
  //   });
  //   socket.connect();
  //   socket.on('connect', () => {
  //     console.log('connected to socket server');
  //   });
  //   socket.on('disconnected', () => {
  //     console.log('asdfasdfsadf');
  //   });
  // };
  return (
    <View>
      <Text>Chat App</Text>

      <Button
        title={'버튼'}
        onPress={() => {
          sendMessage('s;');
        }}
      />
    </View>
  );
}
// import React, {useEffect} from 'react';
// import {View} from 'react-native';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:4000'; // 서버의 URL로 대체해야 합니다.
// console.log('------------------------------------');
// const Test = () => {
//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);

//     socket.on('connect', () => {
//       console.log('Connected to Socket.io server');
//     });

//     socket.on('chat message', message => {
//       console.log('Received message:', message);
//       // 여기서 메시지를 처리하고 화면에 표시하는 등의 작업을 수행합니다.
//     });

//     return () => {
//       // 컴포넌트가 언마운트되면 소켓 연결을 종료합니다.
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View>
//       <Text>Chat App</Text>
//     </View>
//   );
// };

// export default Test;
