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
  CircularProgress,
  Typography,
  Snackbar,
  Grid,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Config, uploadDocument } from '../../apis/api';
import FileDetails from '../fileDetails/FileDetails';

const FILE_SIZE = 5000000;

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].size < FILE_SIZE) {
        setSelectedFile(event.target.files[0]);
        setUploadProgress(0);
        setDisabled(false);
      } else {
        setOpen(true);
        setDisabled(true);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      setUploadProgress(0);
      setDisabled(true);
      setUploadedFile(result.data.filename);
      setUploadedFiles([...uploadedFiles, result.data.filename]);
    }
  };

  return (
    <Box className="uploader-root">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box minWidth={300} display="flex" flexDirection="column">
            <Box width="200px">
              <Button
                fullWidth={true}
                variant="contained"
                disabled={disabled}
                component="label"
                startIcon={<CloudUploadIcon />}
                onClick={handleFileUpload}
              >
                Upload
              </Button>
            </Box>
            <Box my={3} display="flex" flexDirection="column">
              <Typography variant="body1" gutterBottom>
                <i>Your file has to be smaller than 5MB.</i>
              </Typography>
              <Button
                sx={{ width: '200px' }}
                variant="contained"
                component="label"
                color="secondary"
              >
                Select a File
                <input
                  hidden
                  accept=".pdf"
                  multiple
                  type="file"
                  onChange={handleFileSelect}
                />
              </Button>
            </Box>

            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              autoHideDuration={6000}
              open={open}
              onClose={handleClose}
              message="Please select a smaller file! It's exceeding 5MB"
              key={'top-left'}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          {uploadedFiles &&
            uploadedFiles.map((file, i) => (
              <FileDetails key={i} fileName={file} />
            ))}
        </Grid>
      </Grid>

      {uploadProgress > 0 && (
        <Box mt={2}>
          <CircularProgress
            sx={{ margin: 'auto', width: '100%' }}
            // variant="determinate"
            // value={uploadProgress}
          />

          {/* <LinearProgressWithLabel
            sx={{ margin: 'auto', width: '100%' }}
            variant="determinate"
            value={uploadProgress}
          /> */}
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
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default FileUploader;
