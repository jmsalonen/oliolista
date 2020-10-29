import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [firstList, setFirstList] = useState([
    {value: {firstName: "Enoch", lastName: "Brutus", age: "51"}, checked: false},
    {value: {firstName: "Malisa", lastName: "Liebsch", age: "8"}, checked: false},
    {value: {firstName: "Jerome", lastName: "Carballo", age: "20"}, checked: false},
    {value: {firstName: "Marylynn", lastName: "Ard", age: "88"}, checked: false},
    {value: {firstName: "Alvina", lastName: "Jennings", age: "5"}, checked: false}
  ]);
  
  const [secondList, setSecondList] = useState([
    {value: {firstName: "Hedwig", lastName: "Calcagno", age: "35"}, checked: false},
    {value: {firstName: "Stanley", lastName: "Tuller", age: "18"}, checked: false},
    {value: {firstName: "Henry", lastName: "Ballentine", age: "3"}, checked: false},
    {value: {firstName: "Rico", lastName: "Fuston", age: "53"}, checked: false},
    {value: {firstName: "Frankie", lastName: "Plank", age: "8"}, checked: false}
  ]);
  
  const [search, setSearch] = useState("");
  
  // ------- Eventit -------
  
  const handleChange = (index, listName) => {
    let newList = listName === "first" ? [...firstList] : [...secondList]
    newList[index].checked = newList[index].checked ? false : true
    listName === "first" ? setFirstList(newList) : setSecondList(newList)
  }
  
  const moveCheckedItems = () => {
    let newFirst = firstList.filter(item => item.checked)
    let newSecond = secondList.filter(item => item.checked)
    setFirstList(firstList.filter(item => !item.checked).concat(newSecond))
    setSecondList(secondList.filter(item => !item.checked).concat(newFirst))
  }
  
  const filterItems = (event) => {
    setSearch(event.target.value)
  }
  
  // ------ Sorttaus -------

  const isSorted = (listName, sorted) => {
    let original = listName === "first" ? [...firstList] : [...secondList]
    for (let i = 0; i < original.length; ++i) {
      if (original[i].value.firstName !== sorted[i].value.firstName)
        return false
    }
    return true
  }
  
  const sortList = (listName, type) => {
    let tempList = listName === "first" ? [...firstList] : [...secondList]
    if (type === "firstName")
      tempList.sort(compareFirst)
      else if (type === "lastName")
      tempList.sort(compareLast)
      else
      tempList.sort(compareAge)
      
    if (isSorted(listName, tempList))
      listName === "first" ? setFirstList(tempList.reverse()) : setSecondList(tempList.reverse())
    else
      listName === "first" ? setFirstList(tempList) : setSecondList(tempList)
  }
  
  function compareFirst(a, b) {
    return a.value.firstName < b.value.firstName ? -1 : 1
  }
  function compareLast(a, b) {
    if (a.value.lastName === b.value.lastName)
      return compareFirst(a, b)
    return a.value.lastName < b.value.lastName ? -1 : 1
  }
  function compareAge(a, b) {
    if (parseInt(a.value.age) === parseInt(b.value.age)) 
      return compareLast(a, b)
    return parseInt(a.value.age) < parseInt(b.value.age) ? -1 : 1
  }

  // -------- JSX ----------

  const printList = (list, listName) => {
    let filtered = list.filter(item => item.value.firstName.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
                                        item.value.lastName.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) ||
                                        parseInt(item.value.age) === parseInt(search))
    if (filtered.length < 1) 
      return <ul> Empty </ul>
    else 
      return filtered.map((item, index) => (
        <ul>
          <input key={index} 
                type="checkbox" 
                checked={item.checked} 
                onChange = {() => handleChange(index, listName)}/>
          {item.value.firstName.padStart(16, '.')}{item.value.lastName.padStart(19, '.')}{item.value.age.padStart(10, '.')}
        </ul>
      )
    )
  }

  return (
    <div>
      <ul>
      <button onClick={moveCheckedItems}> Move Items</button>
        {" search:"} 
        <input onChange = {(event) => filterItems(event)}></input>
      </ul>
      <div className="container">
        <div className="fixed">
          <ul>
            <button onClick={() => sortList("first", "firstName")} className="listButton">First name</button>
            <button onClick={() => sortList("first", "lastName")} className="listButton">Last name</button>
            <button onClick={() => sortList("first", "age")} className="listButton-age">Age</button>
          </ul>{printList(firstList, "first")}
        </div>
        <div className="flex-item">
          <ul>
            <button onClick={() => sortList("second", "firstName")} className="listButton">First name</button>
            <button onClick={() => sortList("second", "lastName")} className="listButton">Last name</button>
            <button onClick={() => sortList("second", "age")} className="listButton-age">Age</button>
          </ul>{printList(secondList, "second")}
        </div>
      </div>      
    </div>
  );
}

export default App;
