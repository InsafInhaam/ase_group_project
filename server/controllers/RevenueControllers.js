import Booking from "../models/Booking.js";
import Expenses from "../models/Expenses.js";

export const TotalRevenue = async (req, res) => {
  try {
    const bookings = await Booking.find();

    // Calculate total price
    let totalPrice = 0;
    for (const booking of bookings) {
      const price = parseFloat(booking.price);
      if (!isNaN(price)) {
        totalPrice += price;
      }
    }

    res.status(201).json({
      //   bookings: bookings,
      totalPrice: totalPrice.toFixed(2), // Round the total price to 2 decimal places
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const NetIncome = async (req, res) => {
  try {
    const expenses = await Expenses.find();
    const bookings = await Booking.find();
    let totalExpenses = 0;
    for (const exp of expenses) {
      const expense = parseFloat(exp.amount);
      if (!isNaN(expense)) {
        totalExpenses += expense;
      }
    }

    let totalIncome = 0;
    for (const booking of bookings) {
      const price = parseFloat(booking.price);
      if (!isNaN(price)) {
        totalIncome += price;
      }
    }
    console.log("total income: ", totalIncome);
    console.log("total expenses: ", totalExpenses);
    const netIncome = totalIncome - totalExpenses;
    return res.status(200).json({ netIncome: netIncome });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
