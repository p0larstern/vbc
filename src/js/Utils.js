import React from 'react';

function NewPriceInput(props) {
  const submitHandler = event => {
    event.preventDefault();

    // Price from event response
    let newPrice = event.target.newPrice.value;
    props.submitHandler(newPrice);
  };

  return (
    <form onSubmit={submitHandler}>
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
