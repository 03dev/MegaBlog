import conf from "../conf/conf";
import { Client, Databases, Storage, ID } from "appwrite";

export class File {
    client = new Client;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error : ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error : ", error);
            return false
        }
    }

    async filePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
}

const file = new File();

export default file