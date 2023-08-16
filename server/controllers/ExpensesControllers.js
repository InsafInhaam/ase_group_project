import Expenses from "../models/Expenses.js";

export const GetExpensesById = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expenses.findById(id);
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({ message: "Failed to get expenses details" });
  }
};
export const GetAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find();
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(400).json({ message: "Failed to get expenses details" });
  }
};
export const CreateExpenses = async (req, res) => {
  try {
    const { name, description, amount } = req.body;
    let expenses = new Expenses({
      name,
      description,
      amount,
    });
    await expenses.save();
    return res.status(201).json({
      id: expenses.id,
      name: expenses.name,
      description: expenses.description,
      amount: expenses.amount,
    });
  } catch (error) {
    return res.status(400).json({ message: "Failed to Create Expenses" });
  }
};
export const UpdateExpenses = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, amount } = req.body;

    let expenses = await Expenses.findById(id);

    if (name) expenses.name = name;
    if (description) expenses.description = description;
    if (amount) expenses.amount = amount;

    await expenses.save();

    return res.status(200).json({ message: "Expenses updated successfully" });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({ message: "Failed to Update Expenses" });
  }
};


export const DeleteExpenses = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteExpenses = await Expenses.findById(id);
    if (!deleteExpenses) {
      return res.status(400).json({ message: "Expense details not found" });
    }
    await Expenses.deleteOne({ _id: id });
    return res.status(200).json({ message: "Expenses deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to Update Expenses" });
  }
};
