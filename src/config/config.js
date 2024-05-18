const config = {
    appwriteUrl: String(import.meta.VITE_APPWRITE_URL),
    projectId: String(import.meta.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.VITE_APPWRITE_BUCKET_ID)
}

export default config