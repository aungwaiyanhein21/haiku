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
    authorContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
    modalBgColor: {
        backgroundColor: "rgb(70,22,47)",
        color: "white"
    }
});


export default function HaikuInfoModal({handleClose, open, setOpen, haikuData }) {
    const classes = useStyles();

    console.log(haikuData);

    return (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle className={`${classes.modalBgColor} ${classes.title}`} id="customized-dialog-title" onClose={handleClose}>
                {haikuData.title}
            </DialogTitle>
            <DialogContent className={classes.modalBgColor} dividers>
                {
                    haikuData.language !== "English" && (
                        <section className={classes.section}>
                            {
                                haikuData.haiku_text.split('\n').map((txt, indx) => (
                                    <Typography key={indx} gutterBottom>
                                        {txt}
                                    </Typography>
                                ))
                            }
                        
                        </section>
                    )
                }
               
                <section className={classes.section}>
                    {
                        haikuData.english_translation.split('\n').map((txt, indx) => (
                            <Typography key={indx} gutterBottom>
                                {txt}
                            </Typography>
                        ))
                    }

                </section>
                <section className={`${classes.section} ${classes.authorContainer}`}>
                    <Typography gutterBottom>
                        {haikuData.author}, {haikuData.published_year}
                    </Typography>
                </section>
                <section className={classes.section}>
                    <Typography gutterBottom>
                        {haikuData.category_1} ({haikuData.concept_1}) &#8660; {haikuData.category_2} ({haikuData.concept_2})
                    </Typography>
                    
                </section>
                
            
            
            </DialogContent>
            {/* <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Create
            </Button>
            </DialogActions> */}
        </Dialog>
    );
}
