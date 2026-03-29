// dotenv
require("dotenv").config();
// express
const express = require("express");
const app = express();
// morgan for logging
const morgan = require("morgan");
app.use(morgan("dev"));
//midellware>>restApi
app.use(express.json());

const { errorMiddelware } = require("./middelwares/globalErrorMidellware");

// routes 
const authRoute = require("./routes/authRoute")
if (!authRoute) {
    console.log("authRoute failed to load");

}
app.use("/api", authRoute);
const categoryRoutes = require('./routes/categoryRoute');
if (!categoryRoutes) {
    console.log("categoryRoutes failed to load");
}

app.use("/api/categories", categoryRoutes);


const productRoutes = require('./routes/productRoute');
if (!productRoutes) {
    console.log("productRoutes failed to load");
}
app.use("/api/products", productRoutes);



app.use(errorMiddelware);


//port
const port = process.env.PORT || 5000
//db connect 
const mongoose = require("mongoose")
async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL)

        console.log("DB connected succesfully ");

    } catch (error) {
        console.log(error)

    }
}
dbConnect();
// listen

app.listen(port, () => {
    console.log(`Server Is running on post ${port}`);
})