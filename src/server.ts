// import mongoose from "mongoose";
// import config from "./app/config";
// import app from "./app";

// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);
//     app.listen(config.port, () => {
//       console.log(`Example app listening on port ${config.port}`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// main();
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

// Connect to the database
mongoose
  .connect(config.database_url as string)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

// Export the app without calling listen()
// Vercel will create the HTTP server and pass requests to your app.
export default app;
