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

import addDefaultSrc from '../../utilities/defaultImageSrc';

import HaikuInfoModal from '../Modal/HaikuInfoModal';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal';
import useSortedData from '../../hooks/useSortedDataHook';



const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableContainer: {
    maxHeight: "80vh"
  },
  haikuTitle: {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer"
  },
  img: {
    width: "80px"
  }
});

export default function BasicTable({data, handleDelete}) {
  console.log('in basic table');
  console.log(data);

  const classes = useStyles();

  // for sorting
  const { items, requestSort, sortConfig } = useSortedData(data);

  const getDirection = (name) => {
    
    if (!sortConfig) {
      return;
    }
    
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // modal containing more info about haiku
  const [openHaikuInfoModal, setOpenHaikuInfoModal] = useState(false);
  
  const handleHaikuInfoModalOpen = () => setOpenHaikuInfoModal(true);

  const handleHaikuInfoModalClose = () => setOpenHaikuInfoModal(false);

  // for delete confirmation modal
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false);
  
  const handleDeleteConfirmationModalOpen = () => setOpenDeleteConfirmationModal(true);

  const handleDeleteConfirmationModalClose = () => setOpenDeleteConfirmationModal(false);


  const [haikuInfoObj, setHaikuInfoObj] = useState({});
  const handleHaikuInfo = (obj) => {
    setHaikuInfoObj(obj);
    handleHaikuInfoModalOpen();
  };

  const [updateObj, setHasUpdateObj] = useState({
    isUpdate: false,
    obj: {}
  });

  const [deleteId, setDeleteId] = useState(-1);

  const handleUpdate = (obj) => {
    setHasUpdateObj({
      isUpdate: true,
      obj: obj
    });
  };

  const updateDeleteId = (id) => {
    setDeleteId(id);
    handleDeleteConfirmationModalOpen();
  };

  
  return (
    <>
      {
        updateObj.isUpdate && 
        (
          <Redirect 
            push
            to={{
              pathname: "/haiku/update",
              search: `?id=${updateObj.obj.id}`
              // state: { 
              //   isUpdate: updateObj.isUpdate,
              //   data: updateObj.obj
              // }
            }}
          />
        )
      }
      {
          openHaikuInfoModal && (
              <HaikuInfoModal 
                  open={openHaikuInfoModal} 
                  setOpen={setOpenHaikuInfoModal} 
                  handleClose={handleHaikuInfoModalClose} 
                  haikuData={haikuInfoObj}
              />
          )
      }

      {
          openDeleteConfirmationModal && (
              <DeleteConfirmationModal 
                  open={openDeleteConfirmationModal} 
                  setOpen={setOpenDeleteConfirmationModal} 
                  handleClose={handleDeleteConfirmationModalClose} 
                  handleDelete={handleDelete}
                  deleteId={deleteId}
              />
          )
      }

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell 
                align="center">
                No:
              </TableCell>
              <TableCell 
                align="center">
                Image
              </TableCell>
              <TableCell 
                align="center" 
                
              >
                <TableSortLabel
                  active={getDirection('author') !== undefined}
                  direction = {getDirection('author')}
                  onClick={() => requestSort('author')}
                >
                  Author
                </TableSortLabel>
                
              </TableCell>
              <TableCell 
                align="center" 
              >
                <TableSortLabel
                  active={getDirection('title') !== undefined}
                  direction = {getDirection('title')}
                  onClick={() => requestSort('title')}
                >
                  Haiku Title
                </TableSortLabel>
                
              </TableCell>
              <TableCell 
                align="center" 
              >
                <TableSortLabel
                  active={getDirection('published_year') !== undefined}
                  direction = {getDirection('published_year')}
                  onClick={() => requestSort('published_year')}
                >
                  Published Year
                </TableSortLabel>
              </TableCell>
              {/* <TableCell align="center">Haiku Text</TableCell>
              <TableCell align="center">Reference</TableCell>
              <TableCell align="center">Emotion</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Language</TableCell>
              <TableCell align="center">English Translation</TableCell>
              <TableCell align="center">Passage 1</TableCell>
              <TableCell align="center">Passage 2</TableCell> */}
              <TableCell 
                align="center" 
              >
                <TableSortLabel
                  active={getDirection('category_1') !== undefined}
                  direction = {getDirection('category_1')}
                  onClick={() => requestSort('category_1')}
                >
                  Category 1
                </TableSortLabel>
                
              </TableCell>
              <TableCell 
                align="center" 
              >
                <TableSortLabel
                  active={getDirection('category_2') !== undefined}
                  direction = {getDirection('category_2')}
                  onClick={() => requestSort('category_2')}
                >
                  Category 2
                </TableSortLabel>
                
              </TableCell>
              {/* <TableCell align="center">Concept 1</TableCell>
              <TableCell align="center">Concept 2</TableCell> */}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, indx) => (
              <TableRow key={row.id}>
                  <TableCell align="center">{indx + 1}</TableCell>
                  <TableCell align="center">
                    <img
                      className={classes.img} 
                      src={process.env.REACT_APP_SERVER_URL + row.image_path} 
                      alt={process.env.REACT_APP_SERVER_URL + row.image_path}
                      onError={addDefaultSrc}
                    />
                  </TableCell>
                  <TableCell align="center">{row.author}</TableCell>
                  <TableCell align="center"><a className={classes.haikuTitle} onClick={() => handleHaikuInfo(row)}>{row.title}</a></TableCell>
                  <TableCell align="center">{row.published_year}</TableCell>
                  {/* <TableCell align="center">
                      {row.haiku_text.split('\n').map((txt, indx) => (<div key={indx}>{txt} <br /><br /></div>))}
                  </TableCell>
                  <TableCell align="center"><a href={row.reference} target="__blank">{row.reference}</a></TableCell>
                  <TableCell align="center">{row.emotion}</TableCell>
                  <TableCell align="center">
                      {row.comments.split('\n').map((txt, indx) => (<div key={indx}>{txt} <br /><br /></div>))}
                  </TableCell>
                  <TableCell align="center">{row.language}</TableCell>
                  <TableCell align="center">
                      {row.english_translation.split('\n').map((txt, indx) => (<div key={indx}>{txt} <br /><br /></div>))}
                  </TableCell>
                  <TableCell align="center">
                      {row.passage_1.split('\n').map((txt, indx) => (<div key={indx}>{txt} <br /><br /></div>))}
                  </TableCell>
                  <TableCell align="center">
                      {row.passage_2.split('\n').map((txt, indx) => (<div key={indx}>{txt} <br /><br /></div>))}
                  </TableCell> */}
                  <TableCell align="center">{row.category_1}</TableCell>
                  <TableCell align="center">{row.category_2}</TableCell>
                  {/* <TableCell align="center">{row.concept_1}</TableCell>
                  <TableCell align="center">{row.concept_2}</TableCell> */}
                  <TableCell align="center">
                      <IconButton color="primary" aria-label="edit" onClick={() => handleUpdate(row)}>
                          <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="delete" onClick={() => updateDeleteId(row.id)}>
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