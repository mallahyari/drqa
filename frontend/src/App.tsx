import React from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import FileUploader from './components/uploader/fileUploader';
import ChatInterface from './components/chat/ChatInterface';

function App() {
  return (
    <div className="main-holder">
      <Typography margin="auto" variant="h4" gutterBottom>
        Ask me anything about your data
      </Typography>
      <Box my={3} mx={5}>
        <Typography variant="body1">
          Upload you PDF files, and then start asking questions about them.
          Please note that indexing files may take a moment if the files are
          large.
        </Typography>
      </Box>
      <FileUploader />
      <ChatInterface />
    </div>
  );
}

export default App;
