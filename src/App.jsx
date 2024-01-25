import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { usestate } from "react";

function App() {
  const addValue = () => {};
  const [data, setdata] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDiscription, setInputDiscription] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditID, setIsEditID] = useState("");

  const CardTitle = (e) => {
    setInputTitle(e.target.value);
  };

  const CardDiscription = (e) => {
    setInputDiscription(e.target.value);
  };

  const handleform = (e) => {
    e.preventDefault();
    setdata([
      ...data,
      {
        inputTitle: inputTitle,
        inputDiscription: inputDiscription,
      },
    ]);
    setInputTitle("");
    setInputDiscription("");
  };
  //edit the items
  const editItem = (id) => {
    const neweditItem = data.filter((_, index) => index == id);

    setToggleSubmit(false);
    setInputTitle(neweditItem[0].inputTitle);
    setInputDiscription(neweditItem[0].inputDiscription);
    console.log(neweditItem);
    setIsEditID(id);
  };

  const updateData = () => {
    const newdata = [...data];
    data.map((item, index) => {
      if (index == isEditID) {
        const updatedata = {
          ...item,

          inputTitle: inputTitle,
          inputDiscription: inputDiscription,
        };
        newdata[isEditID] = updatedata;
      }
    });
    setInputDiscription("");
    setInputTitle("");
    setdata(newdata);
    setToggleSubmit(true);
  };

  //delete the items
  const deleteItem = (id) => {
    const newList = data.filter((_, index) => index != id);
    setdata(newList);
  };
  return (
    <>
      <h2>TODO LIST</h2>
      <div>
        <form onSubmit={(e) => handleform(e)}>
          <input
            type="text"
            className="title"
            value={inputTitle}
            onChange={(e) => CardTitle(e)}
            required
          />
          <br />
          <input
            type="text"
            className="Description"
            value={inputDiscription}
            onChange={(e) => CardDiscription(e)}
            required
          />
          <br />
          {toggleSubmit ? (
            <input className=" my-1 px-5 m-2" type="submit" />
          ) : (
            <input
              className=" my-1 px-5 m-2"
              type="submit"
              value={"update"}
              onClick={() => updateData()}
            />
          )}
        </form>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th className="px-2">SN</th>
              <th className="px-2">Title</th>
              <th className="px-2">Description</th>
              <th className="px-2">Operation</th>
            </tr>
            {data.map((title, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{title.inputTitle}</td>
                <td>{title.inputDiscription}</td>

                <td>
                  <input
                    type="button"
                    className="btn btn-success"
                    value="edit"
                    onClick={() => editItem(index)}
                  />
                  <input
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={() => deleteItem(index)}
                    value="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
