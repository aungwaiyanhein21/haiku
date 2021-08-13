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

import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
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
    padding: theme.spacing(2)
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const useStyles = makeStyles({
    section: {
        margin: "20px 0"
    },
    title: {
        textAlign: "center",
        width: "100%"
    },
    btnContainer: {
        display: "flex",
        flexDirection: "column"
    },
    actionBtn: {
        margin: "10px 0"
    }
});


export default function DeleteConfirmationModal({handleClose, open, handleDelete, deleteId}) {
    const classes = useStyles();

    const handleDeleteConfirmed = () => {
        handleDelete(deleteId);
        handleClose();
    };

    return (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle className={`${classes.title}`} id="customized-dialog-title" onClose={handleClose}>
                Confirmation
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                   Are you sure you want to delete?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteConfirmed} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
