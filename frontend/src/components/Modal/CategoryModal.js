import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { TextField } from '@material-ui/core';

import axios from 'axios';

const styles = (theme) => ({
  root: {
    margin: 0,
    width: "80vw",
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CategoryModal({handleClose, open, setOpen, getCategories}) {
  // const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleInputData = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async () => {
    if (categoryName.length === 0) {
      alert('Category Name cannot be empty');
      return;
    }

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/categories/create.php`, {
      category_name: categoryName
    });

    console.log(response);

    if (response.data.isSuccess) {
      alert(response.data.message);

      // reset the field
      setCategoryName('');

      // get the categories again from the server as new category has been added
      getCategories();

      // close the modal
      handleClose();
    }
    else {
      alert(response.data.message);
    }

  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create a Category
        </DialogTitle>
        <DialogContent dividers>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
          /> */}
          <TextField 
            autoFocus
            label="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={handleInputData}
            variant="outlined"
            fullWidth
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
