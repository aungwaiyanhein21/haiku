import React, { useState, useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import Form from './Form';

import axios from 'axios';
import { Redirect } from 'react-router-dom';


const useDidMountEffect = (func, dependencies) => {
    // custom hook to detect first render has already been done.

    const didMount = useRef(false);
  
    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        // if it is the first time for rendering, just mark it.
        didMount.current = true;
      }
    }, dependencies);
};
  

const HaikuForm = ({ isFormToBeUpdate }) => {
    const history = useHistory();

    const initialState = {
        id: -1,
        authorId: 1,
        title: "",
        publishedYear: "",
        haikuText: "",
        reference: "",
        imagePath: "",
        // refId: 1,
        category1: -1,
        category2: -1,
        emotion: "",
        comments: "",
        languageId: 1,
        englishTranslation: "",
        passage1: "",
        passage2: "",
        passage1Indexes: [-1, -1],
        passage2Indexes: [-1, -1],
        concept1: -1,
        concept2: -1
    };

    const [haikuData, setHaikuData] = useState(initialState);

    const [isReady, setIsReady] = useState(false);

    const [authorData, setAuthorData] = useState([]);
    // const [referenceData, setReferenceData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [languageData, setLanguageData] = useState([]);
    const [conceptData, setConceptData] = useState([]);
    const [conceptCategoriesData, setConceptCategoriesData] = useState({});

    const [isSuccess, setIsSuccess] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    const [openUpdateConfirmModal, setOpenUpdateConfirmModal] = useState(false);
    const handleUpdateConfirmModalOpen = () => setOpenUpdateConfirmModal(true);
    const handleUpdateConfirmModalClose = () => setOpenUpdateConfirmModal(false);

    const [updateConfirm, setUpdateConfirm] = useState(null);


    // for image upload
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileUrl, setFileUrl] = useState('');


    /********************************
        Function for contacting server for creating a haiku
    ******************************/
    const createHaiku = async (dataToBeSubmitted) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/haiku/create.php`;

        const response = await axios.post(url, dataToBeSubmitted, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response);
    
        if (response.data.isSuccess) {
            
            setHaikuData(initialState);

            // redirect the user to haiku route
            history.push('/haiku');

            // setIsSuccess(true);
        }
    };

    /********************************
        Function for contacting server for updating a haiku
    ******************************/
    const updateHaiku = async (dataToBeSubmitted) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/haiku/update.php`;

        const response = await axios.post(url, dataToBeSubmitted, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/haiku/update.php`, dataToBeSubmitted);

        console.log(response);
    
        if (response.data.isSuccess) {
            setHaikuData(initialState);

            // redirect the user to haiku route
            history.push('/haiku');

            // setIsSuccess(true);
        }
    };

    const handleSubmit = async (e=null) => {
        if (e !== null) {
            e.preventDefault();
        }
        
        // validations
        if (haikuData['title'].length === 0) {
            alert('need title for haiku');
            return;
        }
        if (haikuData['passage1'].length === 0 || haikuData['passage2'].length === 0) {
            alert('need both passage 1 and passage 2');
            return;
        }

        if (haikuData['concept1'] === -1 || haikuData['concept2'] === -1) {
            alert('need both concept 1 and concept 2');
            return;
        }

        if (haikuData['category1'] === -1 || haikuData['category2'] === -1) {
            alert('need both category 1 and category 2');
            return;
        }
       
        const dataToBeSubmitted = {
            id: haikuData['id'],
            author_id: haikuData['authorId'],
            title: haikuData['title'],
            published_year: haikuData['publishedYear'],
            haiku_text: haikuData['haikuText'],
            reference: haikuData['reference'],
            // ref_id: haikuData['refId'],
            category_1: haikuData['category1'],
            category_2: haikuData['category2'],
            emotion: haikuData['emotion'],
            comments: haikuData['comments'],
            language_id: haikuData['languageId'],
            english_translation: haikuData['englishTranslation'],
            passage_1_start_index: haikuData['passage1Indexes'][0],
            passage_1_end_index: haikuData['passage1Indexes'][1],
            passage_2_start_index: haikuData['passage2Indexes'][0],
            passage_2_end_index: haikuData['passage2Indexes'][1],
            passage_1: haikuData['passage1'],
            passage_2: haikuData['passage2'],
            concept_1: haikuData['concept1'],
            concept_2: haikuData['concept2'],
            image_path: haikuData['imagePath'],
        };

        console.log(dataToBeSubmitted);

        console.log('haiku data in submission: ');

        // will need form data to send image information.
        let fd = new FormData();
        
        // append the image data to form data
        fd.append('image', selectedFile);
        
        // go over the object and append to form data
        for (let key in dataToBeSubmitted) {
            fd.append(key, dataToBeSubmitted[key]);   
        }

        console.log(Array.from(fd));

        
        if (!isFormToBeUpdate) {
            // create a haiku

            await createHaiku(fd);

            // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/haiku/create.php`, dataToBeSubmitted);

            // console.log(response);
        
            // if (response.data.isSuccess) {
            //     setIsSuccess(true);
            //     setHaikuData(initialState);
            // }
        }
        else {
            console.log(updateConfirm);
            if (updateConfirm === "update") {
                // override by updating an existing haiku
                console.log('here');

                await updateHaiku(fd);
            }
            else if (updateConfirm === "new") {
                // create a new haiku

                await createHaiku(fd);
            }
            else {
                handleUpdateConfirmModalOpen();
            }
            
            // // update a haiku
            // // first ask whether it should override the data or create a new one
            // const isConfirmedOverride = window.confirm("Do you want to replace the data?");

            // console.log(isConfirmedOverride);
            // if (isConfirmedOverride) {
            //     console.log("override");
            //     // override by updating an existing haiku

            //     await updateHaiku(dataToBeSubmitted);

            // }
            // else {
            //     console.log("create");
            //     // create a new haiku

            //     await createHaiku(dataToBeSubmitted);

            // }
        }
        
        
        
        
    };

    const handleInputData = (e) => {
        setHaikuData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleMultipleInputs = (e, indx) => {
        let newCategories = [...haikuData[e.target.name]];
        newCategories[indx] = e.target.value;

        setHaikuData(prev => ({
            ...prev,
            [e.target.name]: newCategories
        }));
    };

    const addFields = (key) => {
        
        let newFields = [...haikuData[key]];

        // whenever we add more fields, default that select box to select the first one
        newFields.push(1);

        setHaikuData(prev => ({
            ...prev,
            [key]: newFields
        }));
    };

    const deleteField = (key, indxToBeRemoved) => {
        let updatedField = haikuData[key].filter((val, index) => index !== indxToBeRemoved);
        
        setHaikuData(prev => ({
            ...prev,
            [key]: updatedField
        }));
    };

    const getAuthors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/authors/read.php`);
            const authors = response.data.data.map((author) => ({
                id: parseInt(author.id),
                literaryName: author.literary_name
            }));

            setAuthorData(authors);
        }
        catch (e) {
            console.log(e);
        }
    }; 

    // const getReferences = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/references/read.php`);
    //         const references = response.data.receivedData.map((ref) => ({
    //             id: parseInt(ref.id),
    //             refLink: ref.ref_link
    //         }));

    //         setReferenceData(references);
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // };

    const getCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories/read.php`);
            const categories = response.data.receivedData.map((category) => ({
                id: parseInt(category.id),
                categoryName: category.category_name
            }));

            setCategoryData(categories);
        }
        catch (e) {
            console.log(e);
        }
    };

    const getLanguages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/languages/read.php`);
            const languages = response.data.receivedData.map((language) => ({
                id: parseInt(language.id),
                lang: language.lang
            }));

            setLanguageData(languages);
        }
        catch (e) {
            console.log(e);
        }
    };

    const getConcepts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/concepts/read.php`);
            const concepts = response.data.receivedData.map((concept) => ({
                id: parseInt(concept.id),
                conceptName: concept.concept_name
            }));

            setConceptData(concepts);
        }
        catch (e) {
            console.log(e);
        }
    };

    const getUpdatedData = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/haiku/read.php?id=${id}`);
            
          

            if (!response.data.isSuccess) {
                // not success meaning no data found so alert user
                // can make this better than alert
                alert('No Haiku data found with that id');

                // redirect the user to haiku route
                history.push('/haiku');

                return;
            }

            const data = response.data.responseData;

            const updatedData = {
                id: data['id'],
                authorId: data['author_id'],
                title: data['title'],
                publishedYear: data['published_year'],
                haikuText: data['haiku_text'],
                reference: data['reference'],
                imagePath: data['image_path'],
                // refId: data['ref_id'],
                category1: data['category_1'],
                category2: data['category_2'],
                emotion: data['emotion'],
                comments: data['comments'],
                languageId: data['language_id'],
                englishTranslation: data['english_translation'],
                passage1: data['passage_1'],
                passage2: data['passage_2'],
                concept1: data['concept_1'],
                concept2: data['concept_2'],
                passage1Indexes: data['passage_1_indexes'] || [-1, -1],
                passage2Indexes: data['passage_2_indexes'] || [-1, -1]
            };

            console.log('\nupdated data: ');
            console.log(updatedData);

            setHaikuData(updatedData);

            // set the image url so that user will see the image that has been uploaded before
            setFileUrl(process.env.REACT_APP_SERVER_URL + updatedData.imagePath);

        }
        catch (e) {
            console.log(e);
        }
    };

    const getConceptCategoriesData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/concept_categories/read.php`);
            
            console.log(response.data.receivedData);

            setConceptCategoriesData(response.data.receivedData);
        }
        catch (e) {
            console.log(e);
        }
    };

    
    // props to be passed to Form
    const props = {
        authorData, categoryData, languageData, conceptData, haikuData, 
        addFields, deleteField, handleInputData, handleMultipleInputs, handleSubmit,
        setHaikuData,
        setIsCancelled,
        isFormToBeUpdate,
        getCategories, getConcepts,
        conceptCategoriesData, getConceptCategoriesData,
        
        openUpdateConfirmModal, setOpenUpdateConfirmModal, handleUpdateConfirmModalOpen, handleUpdateConfirmModalClose,
        setUpdateConfirm,

        setSelectedFile, setFileUrl, fileUrl
    };

    useEffect(async () => {

        // get authors
        await getAuthors();

        // get references
        // await getReferences();

        // get categories
        await getCategories();

        // get languages
        await getLanguages();

        // get concepts
        await getConcepts();

        // get connection between concept and categories
        await getConceptCategoriesData();

        if (isFormToBeUpdate) {
            const params = new URLSearchParams(window.location.search);
            const id = parseInt(params.get('id'));

            // bring the data for that particular id
            await getUpdatedData(id);
        }

        setIsReady(true);

    }, []);

    useDidMountEffect(() => {
        if (isFormToBeUpdate) {
            handleSubmit();
        }
    }, [updateConfirm]);

    return (
        <>
            {
                (isSuccess || isCancelled) && <Redirect to="/haiku" />
            }
            {
                isReady && 
                (
                    <Form 
                        {...props}
                    />
                )
            }
        </>
    );
};

export default HaikuForm;