import React, {useState, useEffect} from 'react'
import PriceRow from "./PriceRow";
import UtilsPanel from "./Utils";

function TableHeader() {
  const headers = ["Price", "Items", "Total"];
  const headRow = headers.map(item => <th key={"head-"+item}>{item}</th>);

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
      itemList: [],
    }],
  }

  const [state, setState] = useState(init_state);
  const [amount, setAmount] = useState(0);

  // Adding a price row by useState setter
  const handlePriceRowAddition = (newPrice) => {
    const { priceRows } = state;

    let newRowIdx = priceRows.findIndex(obj => obj.price >= newPrice);
    
    if (newRowIdx == -1 || priceRows[newRowIdx].price != newPrice) {
      if (newRowIdx == -1) newRowIdx = priceRows.length;

      const newPriceRow = {
        price: newPrice,
        rowId: `r${state.nextId}`,
        itemList: [],
      };

      let newPriceRows = priceRows.slice();
      newPriceRows.splice(newRowIdx, 0, newPriceRow);
      console.log(newPriceRows);

      setState({
        priceRows: newPriceRows,
        nextId: state.nextId + 1,
      });
    }
  };

  // Total amount to pay to vendor
  const handleTotalChange = (oldTotal, newTotal) => {
    setAmount(amount - oldTotal + newTotal);
  };

  const handleListChange = (rowId, itemList) => {
    const newPriceRows = state.priceRows.map(obj => (
      obj.rowId != rowId ? obj : {
        price: obj.price,
        rowId: rowId,
        itemList: itemList,
      }
    ));

    setState({
      priceRows: newPriceRows,
    });
  }

  const tblBody = state.priceRows.map((item) => (
    <PriceRow
    priceRowObj={item}
    handleListChange={handleListChange}
    handleTotalChange={handleTotalChange} />
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
