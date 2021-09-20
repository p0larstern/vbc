import React, {useState} from 'react';

function PriceRow(props) {
  const [row, setRow] = useState({
    price: props.price,
    veggies: [],
    total: 0,
  });
}
