import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Box, Grid, Typography } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { getAnswer } from '../../apis/api';
interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  avatar: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatMessageLog = chatMessageRef.current;
    if (chatMessageLog) {
      chatMessageLog.scrollTop = chatMessageLog.scrollHeight;
    }
  }, [messages]);

  const handleInputMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents a new line from being added
      handleInputMessageSubmit();
    }
  };

  const handleInputMessageSubmit = async () => {
    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      message: inputMessage,
      isUser: true,
      avatar: 'https://example.com/user-avatar.png',
    };

    setMessages((messages) => [
      ...messages,
      newMessage,
      {
        id: Math.random().toString(36).substring(7),
        message: 'Loading...',
        isUser: false,
        avatar: 'https://example.com/chatbot-avatar.png',
      },
    ]);

    setInputMessage('');

    // Here you can send the inputMessage to the server to get the response
    // Once the response is received, you can update the messages array with the response
    const result = await getAnswer(inputMessage);
    // const result = { response: Math.random().toString() };
    // console.log('result', result);

    const chatbotMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      message: result.response,
      isUser: false,
      avatar: 'https://example.com/chatbot-avatar.png',
    };

    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      chatbotMessage,
    ]);
  };

  return (
    <div ref={chatMessageRef} className="chatbox">
      <div className="chat-logs">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="chat-input-holder">
        <textarea
          value={inputMessage}
          className="chat-input"
          rows={1}
          onKeyDown={handleKeyDown}
          onChange={handleInputMessageChange}
        />

        <button className="chat-input-btn" onClick={handleInputMessageSubmit}>
          <i
            className="fa fa-paper-plane chat-input-send-icon"
            aria-hidden="true"
          ></i>
          Send
        </button>
      </div>
    </div>
  );
};

export interface MessageProps {
  id: string;
  message: string;
  isUser: boolean;
  avatar: string;
}

const Message = ({ message }: { message: MessageProps }) => {
  return (
    <div
      className="chat-message"
      style={{ backgroundColor: message.isUser ? '#fff' : '#f6f6f8' }}
      key={message.id}
    >
      <Avatar
        sx={{
          bgcolor: message.isUser ? deepPurple[500] : deepOrange[500],
        }}
        variant="rounded"
      >
        {message.isUser ? 'You' : 'AI'}
      </Avatar>

      <Typography
        sx={{ margin: '10px', paddingLeft: '10px', paddingRight: '10px' }}
        variant="body1"
      >
        {message.message}
      </Typography>
    </div>
  );
};

export default ChatInterface;
