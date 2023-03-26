import React, { useState } from 'react';
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosProgressEvent,
} from 'axios';
import {
  Box,
  Button,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Config, uploadDocument } from '../apis/api';
import './styles.css';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadProgress(0);
    }
  }

  const handleFileUpload = async () => {
    if (selectedFile) {
      const config: Config = {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progressPercent = progressEvent.total
            ? (progressEvent.loaded / progressEvent.total) * 100
            : 0;
          setUploadProgress(progressPercent);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const result = await uploadDocument('upload-file', selectedFile, config);
      console.log('result:', result);
    }
  };

  return (
    <Box className="uploader-root">
      <Box
        minWidth={300}
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="contained" component="label" color="secondary">
          Select a File
          <input
            hidden
            accept=".pdf"
            multiple
            type="file"
            onChange={handleFileSelect}
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          onClick={handleFileUpload}
        >
          Upload
        </Button>
      </Box>
      {uploadProgress > 0 && (
        <Box mt={2} sx={{ width: '60%' }}>
          <LinearProgressWithLabel
            sx={{ margin: 'auto', width: '100%' }}
            variant="determinate"
            value={uploadProgress}
          />
        </Box>
      )}
    </Box>
  );
};

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      {/* <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box> */}
    </Box>
  );
};

export default FileUploader;
