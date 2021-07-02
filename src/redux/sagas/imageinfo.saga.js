import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* postImageUrl(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'  },
            withCredentials: true,
        };

        const data = {
            imageUrl: action.payload
        }

        const response = yield axios.post('/api/imageurl', data, config)
    //After post comes back successful, do a get! (TODO)

    } catch (error) {
        console.log('Image Url post failed', error);
    }

}

function* imageInfoSaga(){
    yield takeLatest('POST_IMAGE_URL', postImageUrl);
}

export default imageInfoSaga;