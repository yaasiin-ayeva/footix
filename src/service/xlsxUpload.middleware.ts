import multer from 'multer';
import path = require('path');
import { H2HService } from './H2H.service';
const documentsFolder = 'assets/documents';

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, documentsFolder)
        },
        filename: function (req, file, callback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
        }
    })
});

export default class XLSXUplaodMiddleware {
    upload = upload.single('xlsxFile');

    private h2hService: H2HService = new H2HService();

    async processXLSX(req: any, res: any) {
        try {
            const h2hList = await this.h2hService.createH2HFromXLSX(req.file.path);
            res.send(h2hList);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}