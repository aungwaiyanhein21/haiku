import React, { useState, useCallback, useRef } from 'react';
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
import useHighlightText from '../../hooks/useHighlightText';

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
    },
   
});


export default function HaikuInfoModal({handleClose, open, setOpen, haikuData }) {
    const classes = useStyles();

    const { translationRefHook } = useHighlightText({ haikuData, highlightPass1: true, highlightPass2: true });

  

    return (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle className={`${classes.modalBgColor} ${classes.title}`} id="customized-dialog-title" onClose={handleClose}>
                {haikuData.title}
            </DialogTitle>
            <DialogContent className={classes.modalBgColor} dividers>
                {
                    haikuData.language !== "English" && (
                        <section className={classes.section}>
                             <Typography 
                                variant="body1"  
                                style={{whiteSpace: "pre-line"}}
                            >
                                {haikuData.haiku_text}
                               
                            </Typography>
                        </section>
                    )
                }
               
                <section className={classes.section}>
                    {
                        <Typography 
                            variant="body1"  
                            style={{whiteSpace: "pre-line"}}
                            // ref={translationRef}
                            ref={translationRefHook}
                        >
                         {haikuData.english_translation}
                        
                         
                     </Typography>
                    }
                    {/* {
                        haikuData.english_translation.split('\n').map((txt, indx) => (
                            <Typography key={indx} gutterBottom>
                                {txt}
                            </Typography>
                        ))
                    } */}

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

                {
                    haikuData.comments.length !== 0 && (
                        <section className={classes.section}>
                            <hr />
                            <Typography gutterBottom>
                                Comments: {haikuData.comments}
                               
                            </Typography>
                        </section>
                    )
                }
                
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






// const passage1Style = {
//     backgroundColor: "green",
//     color: "white"
// };
// const passage2Style = {
//     backgroundColor: "blue",
//     color: "white"
// };

// console.log(haikuData);

// // mock data
// // haikuData['passage_1_indexes'] = [0, 6];
// // haikuData['passage_2_indexes'] = [25, 39];


// // NOTE: the index of selection not equal to the counting of characters even if we start from 0
// // eg. The text "sth is fun". The highlighted text is "sth is". 
// // in the above example, startoffset will be 0 and endoffset will be 6.
// const createSelectionRange = (translationNode, num) => {
//     let range = document.createRange();
//     range.setStart(translationNode.firstChild, haikuData[`passage_${num}_indexes`][0]);
//     range.setEnd(translationNode.firstChild, haikuData[`passage_${num}_indexes`][1]);

//     return range;
// };

// const createMarkTag = (passageStyle) => {
//     let mark = document.createElement('mark');
//     mark.style.backgroundColor = passageStyle['backgroundColor'];
//     mark.style.color = passageStyle['color'];
//     mark.style.padding = "2px";

//     return mark;
// };

// const highlightText = (translationNode) => {
//     // highlight chosen passage 1 and 2.
//     let passage1Range = createSelectionRange(translationNode, "1");
//     let passage2Range = createSelectionRange(translationNode, "2");

//     let passage1MarkEle = createMarkTag(passage1Style);
//     let passage2MarkEle = createMarkTag(passage2Style);

//     passage1Range.surroundContents(passage1MarkEle)
//     passage2Range.surroundContents(passage2MarkEle);
    
// };

// const translationRef = useCallback((translationNode) => {
    
//     if (translationNode) {
//         highlightText(translationNode);
//     } 
// }, []);