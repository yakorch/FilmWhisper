import * as Realm from "realm-web";

export async function deleteLikedFilm(userId, filmId) {
    try {
        const app = new Realm.App({ id: "application-0-xzfrv" });

        const credentials = Realm.Credentials.anonymous();
        const connectedUser = await app.logIn(credentials);

        console.assert(connectedUser.id === app.currentUser.id);

        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("film_whisper_db").collection("users");

        // Update the document to remove the value from the array
        const result = await collection.updateOne(
            { _id: userId },
            { $pull: { favourites: filmId } }
        );

        if (result.modifiedCount > 0) {
            // Update successful
            return [true, result, "Success!"];
        } else {
            // No document matched the query or the value was not found in the array
            console.log("No document found or value not present in the array.");
            return [false, result, "Error!"];
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return [false, "-1", "Something went wrong!"];
    }
}