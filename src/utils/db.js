import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected successfull");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
