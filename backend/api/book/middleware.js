const multer = require('multer');
const path = require('path');
const appDirectory = path.dirname(require.main.filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${appDirectory}/uploads`);
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'application/pdf') cb(null, true)
        else {
            cb(null, false);
            cb(new Error('Only pdfs allowed'));
        }
    },
    filename: (req, file, cb) => {
        let title = req?.body?.title?.replace(':', '-');
        cb(null, `${title}-${Date.now()}.pdf`)
    }
});

exports.upload = multer({ storage });