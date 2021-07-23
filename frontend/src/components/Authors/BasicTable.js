import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';



const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

export default function BasicTable({data, handleDelete}) {
  const classes = useStyles();

  const [updateObj, setHasUpdateObj] = useState({
    isUpdate: false,
    obj: {}
  });

  const handleUpdate = (obj) => {
    setHasUpdateObj({
      isUpdate: true,
      obj: obj
    });
  };

  return (
    <>
      {
        updateObj.isUpdate && 
        (
          <Redirect 
            to={{
              pathname: "/authors/update",
              state: { 
                isUpdate: updateObj.isUpdate,
                data: updateObj.obj
              }
            }}
          />
        )
      }
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">No:</TableCell>
              <TableCell align="right">Literary Name</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Language</TableCell>
              <TableCell align="right">Year Born</TableCell>
              <TableCell align="right">Year Died</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{row.literary_name}</TableCell>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.country}</TableCell>
                  <TableCell align="right">{row.language}</TableCell>
                  <TableCell align="right">{row.year_born}</TableCell>
                  <TableCell align="right">{row.year_died}</TableCell>
                  <TableCell align="right">
                      <IconButton aria-label="edit" onClick={() => handleUpdate(row)}>
                          <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                          <DeleteIcon />
                      </IconButton>
                  </TableCell>
                
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right"><EditIcon /><DeleteIcon /></TableCell> */}

                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}