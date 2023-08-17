import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UpdateExpensesModel from "../components/UpdateExpensesMode";
import AddExpensesModel from "../components/AddExpensesModel";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/expenses")
      .then((res) => res.json())
      .then((result) => {
        setExpenses(result);
      });
  }, [expenses]);

  const handleDelete = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/expenses/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  const openModal = (id) => {
    setCurrentExpenseId(id);
    setShowModal(true);
  };

  const closeModel = () => {
    setCurrentExpenseId(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* SIDEBAR */}
      <Sidebar />
      {/* SIDEBAR */}
      {/* CONTENT */}
      <section id="content">
        {/* NAVBAR */}
        <Navbar />
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Expenses</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Expenses
                  </a>
                </li>
              </ul>
            </div>
            <a href="#"
              onClick={() => setShowAddModal(true)}
              className="btn-download"
            >
              <span className="text">Add New Expense</span>
            </a>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Expenses</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{expense.createdAt.split("T")[0]}</td>
                      <td>{expense.name}</td>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => openModal(expense._id)}
                        >
                          Edit
                        </button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(expense._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <UpdateExpensesModel
            show={showModal}
            handleClose={closeModel}
            expenseId={currentExpenseId}
          />
          <AddExpensesModel // 4. Rendering the AddExpensesModel
            show={showAddModal}
            handleClose={() => setShowAddModal(false)}
          />
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};
export default Expenses;
