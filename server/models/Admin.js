import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    salt: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret._v1;
      },
    },
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
