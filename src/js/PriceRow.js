import React, {useState, useEffect} from 'react';
import Container from './VeggieListContainer';

function PriceRow(props) {
  // [total.old, total.new]
  const [total, setTotal] = useState([0,0]);
  const price = props.price ?? 10;
  const id = props.id ?? 0;

  const handleListUpdate = newCount => {
    setTotal([total[1], price * newCount]);
  };
  useEffect(() => {
    if(props.postUpdate !== undefined) {
      props.postUpdate(total[0], total[1]);
    }
  }, [total[1]]);

  return (
    <tr key={id}>
      <td>{price}</td>
      <td><Container rowId={id} postUpdate={handleListUpdate}/></td>
      <td>{total[1]}</td>
    </tr>
  );
}

export default PriceRow;
