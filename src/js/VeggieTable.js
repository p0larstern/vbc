import React, {useState} from "react";
import UtilsPanel from "./Utils";
import {BASIC_LIST} from './VEGGIE_LIST';
import ItemListContainer from "./VeggieListContainer";

function veggieTable() {
    const [priceRows, setPriceRows] = useState([{
        price:15,
        rowId:'row-0',
        itemList: [],
    }]);

    const [rowCount, setRowCount] = useState(priceRows.length);

    const [amount, setAmount] = useState(0);

    const handleRowAdd = price => {
        let newRowIdx = priceRows.findIndex(obj => obj.price >= price);

        if(newRowIdx == -1 || priceRows[newRowIdx].price != price) {
            if(newRowIdx == -1) newRowIdx = priceRows.length;

            const newPriceRow = {
                price: price,
                rowId: `row-${rowCount}`,
                itemList: [],
            };

            let newPriceRows = priceRows.slice();
            newPriceRows.splice(newRowIdx, 0, newPriceRow);
            setPriceRows(newPriceRows);

            // 1 row now added in state
            setRowCount(rowCount + 1);
        }
    }

    const handleItemAdd = (rowId, itemName) => {
        const priceRow = priceRows.find(obj => obj.rowId == rowId);
        const prItemList = priceRow.itemList;

        const newItem = {
            name: itemName,
            itemId: `${rowId}=item-${prItemList.length}`,
        }

        const changedPrObj = Object.assign(priceRow, {
            itemList: [...prItemList, newItem],
        });

        const newPriceRows = priceRows.map(obj => (
            obj.rowId == rowId ? changedPrObj : obj
        ));
        setPriceRows(newPriceRows);

        // 1 item added
        setAmount(amount + priceRow.price);
    }

    const handleItemDelete = (rowId, itemId) => {
        const priceRow = priceRows.find(obj => obj.rowId == rowId);
        const prItemList = priceRow.itemList;

        const changedPrObj = {
            price: priceRow.price,
            rowId: priceRow.rowId,
            itemList: prItemList.filter(item => item.itemId != itemId),
        };

        const newPriceRows = priceRows.map(obj => (
            obj.rowId == rowId ? changedPrObj : obj
        ));
        setPriceRows(newPriceRows);

        // 1 item removed
        setAmount(amount - priceRow.price);
    }

    return {
        priceRows: priceRows,
        amount: amount,
        handleRowAdd: handleRowAdd,
        itemMethods: {
            handleItemAdd: handleItemAdd,
            handleItemDelete: handleItemDelete,
        },
    };
}

function TableBody(props) {
    const { priceRows, ItemsContainer } = props;
    const {handleItemAdd, handleItemDelete} = props.itemMethods;

    const body = priceRows.map(obj => (
        <tr key={obj.rowId}>
            {/* Price */}
            <td> {obj.price} </td>

            {/* Items */}
            <td>
                {<ItemsContainer
                itemList={obj.itemList}
                suggestions={BASIC_LIST}
                handleItemAdd={name => handleItemAdd(obj.rowId, name)}
                handleItemDelete={id => handleItemDelete(obj.rowId, id)}/>}
            </td>

            {/* Total */}
            <td> {obj.price * obj.itemList.length} </td>
        </tr>
    ));

    return (
        <tbody>
            {body}
        </tbody>
    );
}

function VeggieTableContainer() {
    const headers = ["Price", "Items", "Total"];
    const headRow = headers.map(item => <th key={"head-"+item}>{item}</th>);

    const { priceRows, amount, handleRowAdd, itemMethods } = veggieTable();

    return (
        <>
        {/* Header */}
        <h3>
        Veggie Table
        </h3>

        {/* Table */}
        <table border="1">
            <thead>
            <tr>{headRow}</tr>
            </thead>

            {<TableBody
            priceRows={priceRows}
            itemMethods={itemMethods}
            ItemsContainer={ItemListContainer}/>}

            <tfoot>
                <tr>
                    <td colSpan="3">
                        <h4>Final Amount = {amount}</h4>
                    </td>
                </tr>
            </tfoot>
        </table>


        {/* Utils Panel */}
        <br />
        <UtilsPanel
        submitHandler={handleRowAdd}/>
        </>
    )
}

export default VeggieTableContainer;