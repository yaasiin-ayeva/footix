import { NextFunction, Request, Response } from "express";
import { H2HService } from "../service/H2H.service";
import multer from 'multer';
import path = require('path');
const documentsFolder = 'assets/documents/xlsx';

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}

export default class CompagnieController {

    private h2hService: H2HService;

    constructor() {
        this.h2hService = new H2HService();
    }

    public createH2HFromXLSXHandler = async (req: any, res: Response, next: NextFunction) => {

        try {
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
            }).single('xlsxFile');

            const h2hList = await this.h2hService.createH2HFromXLSX(req.file.path)
            res.status(200).json({
                message: 'success',
                data: h2hList
            });
        } catch (error) {
            next(new Error(error.message))
        }
    }
}