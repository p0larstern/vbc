import React, {useState, useEffect} from 'react';
import ItemAdder from './ItemAdder';
import {BASIC_LIST} from './VEGGIE_LIST';

function Container(props) {
  const { rowId } = props;

  // updating list as well as calling hook of parent with useEffect
  const handleItemAdd = newItemName => {
    const newItem = {
      name: newItemName,
      id: `${rowId}-i${currentList.length}`,
    };

    currentList = [...currentList, newItem];
  };

  const handleItemDelete = itemId => {
    currentList = currentList.filter(item => item.id !== itemId);
  };

  useEffect(() => {
    if(props.postUpdate !== undefined) {
      props.postUpdate(currentList);
    }
  }, [currentList]);

  return (
    <div className="listContainer">
      <CurrentVeggieList listItems={currentList} postDelete={handleItemDelete}/>
      <ItemAdder postSubmit={handleItemAdd} suggestions={BASIC_LIST}/>
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
            <li key={`${i.id}`}>
              {i.name}
              <button onClick={() => postDelete(i.id)}>
                <b>X</b>
              </button>
            </li>
          ))
          : "No items yet"
      }
    </ul>
  );
}

export default Container;
