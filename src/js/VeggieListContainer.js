import React, {useState, useEffect} from 'react';
import ItemAdder from './ItemAdder';
import {BASIC_LIST} from './VEGGIE_LIST';

function Container(props) {
  const [nextId, setNextId] = useState(0);
  const [currentList, setCurrentList] = useState([]);

  // updating list as well as calling hook of parent with useEffect
  const handleItemAdd = newItemName => {
    const newItem = {
      name: newItemName,
      id: nextId,
    };
    setNextId(nextId + 1);
    setCurrentList([...currentList, newItem]);
  };
  useEffect(() => {
    if(props.postAdder !== undefined) {
      props.postAdder(currentList.length);
    }
  }, [currentList]);

  return (
    <div className="listContainer">
      <CurrentVeggieList keyPref={props.rowId} listItems={currentList}/>
      <ItemAdder postSubmit={handleItemAdd} suggestions={BASIC_LIST}/>
    </div>
  );
}

function CurrentVeggieList(props) {
  const { listItems, keyPref } = props;

  return (
    <ul>
      {
        listItems.length > 0
          ? listItems.map(i => (
            <li key={keyPref + `i${i.id}`}>{i.name}</li>
          ))
          : "No items yet"
      }
    </ul>
  );
}

export default Container;
