// reducer to set the state of the image url from the s3 image uploader
const imageUrlReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_IMAGE_URL':
            return action.payload;
        default:
            return state;
    }
};

export default imageUrlReducer;