import React, { useEffect, useState } from 'react';
import BasicTable from './BasicTable';

import { Container, Typography } from '@material-ui/core';

import { Redirect } from 'react-router-dom';

import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';


const Authors = () => {
    const [authorData, setAuthorData] = useState(null);

    const [hasClickedCreate, setHasClickedCreate] = useState(false);
    
    const getData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/authors/read.php`)
        .then(response => {
            console.log(response.data);
            setAuthorData(response.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/authors/delete.php`, {
            data: {
                id: id
            }
        })
        .then(response => {
            console.log(response.data);
            getData();
            // setAuthorData(response.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        getData();
    }, []); 

    return (
        <>
            {
                hasClickedCreate && <Redirect to="/authors/create" />
            }
   
            <Container maxWidth="lg">
            

                <Typography variant="h4" align="center" color="textPrimary">
                    Author
                </Typography>


                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CreateIcon />}
                    onClick={() => setHasClickedCreate(true)}
                >
                    Create
                </Button>

                {
                    !authorData && <div><CircularProgress /></div>
                }

                {
                    authorData && <BasicTable data={authorData} handleDelete={handleDelete}/>
                }
                
            </Container>    
        </>
    );
};

export default Authors;