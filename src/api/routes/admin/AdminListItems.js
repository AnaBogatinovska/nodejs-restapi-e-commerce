const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const checkAuth = require("../../middleware/check-auth");
const adminController = require("../../controllers/AdminListiItems")

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function(req, file, cb) {
        console.log('filemulter',file)
        cb(null, uuidv4() + '.' + file.originalname.split(".")[1])
    }
})
const upload = multer({ storage })

router.get("/", checkAuth, adminController.get_all_list_items);

router.get("/:id", checkAuth, adminController.get_list_item);

router.post("/", checkAuth, upload.single("File"), adminController.post_list_item);

router.put("/:id", checkAuth, upload.single("File"), adminController.put_list_item);

router.delete("/:id", checkAuth, adminController.delete_list_item);

module.exports = router;
