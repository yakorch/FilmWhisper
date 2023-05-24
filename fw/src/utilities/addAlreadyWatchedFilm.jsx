import * as Realm from "realm-web";

async function getUserInfo(userId, filmId) {
    try {
        const app = new Realm.App({ id: "application-0-xzfrv" });

        const credentials = Realm.Credentials.anonymous();
        const connectedUser = await app.logIn(credentials);

        console.assert(connectedUser.id === app.currentUser.id);

        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("film_whisper_db").collection("users");

        // Check if user with such email exists
        const userInfo = await collection.find({_id: userId});
        if (!userInfo || userInfo.length < 1){
            return [false, null, "User not found!"];
        }

        return [true, userInfo, "Success!"];
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return [false, "-1", "Something went wrong!"];
    }
}