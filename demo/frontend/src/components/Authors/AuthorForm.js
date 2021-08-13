import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Typography } from '@material-ui/core';

import {FormControl, Input, InputLabel, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';


import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formBtn: {
        width: '15%'
    },
    formBtnContainer: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-between'
    }
});


const AuthorForm = () => {
    const classes = useStyles();

    const location = useLocation();
    const [isUpdate, setIsUpdate] = useState(false);

    const initialState = {
        id: -1,
        literaryName: '',
        firstName: '',
        lastName: '',
        country: '',
        language: '',
        yearBorn: '',
        yearDied: ''
    };

    const [authorData, setAuthorData] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (location.state === undefined) {
            setAuthorData(initialState);
        }
        else {
            // this is for update
            const data = location.state.data;
            setAuthorData({
                id: data.id,
                literaryName: data.literary_name,
                firstName: data.first_name,
                lastName: data.last_name,
                country: data.country,
                language: data.language,
                yearBorn: data.year_born,
                yearDied: data.year_died
            });

            setIsUpdate(true);
        }
    }, []);

    
    const handleInputData = (e) => {
        setAuthorData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if literary name is empty, we don't accept to submit
        if (authorData['literaryName'].length === 0) {
            alert('literary Name cannot be empty');
            return;
        }

        if (isUpdate) {
            axios.put(`${process.env.REACT_APP_SERVER_URL}/authors/update.php`, {
                id: authorData.id,
                literary_name: authorData.literaryName,
                first_name: authorData.firstName,
                last_name: authorData.lastName,
                country: authorData.country,
                language: authorData.language,
                year_born: authorData.yearBorn,
                year_died: authorData.yearDied,
            })
            .then(response => {
                console.log(response);
                if (response.data.isSuccess) {
                    setIsSuccess(true);
                }
    
                setTimeout(() => {
                    // after 2 seconds, redirect back to authors page
                   setIsCancelled(true);
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            // create an author
            axios.post(`${process.env.REACT_APP_SERVER_URL}/authors/create.php`, {
                literary_name: authorData.literaryName,
                first_name: authorData.firstName,
                last_name: authorData.lastName,
                country: authorData.country,
                language: authorData.language,
                year_born: authorData.yearBorn,
                year_died: authorData.yearDied,
            })
            .then(response => {
                console.log(response);
    
                if (response.data.isSuccess) {
                    setIsSuccess(true);
                }
    
                setAuthorData(initialState);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };



    return (
        <>
            {
                isCancelled && <Redirect to="/authors" />
            }
            {
                authorData && 
                (
                    <Container maxWidth="lg">
                        <Typography variant="h4" align="center" color="textPrimary">
                            {
                                isUpdate ? 'Update Author' : 'Create Author'
                            }
                        </Typography>
        
                        {
                            isSuccess && <Alert onClose={() => setIsSuccess(false)}>{isUpdate ? "Updated " : "Created "}Successfully!</Alert>
                        }
        
                        <form className={classes.form}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="literaryName">Literary Name</InputLabel>
                                <Input id="literaryName" value={authorData.literaryName} onChange={handleInputData} />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <Input id="firstName" value={authorData.firstName} onChange={handleInputData} />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <Input id="lastName" value={authorData.lastName} onChange={handleInputData} />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="country">Country</InputLabel>
                                <Input id="country" value={authorData.country} onChange={handleInputData} />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="language">Language</InputLabel>
                                <Input id="language" value={authorData.language} onChange={handleInputData} />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="yearBorn">Year Born</InputLabel>
                                <Input id="yearBorn" value={authorData.yearBorn} onChange={handleInputData} />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="yearDied">Year Died</InputLabel>
                                <Input id="yearDied" value={authorData.yearDied} onChange={handleInputData} />
                            </FormControl>
        
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
                                    {
                                        isUpdate ? 'Update' : 'Create'
                                    }
                                </Button>
                            </div>
                        
                        </form>        
                    </Container>
                )
            }

        </>
    );
};

export default AuthorForm;