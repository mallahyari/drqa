import React, { useState } from 'react';
import { Button, Box, Grid, Avatar, Typography } from '@mui/material';

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  avatar: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputMessage(event.target.value);
  };

  const handleInputMessageSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      message: inputMessage,
      isUser: true,
      avatar: 'https://example.com/user-avatar.png',
    };

    setMessages([
      ...messages,
      newMessage,
      {
        id: Math.random().toString(36).substring(7),
        message: 'Loading...',
        isUser: false,
        avatar: 'https://example.com/chatbot-avatar.png',
      },
    ]);

    // Here you can send the inputMessage to the server to get the response
    // Once the response is received, you can update the messages array with the response

    // For this example, we'll just simulate a delay before showing the response
    setTimeout(() => {
      const chatbotMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        message: 'This is a response from the chatbot.',
        isUser: false,
        avatar: 'https://example.com/chatbot-avatar.png',
      };

      setMessages([...messages.slice(0, -1), newMessage, chatbotMessage]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <Box>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <img src={message.avatar} alt="Avatar" />
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleInputMessageSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </Box>
  );
};

export default ChatInterface;
