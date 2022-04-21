import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Bank(props) {
  const [banksList, setBanksList] = useState([]);
  const [waiting, setWaiting] = useState(true);

  function commafy(num) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }

  useEffect(() => {
    axios.get("getbanks").then((res) => {
      if (res.data) {
        setBanksList(res.data);
        setWaiting(false);
      }
    });
  });
  return (
    <>
      <section className="container">
        {waiting ? (
          <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} size={"2x"} spin />
          </div>
        ) : (
          <div className="row">
            {banksList.map((bank) => {
              return (
                <div key={bank._id} className="col3">
                  <h5>{bank.name}</h5>
                  {/* <h5>{commafy(bank.balance)}</h5> */}
                  <p>{bank.description}</p>
                </div>
              );
            })}
            <div align="center" className="col3">
              <Link to="/banks/add">
                <FontAwesomeIcon
                  className="addBtn"
                  icon={solid("plus-circle")}
                  size={"2x"}
                />
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Bank;