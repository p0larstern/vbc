import React, {useState, useEffect} from 'react';
import Container from './VeggieListContainer';

function PriceRow(props) {
  // [total.old, total.new]
  const [state, setState] = useState({
    oldTotal: 0,
    newTotal: 0,
  });

  const price = props.price ?? 10;
  const id = props.id ?? 0;

  const handleListUpdate = newCount => {
    const curTotal = state.newTotal;
    setState({
      oldTotal: curTotal,
      newTotal: price * newCount,
    })
  };

  useEffect(() => {
    if(props.postUpdate !== undefined) {
      props.postUpdate(state.oldTotal, state.newTotal);
    }
  }, [state.newTotal]);

  return (
    <tr key={id}>
      <td>{price}</td>
      <td><Container rowId={id} postUpdate={handleListUpdate}/></td>
      <td>{state.newTotal}</td>
    </tr>
  );
}

export default PriceRow;
