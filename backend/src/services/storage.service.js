
import dotenv from 'dotenv';
import { ImageKit } from '@imagekit/nodejs';

dotenv.config();

let imageKitClient = null;

function getImageKitClient() {
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
        throw new Error('IMAGEKIT_PRIVATE_KEY is not configured. Set it in your environment before uploading files.');
    }

    if (!imageKitClient) {
        imageKitClient = new ImageKit({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY
        });
    }

    return imageKitClient;
}

async function uploadFile(file) {
    const client = getImageKitClient();
    const result = await client.files.upload({
        file,
        fileName: 'photo_' + Date.now(),
        folder: 'backend/E-com'
    });

    return result;
}

export default {uploadFile} ;