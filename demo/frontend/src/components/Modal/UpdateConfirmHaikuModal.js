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


export default function UpdateConfirmHaikuModal({handleClose, open, setOpen, setUpdateConfirm, setIsCancelled, handleSubmit }) {
    const classes = useStyles();

    const handleUpdateBtnClick = () => {
        setUpdateConfirm('update');
       
        handleClose();
 
        // await handleSubmit();
        
    };
    const handleCreateBtnClick = () => {
        console.log('create new ');
        setUpdateConfirm('new');
        handleClose();
        // await handleSubmit();
    };
    const handleCancelWithoutSavingBtnClick = () => {
        setIsCancelled(true);
        // handleSubmit();
    };

    return (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle className={`${classes.title}`} id="customized-dialog-title" onClose={handleClose}>
                Confirmation
            </DialogTitle>
            <DialogContent>
                <section className={classes.btnContainer}>
                    <Button className={classes.actionBtn} variant="outlined" onClick={handleUpdateBtnClick} color="primary">
                        Update Existing
                    </Button>
                    <Button className={classes.actionBtn} variant="outlined" onClick={handleCreateBtnClick} color="primary">
                        Save as new connection
                    </Button>
                    <Button className={classes.actionBtn} variant="outlined" onClick={handleCancelWithoutSavingBtnClick} color="primary">
                        Cancel without saving
                    </Button>
                </section>
            </DialogContent>
        </Dialog>
    );
}
