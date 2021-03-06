import React, { useState } from 'react';

function NewPriceInput(props) {
  const [price, setPrice] = useState(0);

  const submitHandler = event => {
    event.preventDefault();

    // Price from event response
    // console.log(event);
    props.submitHandler(price);
  };

  const handleChange = e => {
    // console.log(e.target.value);
    setPrice(Number(e.target.value));
  }

  return (
    <form
    onChange={handleChange}
    onSubmit={submitHandler}>
      <label>
        Price of new group:
        <br />
        <input
        required
        type="number"
        name="newPrice"
        placeholder="10,20 etc."
        min="1"/>
      </label>
      <input type="submit" value="Add Row" />
    </form>
  );
}

function UtilsPanel(props) {
  return (
    <NewPriceInput
      submitHandler={props.submitHandler}
    />
  );
}

export default UtilsPanel;
