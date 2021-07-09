import react, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

// function to handle uploading an image to Amazon aws s3
class ImageUpload extends Component {

    // when the upload is finished, this function is called
    handleFinishedUpload = info => {

        // config file to set the data type of the file being uploaded
        const config = {
            headers: { 'Content-Type': 'application/json'  },
            withCredentials: true,
        };

        // when done uploading, will dispatch to a reducer and set that reducer's state to be the url for the image sitting in the amazon bucket
        // this works in conjunction with the admin pages to then send that url to the database with the other information
        // that url is then used to display the images to the DOM on the other components 
        this.props.dispatch({type: 'SET_IMAGE_URL', payload: info.fileUrl, config})
    }

    // handles rendering the box to the DOM
   render() {

        // configures the upload
       const uploadOptions = {
           server: 'http://localhost:5000',
           signingUrlQueryParams: {uploadType: 'avatar'},
       }
    
       // uploads the image to this url, which is the url for the bucket, will need to be changed if the bucket name is anything else
       const s3Url = 'https://wonder-wander-bucket.s3.amazonaws.com'

        //renders the box to the page    
       return (
           <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
           />
       )
   }
}

// for exporting to the different components 
export default connect()(ImageUpload);