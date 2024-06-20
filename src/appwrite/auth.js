import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
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
            console.log("Appwrite auth :: createAccount :: error : ", error);
        }
    }

    async login({email, password}) {
        try {
            const user = await this.account.createEmailSession(email, password);
            return user;
        } catch (error) {
            console.log("Appwrite auth :: login :: error : ", error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite auth :: logout :: error : ", error);
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

const authService = new AuthServices();

export default authService;