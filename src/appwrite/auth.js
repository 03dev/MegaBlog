import config from '../config/config'
import { Client, Account, ID } from 'appwrite'

class AuthServices{
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.projectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // redirecting to MegaBlog with the help of another funtion
                this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const user = await this.account.createEmailSession(email, password);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();
            return currentUser;
        } catch (error) {
            throw error;
        }

        return null;
    }
}

const authServices = new AuthServices();

export default authServices;