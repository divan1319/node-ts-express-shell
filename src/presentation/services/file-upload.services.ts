import { UploadedFile } from "express-fileupload";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
    constructor(
        private readonly uuid =Uuid.v4
    ) {

    }

    private checkFolder(folderPath: string) {
        if (!existsSync(folderPath)) {
            mkdirSync(folderPath)
        }
    }

    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg']
    ) {
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? ''

            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRquest('Formato no valido')
            }

            const destination = path.resolve(__dirname, '../../../', folder)
            this.checkFolder(destination)
            const fileName = `${this.uuid()}.${fileExtension}`
            file.mv(`${destination}/${fileName}`)

            return {fileName}
        } catch (error) {
            console.log({ error })
            throw error
        }

    }

    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg']
    ) {

            const fileNames = await Promise.all(
                files.map(file=>this.uploadSingle(file,folder,validExtensions))
            )
            return fileNames



    }
}