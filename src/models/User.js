import mongoose from "mongoose";

const { Schema } = mongoose;

// delete mongoose.connection.models["User"];

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },

    identificationCard: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    nationalId: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    nationalId: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    bankInfo: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model("User", userSchema);
