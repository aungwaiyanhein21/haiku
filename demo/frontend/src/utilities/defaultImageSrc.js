// add a default image when image load fails
const addDefaultSrc = (e) => {
    e.target.src = `${process.env.REACT_APP_SERVER_URL}/images/default.png`;
};

export default addDefaultSrc;