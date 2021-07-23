import React, { useState, useEffect } from 'react';

import { Container, Typography } from '@material-ui/core';

import { Button, TextField, MenuItem  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import CategoryModal from '../Modal/CategoryModal';
import ConceptModal from '../Modal/ConceptModal';
import UpdateConfirmHaikuModal from '../Modal/UpdateConfirmHaikuModal';


const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    formBtn: {
        width: '15%'
    },
    formBtnContainer: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-between'
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
        display: "flex"
    },
    passages: {
        margin: "0 10px"
    }
});

const Form = (props) => {
    const {
        authorData, 
        referenceData, 
        categoryData,
        languageData,
        conceptData,
        haikuData,
        addFields,
        deleteField,
        handleInputData,
        handleMultipleInputs,
        handleSubmit,
        setHaikuData,
        setIsCancelled,
        isFormToBeUpdate,
        getCategories,
        getConcepts,
        conceptCategoriesData,
        openUpdateConfirmModal, setOpenUpdateConfirmModal, handleUpdateConfirmModalOpen, handleUpdateConfirmModalClose,
        setUpdateConfirm
    } = props;



    const classes = useStyles();

    const [categoryToBeDisabled1, setCategoryToBeDisabled1] = useState(new Set());
    const [categoryToBeDisabled2, setCategoryToBeDisabled2] = useState(new Set());

    
   
    const handleConceptCategory = (e) => {
        handleInputData(e);

        const key = e.target.value;

        // disable categories based on connections
        if (e.target.name === 'concept1') {
            

            const categories = new Set(conceptCategoriesData[key]);
            setCategoryToBeDisabled1(categories);
            
            console.log(categories);
        }
        else {
            // concept 2
            const categories = new Set(conceptCategoriesData[key]);
            setCategoryToBeDisabled2(categories);
            console.log(categories);
        }

    };

    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openConceptModal, setOpenConceptModal] = useState(false);
   

    const handleCategoryModalOpen = () => setOpenCategoryModal(true);
  
    const handleCategoryModalClose = () => setOpenCategoryModal(false);

    const handleConceptModalOpen = () => setOpenConceptModal(true);

    const handleConceptModalClose = () => setOpenConceptModal(false);

  


    const [isPassageBtnDisabled, setIsPassageBtnDisabled] = useState(true);
    const [textSelected, setTextSelected] = useState("");

    const resetSelectTextAndDisableBtn = () => {
        setIsPassageBtnDisabled(true);
        setTextSelected("");
    };

    const onChangeSelectText = (e) => {

        let selection = window.getSelection();
        let start = selection.anchorOffset;
        var end = selection.focusOffset;
        if (start >= 0 && end >= 0){
    	    console.log("start: " + start);
    	    console.log("end: " + end);
        }


       
        let textSelected = window.getSelection().toString();
        if (textSelected === "") {
            resetSelectTextAndDisableBtn();
            return;
        }

        setTextSelected(textSelected);

        // enable the passage buttons
        setIsPassageBtnDisabled(false);
    };

    const handlePassageClick = (name) => {
        console.log('text selected:' + textSelected);
        setHaikuData(prev => ({
            ...prev,
            [name]: textSelected
        }));
    };

    useEffect(() => {
        console.log(isFormToBeUpdate);
        if (isFormToBeUpdate) {
            // update connection between concept and category
            const categoriesDisabled1 = new Set(conceptCategoriesData[haikuData.concept1]);
            const categoriesDisabled2 = new Set(conceptCategoriesData[haikuData.concept2]);
            setCategoryToBeDisabled1(categoriesDisabled1);
            setCategoryToBeDisabled2(categoriesDisabled2);
        }
    }, []);

    return (
        <>

        {
            openCategoryModal && (
                <CategoryModal 
                    open={openCategoryModal} 
                    setOpen={setOpenCategoryModal} 
                    handleClose={handleCategoryModalClose} 
                    getCategories={getCategories}
                />
            )
        }

        {
            openConceptModal && (
                <ConceptModal 
                    open={openConceptModal} 
                    setOpen={setOpenConceptModal} 
                    handleClose={handleConceptModalClose} 
                    conceptData={conceptData}
                    categoryData={categoryData}
                    getConcepts={getConcepts}
                />
            )
        }

        {
            openUpdateConfirmModal && (
                <UpdateConfirmHaikuModal 
                    open={openUpdateConfirmModal} 
                    setOpen={setOpenUpdateConfirmModal} 
                    handleClose={handleUpdateConfirmModalClose} 
                    setUpdateConfirm={setUpdateConfirm}
                    setIsCancelled={setIsCancelled}
                    handleSubmit={handleSubmit}
                />
            )
        }
       
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" color="textPrimary">
                {isFormToBeUpdate ? "Update" : "Create"} Haiku
            </Typography>

            <form>
                <TextField
                    select
                    label="Author"
                    name="authorId"
                    value={haikuData.authorId}
                    onChange={handleInputData}
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                >
                    {
                        authorData.map((author) => (
                            <MenuItem key={author.id} value={author.id}>
                                {author.literaryName}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField 
                    label="Haiku Title"
                    name="title"
                    value={haikuData.title}
                    onChange={handleInputData}
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />
                <TextField 
                    label="Published Year"
                    name="publishedYear"
                    value={haikuData.publishedYear}
                    onChange={handleInputData}
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />
                <TextField
                    label="Haiku Text"
                    name="haikuText"
                    value={haikuData.haikuText}
                    onChange={handleInputData}
                    multiline
                    rows={3}
                    // defaultValue="Default Value"
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />

                <TextField
                    select
                    label="Reference"
                    name="refId"
                    value={haikuData.refId}
                    onChange={handleInputData}
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                >
                    
                    {
                        referenceData.map((ref) => (
                            <MenuItem key={ref.id} value={ref.id}>
                                {ref.refLink}
                            </MenuItem>
                        ))
                    }
            
                </TextField>
                <TextField 
                    label="Emotion"
                    name="emotion"
                    value={haikuData.emotion}
                    onChange={handleInputData}
                    variant="outlined" 
                    className={classes.field}
                    fullWidth
                />
                <TextField
                    label="Comments"
                    name="comments"
                    value={haikuData.comments}
                    onChange={handleInputData}
                    multiline
                    rows={3}
                    // defaultValue="Default Value"
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />
                <TextField
                    select
                    label="Language"
                    name="languageId"
                    value={haikuData.languageId}
                    onChange={handleInputData}
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                >
                    {
                        languageData.map((language) => (
                            <MenuItem key={language.id} value={language.id}>
                                {language.lang}
                            </MenuItem>
                        ))
                    }
                    
                </TextField>

                <TextField
                    label="English Translation"
                    name="englishTranslation"
                    value={haikuData.englishTranslation}
                    onChange={handleInputData}
                    onSelect={onChangeSelectText}
                    onBlur={() => setTimeout(resetSelectTextAndDisableBtn,500) }
                    multiline
                    rows={3}
                    // defaultValue="Default Value"
                    variant="outlined"
                    className={classes.field}
                    fullWidth

                    autoComplete="off" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    spellCheck={false}
                    
                />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.passages}
                        onClick={() => handlePassageClick('passage1')}
                        disabled={isPassageBtnDisabled}
                        onFocus={()=>setIsPassageBtnDisabled(false)}
                    >
                        Passage 1
                    </Button>
                    <Button
                        name="passage2"
                        variant="contained"
                        color="primary"
                        className={classes.passages}
                        onClick={() => handlePassageClick('passage2')}
                        disabled={isPassageBtnDisabled}
                    >
                       Passage 2
                    </Button>
                </div>

                { haikuData.passage1 !== "" && (
                <fieldset className={classes.fieldset}>
                    <legend>Passage 1</legend>
                    <Typography variant="body1">
                        Selected Text:
                    </Typography>
                    {
                        haikuData.passage1.split('\n').map((passage,index) => (
                            <Typography key={index} variant="body1">
                                {passage}
                            </Typography>
                        ))
                    }
                    <div className={classes.categoryFieldContainer}>
                        <TextField
                            select
                            label="concept 1"
                            name="concept1"
                            value={haikuData.concept1}
                            onChange={handleConceptCategory}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Concept...
                            </MenuItem>
                            {
                                conceptData.map((concept) => (
                                    <MenuItem key={concept.id} value={concept.id}>
                                        {concept.conceptName}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <IconButton aria-label="Add New Concept" onClick={handleConceptModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                    <div className={classes.categoryFieldContainer}>   
                        <TextField
                            select
                            label="category 1"
                            name="category1"
                            value={haikuData.category1}
                            onChange={handleInputData}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Category...
                            </MenuItem>
                            {
                                categoryData.map((category) => (
                                    <MenuItem 
                                        disabled={categoryToBeDisabled1.has(category.id)} 
                                        key={category.id} 
                                        value={category.id}
                                    >
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        
                        <IconButton aria-label="Add New Category" onClick={handleCategoryModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                                       
                </fieldset>)
                }
                { haikuData.passage2 !== "" && (
                <fieldset className={classes.fieldset}>
                    <legend>Passage 2</legend>
                    <Typography variant="body1">
                        Selected Text:
                    </Typography>
                    {
                        haikuData.passage2.split('\n').map((passage,index) => (
                            <Typography key={index} variant="body1">
                                {passage}
                            </Typography>
                        ))
                    }
                    <div className={classes.categoryFieldContainer}>
                        <TextField
                            select
                            label="concept 2"
                            name="concept2"
                            value={haikuData.concept2}
                            onChange={handleConceptCategory}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Concept...
                            </MenuItem>
                            {
                                conceptData.map((concept) => (
                                    <MenuItem key={concept.id} value={concept.id}>
                                        {concept.conceptName}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <IconButton aria-label="Add New Concept" onClick={handleConceptModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                    <div className={classes.categoryFieldContainer}>   
                        <TextField
                            select
                            label="category 2"
                            name="category2"
                            value={haikuData.category2}
                            onChange={handleInputData}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Category...
                            </MenuItem>
                            {
                                categoryData.map((category) => (
                                    <MenuItem 
                                        disabled={categoryToBeDisabled2.has(category.id)} 
                                        key={category.id} 
                                        value={category.id}
                                    >
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        
                        <IconButton aria-label="Add New Category" onClick={handleCategoryModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                </fieldset>)
                }
                   
                <div className={classes.formBtnContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formBtn}
                        onClick={() => setIsCancelled(true)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formBtn}
                        onClick={handleSubmit}
                    >
                       { isFormToBeUpdate ? "Save" : "Create" }
                    </Button>
                </div>
            
            </form>  
        </Container>
        </>
    );
};

export default Form;



{/* <fieldset className={classes.fieldset}>
                    <legend>
                        <Typography variant="subtitle1" color="textPrimary">
                            Categories
                        </Typography>
                    </legend>
                    
                    {
                        haikuData.categories.map((catId, indx) => (
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
                        <AddBoxIcon className={classes.largeIcon} color="primary"/>
                    </IconButton>
                </fieldset>
               
                
                <TextField
                    label="Passage 1"
                    name="passage1"
                    value={haikuData.passage1}
                    onChange={handleInputData}
                    multiline
                    rows={3}
                    // defaultValue="Default Value"
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />
                <TextField
                    label="Passage 2"
                    name="passage2"
                    value={haikuData.passage2}
                    onChange={handleInputData}
                    multiline
                    rows={3}
                    // defaultValue="Default Value"
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />
                <fieldset className={classes.fieldset}>
                    <legend>
                        <Typography variant="subtitle1" color="textPrimary">
                            Concepts
                        </Typography>
                    </legend>
                    
                    {
                        haikuData.concepts.map((conceptId, indx) => (
                            <div className={classes.categoryFieldContainer} key={indx}>
                                <TextField
                                    select
                                    label="concept"
                                    name="concepts"
                                    value={conceptId}
                                    onChange={(e) => handleMultipleInputs(e, indx)}
                                    variant="outlined"
                                    className={classes.field}
                                    fullWidth
                                >
                                    {
                                        conceptData.map((concept) => (
                                            <MenuItem key={concept.id} value={concept.id}>
                                                {concept.conceptName}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                                <IconButton aria-label="Delete a Concept" onClick={() => deleteField('concepts', indx)}>
                                    <DeleteIcon className={classes.largeIcon} color="secondary"/>
                                </IconButton>
                               
                            </div>
                        ))
                    }

                    <IconButton aria-label="Add Concepts" onClick={() => addFields('concepts')}>
                        <AddBoxIcon className={classes.largeIcon} color="primary"/>
                    </IconButton>
                </fieldset> */}