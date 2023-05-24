import * as Realm from "realm-web";

export async function addLikedFilm(userId, filmId) {
    try {
        const app = new Realm.App({ id: "application-0-xzfrv" });

        const credentials = Realm.Credentials.anonymous();
        const connectedUser = await app.logIn(credentials);

        console.assert(connectedUser.id === app.currentUser.id);

        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("film_whisper_db").collection("users");


        // Update the document to add the film to the array
        const result = await collection.updateOne(
            { _id: userId },
            { $addToSet: { favourites: filmId } }
        );

        if (result.modifiedCount > 0) {
            // Update successful
            return [true, result, "Success!"];
        } else {
            // No document matched the query or the film already exists in the array
            console.log("No document found or film already exists in the array.");
            return [false, result, "Error!"];
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return [false, "-1", "Something went wrong!"];
    }
}
