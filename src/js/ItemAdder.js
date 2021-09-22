import React, {useState} from 'react';

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
      placeholder="Item with same price?"
      onChange={handleChange} />
      <datalist id="veggieListData">
        {
          props.suggestions.map((item, idx) => (
            <option key={idx} value={item} />
          ))
        }
      </datalist>
      </form>
    </div>
  );
}

export default ItemAdder;
