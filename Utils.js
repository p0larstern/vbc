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
        Price of new row:
        <br />
        <input required type="number" name="newPrice" />
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
