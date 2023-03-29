import React from 'react';

import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

const FileDetails = ({ fileName }: { fileName: string }) => {
  return (
    <Card className="card-file-details">
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {fileName}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          variant="body1"
          color="text.secondary"
        >
          {new Date().toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileDetails;
