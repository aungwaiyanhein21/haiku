import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import { makeStyles } from '@material-ui/core/styles';

import addDefaultSrc from '../../utilities/defaultImageSrc';

// import '../css/FileDropZone.css';

const useStyles = makeStyles({
    fileContainer: {
        marginTop: "30px"
    },
    dropzone: {
        width: "100%",
        minHeight: "150px",
        border: "1px dashed black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
    },
    previewContainer: {
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
});

// .preview-container {
//     margin-top: 30px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// }

const ImageUpload = (props) => {
    const classes = useStyles();

    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            // setting one file
            props.setSelectedFile(acceptedFiles[0]);
            props.setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        },
        multiple: false 
    });
    
  
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));

    }, [files]);

    return (
        <div className={classes.fileContainer}>
            <div {...getRootProps({className: classes.dropzone})}>
                <input {...getInputProps()} />
                <p>Drag and drop an image here, or click to select image</p>
            </div>
            <div className={classes.previewContainer}>
                <p>Image Preview: </p>
                <img 
                    src={props.fileUrl} 
                    width={70}
                    onError={addDefaultSrc}
                />
            </div>
        </div>
    );
};

export default ImageUpload;