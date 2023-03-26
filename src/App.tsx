import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import FileUploader from './pages/fileUploader';

function App() {
  return (
    <Container maxWidth="xl">
      <FileUploader />
    </Container>
  );
}

export default App;
