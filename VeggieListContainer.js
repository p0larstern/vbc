import React, {useState, useEffect} from 'react';
import ItemAdder from './ItemAdder';

function Container(props) {
  const [currentList, setCurrentList] = useState([]);

  // updating list as well as calling hook of parent with useEffect
  const handleItemAdd = newItem => {
    setCurrentList([...currentList, newItem]);
  };
  useEffect(() => {
    if(props.postAdder !== undefined) {
      props.postAdder(currentList.length);
    }
  }, [currentList]);

  return (
    <div>
      <CurrentVeggieList keyPref={props.rowId} listItems={currentList}/>
      <ItemAdder postSubmit={handleItemAdd}/>
    </div>
  );
}

function CurrentVeggieList(props) {
  const listItems = props.listItems;

  return (
    <ul>
      {
        listItems.length > 0
          ? listItems.map(name => <li key={props.keyPref + name}>{name}</li>)
          : "No items yet"
      }
    </ul>
  );
}

export default Container;
