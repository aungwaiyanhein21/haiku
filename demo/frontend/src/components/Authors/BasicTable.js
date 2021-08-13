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
import TableSortLabel from '@material-ui/core/TableSortLabel';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import useSortedData from '../../hooks/useSortedDataHook';



const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

export default function BasicTable({data, handleDelete}) {
  const classes = useStyles();

  // for sorting
  const { items, requestSort, sortConfig } = useSortedData(data);

  const getDirection = (name) => {
    
    if (!sortConfig) {
      return;
    }
    
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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
              <TableCell align="center">No:</TableCell>
              <TableCell 
                align="center" 
              >
                <TableSortLabel
                  active={getDirection('literary_name') !== undefined}
                  direction = {getDirection('literary_name')}
                  onClick={() => requestSort('literary_name')}
                >
                  Literary Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Language</TableCell>
              <TableCell align="center">Year Born</TableCell>
              <TableCell align="center">Year Died</TableCell>
              {/* <TableCell align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, index) => (
              <TableRow key={row.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.literary_name}</TableCell>
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.language}</TableCell>
                  <TableCell align="center">{row.year_born}</TableCell>
                  <TableCell align="center">{row.year_died}</TableCell>
                  
                  {/* <TableCell align="center">
                      <IconButton color="primary" aria-label="edit" onClick={() => handleUpdate(row)}>
                          <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="delete" onClick={() => handleDelete(row.id)}>
                          <DeleteIcon />
                      </IconButton>
                  </TableCell>
                 */}
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center"><EditIcon /><DeleteIcon /></TableCell> */}

                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}