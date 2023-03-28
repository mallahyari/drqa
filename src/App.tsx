import React from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import FileUploader from './pages/fileUploader';
import ChatInterface from './components/chat/ChatInterface';

function App() {
  return (
    <Container>
      <Box mt={3} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Ask me anything about your data</Typography>
      </Box>
      <FileUploader />
      <ChatInterface />
    </Container>
  );
}

export default App;
