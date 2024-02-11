import axios from 'axios';

const uploadImage = {
    upload(img: FormData) {
        const url = `https://api.cloudinary.com/v1_1/drussspqf/image/upload`;
        return axios.post(url, img);
    },
};

export default uploadImage;
