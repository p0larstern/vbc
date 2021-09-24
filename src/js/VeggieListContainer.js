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
      id: `${props.rowId}-i${nextId}`,
    };
    setNextId(nextId + 1);
    setCurrentList([...currentList, newItem]);
  };

  const handleItemDelete = itemId => {
    setCurrentList(currentList.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    if(props.postUpdate !== undefined) {
      props.postUpdate(currentList.length);
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
