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
import ImageUpload from './ImageUpload';


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
        margin: "10px 0px 20px 0px"
    }
});

const Form = (props) => {
    const {
        authorData, 
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
        conceptCategoriesData, getConceptCategoriesData,
        openUpdateConfirmModal, setOpenUpdateConfirmModal, handleUpdateConfirmModalOpen, handleUpdateConfirmModalClose,
        setUpdateConfirm,

        setSelectedFile, setFileUrl, fileUrl,
    } = props;



    const classes = useStyles();

    const [conceptToBeShown1, setconceptToBeShown1] = useState(new Set());
    const [conceptToBeShown2, setconceptToBeShown2] = useState(new Set());

   
    const handleConceptCategory = (e) => {
        handleInputData(e);

        const key = e.target.value;

        // show only the concepts that are connected with category.
        if (e.target.name === 'category1') {

            // reset concept1
            setHaikuData(prev => ({
                ...prev,
                "concept1": -1
            }));
            
            const concepts = new Set(conceptCategoriesData[key]);
            setconceptToBeShown1(concepts);
            
            console.log(concepts);
        }
        else {
            // reset concept2
            setHaikuData(prev => ({
                ...prev,
                "concept2": -1
            }));

            // concept 2
            const concepts = new Set(conceptCategoriesData[key]);
            setconceptToBeShown2(concepts);
            console.log(concepts);
        }

    };

    const reloadConceptSelectBox = () => {
        // update connection between concept and category
        const conceptShown1 = new Set(conceptCategoriesData[haikuData.category1]);
        const conceptShown2 = new Set(conceptCategoriesData[haikuData.category2]);
        setconceptToBeShown1(conceptShown1);
        setconceptToBeShown2(conceptShown2);

        console.log('in reloading');
        console.log(conceptShown1);
        console.log(conceptShown2);
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

    const getSelectionInfo = () => {
        let selection = window.getSelection();

        const text = selection.toString();

        const selectionStart = selection.anchorOffset;
        const selectionEnd = selection.focusOffset;

        let start, end;
        if (selectionStart > selectionEnd) {
            start = selectionEnd;
            end = selectionStart;
        }
        else {
            start = selectionStart;
            end = selectionEnd;
        }

        return {start, end, text};
    };

    const onChangeSelectText = (e=null) => {
        if (e) {
            e.stopPropagation();
        }
        
        const {start, end, text} = getSelectionInfo();

        // there is no selection. Just placing a cursor.
        if (start === end) {
            resetSelectTextAndDisableBtn();
            return {start, end};
        };

       
        let textSelected = window.getSelection().toString();
        if (textSelected === "") {
            resetSelectTextAndDisableBtn();
            return;
        }

        setTextSelected(textSelected);

        // enable the passage buttons
        setIsPassageBtnDisabled(false);

        return  {start, end};
    };


    const handlePassageClick = (name, passageIndexName) => {

        console.log(haikuData);
        // if (haikuData[name] === '') {
        //     alert("haven't selected respective passages before clicking on the button");
        //     return;
        // }

        // console.log(window.getSelection().toString());

        // set indexes
        const {start, end} = onChangeSelectText();
          
        // there is no selection. Just placing a cursor.
        if (start === end) {
            alert('need to select text before clicking on button');
            return;
        };

        console.log('\nafter button clicked');
        console.log(start);
        console.log(end);
        console.log(passageIndexName);
        // setHaikuData(prev => ({
        //     ...prev,
        //     [passageIndexName]: [start, end]
        // }));

        // console.log(haikuData);

        // console.log('text selected:' + textSelected);
        setHaikuData(prev => ({
            ...prev,
            [name]: textSelected,
            [passageIndexName]: [start, end]
        }));

        console.log(haikuData);
       
    };


    useEffect(() => {
        reloadConceptSelectBox();
        if (isFormToBeUpdate) {
            // update connection between concept and category
           
            
            // const conceptShown1 = new Set(conceptCategoriesData[haikuData.category1]);
            // const conceptShown2 = new Set(conceptCategoriesData[haikuData.category2]);
            // setconceptToBeShown1(conceptShown1);
            // setconceptToBeShown2(conceptShown2);
        }
    }, [conceptCategoriesData]);

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
                    getConceptCategoriesData={getConceptCategoriesData}
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
                <ImageUpload setSelectedFile={setSelectedFile} setFileUrl={setFileUrl} fileUrl={fileUrl}/>

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
                    label="Reference"
                    name="reference"
                    value={haikuData.reference}
                    onChange={handleInputData}
                    variant="outlined"
                    className={classes.field}
                    fullWidth
                />
              
                {/* <TextField
                    select
                    label="Reference To Be Deleted"
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
            
                </TextField> */}
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
                    // onMouseUp={onChangeSelectText}
                    // onSelect={onChangeSelectText}
                    // onBlur={() => setTimeout(resetSelectTextAndDisableBtn,500) }
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
                    <Typography 
                        variant="body1"  
                        onMouseUp={onChangeSelectText}
                        // onMouseUp={pass1TextSelection}
                        style={{whiteSpace: "pre-line"}}
                        // ref={pass1refHook}
                        onBlur={() => setTimeout(resetSelectTextAndDisableBtn,500) }
                    >
                        {haikuData.englishTranslation}
                        
                    </Typography>
                    
                </div>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.passages}
                        onClick={() => handlePassageClick('passage1', "passage1Indexes")}
                        // onClick={() => handlePassage1Click('passage1', "passage1Indexes")}
                        disabled={isPassageBtnDisabled}
                        onFocus={()=>setIsPassageBtnDisabled(false)}
                    >
                        Passage 1
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
                            label="category 1"
                            name="category1"
                            value={haikuData.category1}
                            onChange={handleConceptCategory}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Category...
                            </MenuItem>
                            {
                                categoryData.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            }
                            {/* {
                                categoryData.map((category) => (
                                    <MenuItem 
                                        disabled={!conceptToBeShown1.has(category.id)} 
                                        key={category.id} 
                                        value={category.id}
                                    >
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            } */}
                        </TextField>
                        
                        <IconButton aria-label="Add New Category" onClick={handleCategoryModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                    <div className={classes.categoryFieldContainer}>
                     
                        <TextField
                            select
                            label="concept 1"
                            name="concept1"
                            value={haikuData.concept1}
                            onChange={handleInputData}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Concept...
                            </MenuItem>
                            {/* {
                                conceptData.map((concept) => (
                                    <MenuItem key={concept.id} value={concept.id}>
                                        {concept.conceptName}
                                    </MenuItem>
                                ))
                            } */}
                         
                            {
                                conceptData.map((concept) => (
                                    conceptToBeShown1.has(concept.id) && (
                                        <MenuItem 
                                            key={concept.id} 
                                            value={concept.id}
                                        >
                                            {concept.conceptName}
                                        </MenuItem>
                                    )
                                ))
                            }
                        </TextField>
                        <IconButton aria-label="Add New Concept" onClick={handleConceptModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                                       
                </fieldset>)
                }

                <div>
                    <Typography 
                        variant="body1"  
                        onMouseUp={onChangeSelectText}
                        // onMouseUp={pass2TextSelection}
                        style={{whiteSpace: "pre-line"}}
                        // ref={pass2refHook}
                        onBlur={() => setTimeout(resetSelectTextAndDisableBtn,500) }
                    >
                        {haikuData.englishTranslation}
                        
                    </Typography>
                    
                </div>

                <div>
                    <Button
                        name="passage2"
                        variant="contained"
                        color="primary"
                        className={classes.passages}
                        onClick={() => handlePassageClick('passage2', "passage2Indexes")}
                        disabled={isPassageBtnDisabled}
                    >
                       Passage 2
                    </Button>
                </div>

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
                            label="category 2"
                            name="category2"
                            value={haikuData.category2}
                            onChange={handleConceptCategory}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Category...
                            </MenuItem>
                            {
                                categoryData.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            }
                            {/* {
                                categoryData.map((category) => (
                                    <MenuItem 
                                        disabled={!conceptToBeShown2.has(category.id)} 
                                        key={category.id} 
                                        value={category.id}
                                    >
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            } */}
                        </TextField>
                        
                        <IconButton aria-label="Add New Category" onClick={handleCategoryModalOpen}>
                            <AddCircleRoundedIcon className={classes.largeIcon} color="primary"/>
                        </IconButton>
                    </div>
                    <div className={classes.categoryFieldContainer}>
                        <TextField
                            select
                            label="concept 2"
                            name="concept2"
                            value={haikuData.concept2}
                            onChange={handleInputData}
                            variant="outlined"
                            className={classes.field}
                            fullWidth
                        >
                            <MenuItem disabled value={-1}>
                                Choose a Concept...
                            </MenuItem>
                            {/* {
                                conceptData.map((concept) => (
                                    <MenuItem key={concept.id} value={concept.id}>
                                        {concept.conceptName}
                                    </MenuItem>
                                ))
                            } */}
                            {
                                conceptData.map((concept) => (
                                    conceptToBeShown2.has(concept.id) && (
                                        <MenuItem 
                                            key={concept.id} 
                                            value={concept.id}
                                        >
                                            {concept.conceptName}
                                        </MenuItem>
                                    )
                                ))
                            }
                        </TextField>
                        <IconButton aria-label="Add New Concept" onClick={handleConceptModalOpen}>
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