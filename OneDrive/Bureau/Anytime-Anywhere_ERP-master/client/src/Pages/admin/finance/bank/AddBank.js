import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

function AddBank(props) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  function addBank(e) {
    e.preventDefault();
    axios
      .post("/addbank", {
        name: name,
        balance: balance,
        description: description,
      })
      .then((res) => {
        if (res.data === "SUCCESS") {
          history.push("/banks");
        } else {
          alert("An error occured please try again.");
        }
      });
  }

  return (
    <>
      <section>
        <Link to="/banks">
          <FontAwesomeIcon className="navIcon" icon={solid("arrow-left")} />
        </Link>
      </section>
      <section className="formContainer">
        <div className="card">
          <h3>Add Bank</h3>
          <form onSubmit={addBank}>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="formInput"
              type="text"
              placeholder="Bank Name"
              required
            />
            <input
              onChange={(e) => {
                setBalance(e.target.value);
              }}
              className="formInput"
              type="number"
              placeholder="Bank Balance"
              required
            />
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows="4"
              className="formInput"
              type="text"
              placeholder="Description ..."
              required
            />
            <button className="defaultBtn">Confirm</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddBank;
