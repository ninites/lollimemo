
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const CONFIG = {
    cloud_name: "dstjlrma8",
    api_key: "831892493537517",
    api_secret: "kJCpbMkvDLtETs5vHEE08PmkuWw",
}

const DEFAULT_OPTIONS = {
    folder: "memory"
}

class CloudinaryAdapter {
    constructor(cloudinary, streamifier) {
        this._cloudinary = cloudinary;
        this._streamifier = streamifier
        this._cloudinary.config(CONFIG)
    }

    async post(image) {
        console.log("START TO POST IMAGE");
        const url = await new Promise((resolve, reject) => {
            this._streamifier.createReadStream(image.buffer).pipe(
                this._cloudinary.uploader.upload_stream(DEFAULT_OPTIONS, (err, result) => {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                })
            );
        });
        console.log("SUCCESS TO POST IMAGE");
        return url
    }

    async bulkPost(images) {
        const urls = await Promise.all(
            images.map(async (image) => {
                return await this.post(image)
            })
        )
        return urls
    }

    async delete(public_id) {
        console.log("START TO DELETE IMAGE ID" + public_id);
        return await new Promise((resolve, reject) => {
            this._cloudinary.uploader.destroy(public_id, (err, result) => {
                if (err) reject(err);
                resolve(result);
                console.log("SUCESS TO DELETE IMAGE ID" + public_id);
            });
        }).catch((err) => err);
    }
}

const instance = new CloudinaryAdapter(cloudinary, streamifier)
module.exports.CloudinaryAdapter = CloudinaryAdapter
module.exports.CloudinaryAdapterSingleton = instance