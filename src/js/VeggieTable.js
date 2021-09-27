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
  const init_state = {
    nextId: 1,
    priceRows: [{
      price: 15,
      rowId: 'r0',
    }],
  }

  const [state, setState] = useState(init_state);
  const [amount, setAmount] = useState(0);

  // Adding a price row by useState setter
  const handlePriceRowAddition = (newPrice) => {

    let idx; // leftmost element of priceRows with price >= newPrice
    let toAdd = true; // flag
    for (idx = 0; idx < state.priceRows.length; idx++) {
      if (state.priceRows[idx].price >= newPrice) {
        // we should add newPrice here or ignore if duplicate exists
        if(state.priceRows[idx].price == newPrice) {
          toAdd = false;
        }
        break;
      }
    }
    if (toAdd) {
      const newPriceRow = {
        price: newPrice,
        rowId: `r${state.nextId}`,
      };

      const newPriceRows = state.priceRows.slice();
      newPriceRows.splice(idx, 0, newPriceRow);

      setState({
        priceRows: newPriceRows,
        nextId: state.nextId + 1,
      });
    }
  };

  // Total amount to pay to vendor
  const handleRowUpdate = (oldTotal, newTotal) => {
    setAmount(amount - oldTotal + newTotal);
  };

  const tblBody = state.priceRows.map((item) => (
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
