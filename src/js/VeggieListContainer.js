import React, {useState, useEffect} from 'react';
import ItemAdder from './ItemAdder';

function ItemListContainer(props) {
  const { itemList, suggestions, handleItemAdd, handleItemDelete } = props;

  return (
    <div className="itemListContainer">
      <CurrentVeggieList listItems={itemList} postDelete={handleItemDelete}/>
      <ItemAdder postSubmit={handleItemAdd} suggestions={suggestions}/>
    </div>
  );
}

function CurrentVeggieList(props) {
  const { listItems, postDelete } = props;

  return (
    <ul>
      {
        listItems.length > 0
          ? listItems.map(i => (
            <li key={`${i.itemId}`}>
              {i.name}
              <button onClick={() => postDelete(i.itemId)}>
                <b>X</b>
              </button>
            </li>
          ))
          : "No items yet"
      }
    </ul>
  );
}

export default ItemListContainer;
