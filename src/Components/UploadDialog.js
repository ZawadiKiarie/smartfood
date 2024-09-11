import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDropzone } from 'react-dropzone';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function UploadDialog({ onClose, open }){

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef(undefined);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [results, setResults] = React.useState(null);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file)
    handleUpload(file);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async(file) => {
    if(!loading) {
      setLoading(true);
      setSuccess(false);
    }
    const formData = new FormData();
    formData.append('image', file)
    try {
      const segmentationResults = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(segmentationResults);
      setResults(segmentationResults.data.results)
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onClose(file, segmentationResults.data.results);
        setTimeout(() => {
          setSuccess(false); // Reset the checkmark after the dialog closes
        }, 100);
      }, 1000)
    }catch(error) {
      console.error("Error running segmentation model:", error);
      setLoading(false);
      setSuccess(false);
    }
  }

  return(
    <BootstrapDialog
      fullWidth={true}
      maxWidth={false}
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          width: {
            xs: '100%',  // Full width on extra small screens
            sm: '100%',  // Full width on small screens
            md: '100%',  // Full width on medium screens
            lg: '60%',   // Medium-sized dialog on large screens
          },
          maxWidth: 'none', // Remove default maxWidth behavior for responsive control
        },
      }}
    >
      <DialogTitle sx={{ m:0, p:2 }} id="customized-dialog-title">Upload a Food Image</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers
      >
        {/* <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          StartIcon={<ImageOutlinedIcon />}
        >Upload Image
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
         />
        </Button> */}
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
              aria-label="save"
              color="primary"
              sx={buttonSx}
            >
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
          <Box
            sx={{ m: 1, position: 'relative' }}
          >
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="contained"
              sx={{buttonSx}}
              disabled={loading}
            >
              Upload an Image
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setUploadedImage(file);
                  handleUpload(file);
                }}
              />
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
               />
            )}
          </Box>
        </Box>
        
        
        <Typography variant="h6">or drag and drop images</Typography>

        {/* Dropzone */}
        <div {...getRootProps({ style: { border: '2px dashed gray', padding: '20px', textAlign: 'center', marginTop: '10px', cursor: 'pointer' } })}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </DialogContent>
    </BootstrapDialog>

  )
}

UploadDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default UploadDialog;