import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExpensesSchema = new Schema(
  {
    name: String,
    description: String,
    amount: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._v1;
      },
    },
    timestamps: true,
  }
);

const Expenses = mongoose.model("Expenses", ExpensesSchema);
export default Expenses;
