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

import { MenuItem } from '@material-ui/core';


import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';


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


const useStyles = makeStyles({
    ul: {
        // display: "flex",
        // flexDirection: "row"
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gridGap: "1em",
        justifyContent: "space-between",

    },

    fieldset: {
        border: "0.01px solid grey",
        borderRadius: "5px",
        margin: "20px 0"
    },
    largeIcon: {
        // fontSize: "32px"
        fontSize: "35px"
    },
    categoryFieldContainer: {
        display: "flex",
        marginTop: "10px",
        marginBottom: "30px"
    }
});


export default function ConceptModal({ handleClose, open, setOpen, conceptData, categoryData, getConcepts, getConceptCategoriesData }) {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);

    const initState = {
        conceptName: "",
        categories: [1]
    }
    const [newConceptData, setNewConceptData] = useState(initState);

    const handleSubmit = async () => {
        if (newConceptData.conceptName.length === 0) {
            alert('Concept Name cannot be empty');
            return;
        }

        if (newConceptData.categories.length === 0) {
            alert('There should be at least one category for a concept');
            return;
        }

        console.log('submitting new concept');

        console.log(newConceptData);
        const dataToBeSubmitted = {
            concept_name: newConceptData['conceptName'],
            category_ids: newConceptData['categories']
        };

        console.log(dataToBeSubmitted);

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/concepts/create.php`, dataToBeSubmitted);
        
       
        if (response.data.isSuccess) {
            // alert(response.data.message);
        
            // reset the field
            setNewConceptData(initState);
        
            // get the categories again from the server as new concept has been added
            await getConcepts();

            // get the connections between concept and category from the server as new connection has been added
            await getConceptCategoriesData();

            console.log('have data');

            // close the modal
            handleClose();
        }
        else {
            alert(response.data.message);
        }

    };

    const handleInputData = (e) => {
        setNewConceptData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleMultipleInputs = (e, indx) => {
        let newCategories = [...newConceptData[e.target.name]];
        newCategories[indx] = e.target.value;

        setNewConceptData(prev => ({
            ...prev,
            [e.target.name]: newCategories
        }));
    };


    const addFields = (key) => {
        
        let newFields = [...newConceptData[key]];

        // whenever we add more fields, default that select box to select the first one
        newFields.push(1);

        setNewConceptData(prev => ({
            ...prev,
            [key]: newFields
        }));
    };

    const deleteField = (key, indxToBeRemoved) => {
        let updatedField = newConceptData[key].filter((val, index) => index !== indxToBeRemoved);
        
        setNewConceptData(prev => ({
            ...prev,
            [key]: updatedField
        }));
    };

    return (
        <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open dialog
        </Button> */}
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Create a Concept
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    List of Existing Concepts:
                </Typography>
                <ul className={classes.ul}>
                    {
                        conceptData.map(conceptData => (
                            <li key={conceptData.id}>
                                {conceptData.conceptName}
                            </li>
                        ))
                    }
                </ul>

                <TextField 
                    autoFocus
                    label="Concept Name"
                    name="conceptName"
                    value={newConceptData.conceptName}
                    onChange={handleInputData}
                    variant="outlined"
                    fullWidth
                />

                <fieldset className={classes.fieldset}>
                    <legend>
                        <Typography variant="subtitle1" color="textPrimary">
                            Categories
                        </Typography>
                    </legend>
                    
                    {
                        newConceptData.categories.map((catId, indx) => (
                            <div className={classes.categoryFieldContainer} key={indx}>
                                
                                <TextField
                                    select
                                    label="category"
                                    name="categories"
                                    value={catId}
                                    onChange={(e) => handleMultipleInputs(e, indx)}
                                    variant="outlined"
                                    className={classes.field}
                                    fullWidth
                                >
                                    {
                                        categoryData.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.categoryName}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                               
                                <IconButton aria-label="Delete a Category" onClick={() => deleteField('categories', indx)}>
                                    <DeleteIcon className={classes.largeIcon} color="secondary"/>
                                </IconButton>
                            </div>
                        ))
                    }

                    
                    <IconButton aria-label="Add Categories" onClick={() => addFields('categories')}>
                        <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                    </IconButton>
                </fieldset>


              
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
