async function addLikedFilm(userId, filmId) {
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
            console.log("Film added to the array.");
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






User
Why this gives an error?


export default async function getUserInfo(userId) {
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


const dBResponse = getUserInfo(userID);
const [isSuccess, userInfo, message] = dBResponse;


dBResponse is not iterable
ChatGPT

2 / 2

The error you're encountering is because getUserInfo is an asynchronous function that returns a promise. To access the result of the promise and destructure the values, you need to await the promise. Here's the modified code:

    javascript
Copy code
const dBResponse = await getUserInfo(userID);
const [isSuccess, userInfo, message] = dBResponse;
By adding the await keyword before getUserInfo(userID), you're waiting for the promise to resolve and retrieving its result. Then you can proceed with destructuring the values from the resolved promise.

Make sure you're using the await keyword within an async function or within a context that supports asynchronous operations, such as inside another async function or using the then method of the promise.




Was this response better or worse?
    Better
    Worse
Same



