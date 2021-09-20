import React, {useState} from 'react';

const VEGGIE_LIST = [
  'onion',
  'potato',
  'carrot',
  'brinjal',
  'tomato',
  'lauki',
  'torai',
  'arbi'
];

function ItemAdder(props) {
  const [newItem, setNewItem] = useState(null);
  
  const handleChange = event => {
    setNewItem(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.postSubmit(newItem);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
      required
      type="text"
      list="veggieListData"
      name="itemToAdd"
      onChange={handleChange} />
      <datalist id="veggieListData">
        {
          VEGGIE_LIST.map((item, idx) => (
            <option key={idx} value={item} />
          ))
        }
      </datalist>
      </form>
    </div>
  );
}

export default ItemAdder;
