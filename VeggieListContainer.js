import React, {useState} from 'react';
import ItemAdder from './ItemAdder';

function Container(props) {
  // currentList = props.veggies if they are not undefined
  const [currentList, setCurrentList] = useState(props.veggies ?? []);

  const handleItemAdd = newItem => {
    setCurrentList([...currentList, newItem]);
  };

  return (
    <div>
      <CurrentVeggieList listItems={currentList}/>
      <ItemAdder postSubmit={handleItemAdd}/>
    </div>
  );
}

function CurrentVeggieList(props) {
  const listItems = props.listItems;

  const listView = listItems.map(name => {
    return <li>{name}</li>;
  });

  return (
    <ul>
      {listView}
    </ul>
  );
}


export default Container;
