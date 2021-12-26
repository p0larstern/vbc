import React, {useState, useEffect} from 'react';
import Container from './VeggieListContainer';

function PriceRow(props) {
  const { priceRowObj, handleTotalChange } = props;
  const { price, id, itemList } = priceRowObj;

  const [state, setState] = useState({
    oldTotal: 0,
    newTotal: 0,
  })

  const handleListChange = itemList => {
    props.handleListChange(id, itemList);

    setState({
      oldTotal: state.newTotal,
      newTotal: price * itemList.length,
    })
  }

  // updating list as well as calling hook of parent with useEffect
  const handleItemAdd = itemName => {
    const newItem = {
      name: itemName,
      id: `${rowId}-i${currentList.length}`,
    };

    currentList = [...currentList, newItem];
  };

  const handleItemDelete = itemId => {
    currentList = currentList.filter(item => item.id !== itemId);
  };

  useEffect(() => {
    handleTotalChange(state.oldTotal, state.newTotal);
  }, [state.newTotal])

  return (
    <tr key={id}>
      <td>{price}</td>
      <td>
        <Container
        rowId={id} 
        currentList={itemList}
        postUpdate={handleListChange}
        />
      </td>
      <td>{state.newTotal}</td>
    </tr>
  );
}

export default PriceRow;
