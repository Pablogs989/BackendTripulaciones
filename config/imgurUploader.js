const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
const { IMGUR_CLIENT_ID} = process.env;

const uploadImageToImgur = async (imagePath) => {
  try {
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    const response = await axios.post('https://api.imgur.com/3/image', form, {
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        ...form.getHeaders(),
      },
    });

    //console.log('Image uploaded successfully:', response.data.data.link);
    return response.data.data.link
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

module.exports = {
	uploadImageToImgur,
};
