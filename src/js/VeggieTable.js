import React, {useState, useEffect} from 'react'
import PriceRow from "./PriceRow";
import UtilsPanel from "./Utils";

function VeggieTable() {
  const [priceRows, setPriceRows] = useState([]);
  const [amount, setAmount] = useState(0);

  const headers = ["Price", "Veggies", "Total"];
  const headRow = headers.map(item => <th key={"head"+item}>{item}</th>);

  // Adding a price row by useState setter
  const handlePriceRowAddition = (newPrice) => {
    const newPriceRow = {
      price: newPrice,
      index: priceRows.length,
    };

    setPriceRows([...priceRows, newPriceRow]);
  };

  // Total amount to pay to vendor
  const handleRowUpdate = (oldTotal, newTotal) => {
    setAmount(amount - oldTotal + newTotal);
  };

  const tblBody = priceRows.map((item) => (
    <PriceRow
    price={item.price}
    index={item.index}
    postUpdate={handleRowUpdate} />
  ));

  return (
    <div>
      <h3>
        Veggie Table
      </h3>
      <table border="1">
        <thead>
          <tr>
            {headRow}
          </tr>
        </thead>
        <tbody>
          {tblBody}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              {"Final Amount="+amount}
            </td>
          </tr>
        </tfoot>
      </table>
      <br />
      <UtilsPanel submitHandler={handlePriceRowAddition}/>
    </div>
  );
}

export default VeggieTable;
