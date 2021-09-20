import React, {useState, useEffect} from 'react'
import UtilsPanel from "./Utils";

function VeggieTable() {
  const [priceRows, setPriceRows] = useState([]);

  // Total amount to pay to vendor
  const amount = priceRows.reduce((sum, item) => {
    sum += item.total;
    return sum;
  },0);

  const headers = ["Price", "Veggies", "Total"];
  const headRow = headers.map(item => <th key={"head"+item}>{item}</th>);

  // Adding a price row by useState setter
  const handlePriceRowAddition = (val) => {
    const newPriceRow = {
      price: val,
      veggies: [],
      total: 0,
    };

    setPriceRows([...priceRows, newPriceRow]);
    console.log(newPriceRow);
  };

  const tblBody = priceRows.map((item, idx) => (
    <tr key={"priceRow"+idx}>
      <td>{item.price}</td>
      <td>{item.veggies}</td>
      <td>{item.total}</td>
    </tr>
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
          {"Final Amount="+amount}
        </tfoot>
      </table>
      <UtilsPanel submitHandler={handlePriceRowAddition}/>
    </div>
  );
}

export default VeggieTable;
