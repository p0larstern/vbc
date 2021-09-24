import React, {useState, useEffect} from 'react'
import PriceRow from "./PriceRow";
import UtilsPanel from "./Utils";

function TableHeader() {
  const headers = ["Price", "Veggies", "Total"];
  const headRow = headers.map(item => <th key={"head"+item}>{item}</th>);

  return (
    <thead>
      <tr>{headRow}</tr>
    </thead>
  );
}

function VeggieTable() {
  const [nextId, setNextId] = useState(1);
  const [priceRows, setPriceRows] = useState([{
    price: 15,
    rowId: 'r0',
  }]);
  const [amount, setAmount] = useState(0);

  // Adding a price row by useState setter
  const handlePriceRowAddition = (newPrice) => {
    // Avoid adding another row with duplicate price
    if(!(priceRows.map(i => i.price).includes(newPrice))) {
      const newPriceRow = {
        price: newPrice,
        rowId: `r${nextId}`,
      };

      setPriceRows([...priceRows, newPriceRow]);
      setNextId(nextId+1);
    }
  };

  // Total amount to pay to vendor
  const handleRowUpdate = (oldTotal, newTotal) => {
    setAmount(amount - oldTotal + newTotal);
  };

  const tblBody = priceRows.map((item) => (
    <PriceRow
    price={item.price}
    id={item.rowId}
    postUpdate={handleRowUpdate} />
  ));

  return (
    <div>
      <h3>
        Veggie Table
      </h3>
      <table border="1">
        <TableHeader />
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
