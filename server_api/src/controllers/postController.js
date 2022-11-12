import multer from "multer";
import postService from "../services/posts.service"
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();
const path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: function (req, file, cb) {
        cb(null, "post-" + Date.now() + "-" + file.originalname);
    }
})
const image_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error(Strings.Common.REQUIRE_TYPE_IMAGE)
            err.name = "ExtensionError"
            return cb(err);
        }
    },
}).array("dataImage")

const addPost = async (req, res) => {
    image_upload(req, res, function (err) {
        const post = req.body;
        const dataImage = req.files;
        if (!post.title || !post.price || !post.address || !post.coordinates || !post.typeof_posts_id || !post.typeof_real_estate_id || !post.user_id || !post.status_id || !post.ward_id) {
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.FEILD_REQUIRED_MESSAGE
                }
            })
        }

        if (!dataImage) {
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.REQUIRED_IMAGES_MESSAGE
                }
            })
        }

        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).json({
                code: 500,
                data: {
                    message: `Multer uploading error: ${err.message}`
                }
            })
        } else if (err) {
            // An unknown error occurred when uploading.
            if (err.name == 'ExtensionError') {
                return res.status(413).json({
                    code: 413,
                    data: {
                        message: err.message
                    }
                })
            } else {
                return res.status(500).json({
                    code: 500,
                    data: {
                        message: `Multer uploading error: ${err.message}`
                    }
                })
            }
        } else {
            let postData = postService.handleAddPost(post, dataImage);
            return res.status(200).json({
                code: postData.code,
                data: postData.data ? postData.data : {}
            })
        }
    })
}

const getPostByDistanceLatLng = async (req, res) => {
    const { status_id, lat, lng, distance } = req.body;
    if (!status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_STATUSID_MESSAGE,
            }
        })
    }

    if (!lat || !lng || !distance) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.POST.REQUIRE_LATLNG_DISTANCE_MESSAGE,
            }
        })
    }
    let postData = await postService.handleGetPostDistance(status_id, lat, lng, parseFloat(distance));

    return res.status(200).json({
        code: postData.code,
        data: postData.data ? postData.data : {}
    })
}
module.exports = {
    addPost: addPost,
    getPostByDistanceLatLng: getPostByDistanceLatLng,
}