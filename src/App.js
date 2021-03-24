import { useState } from "react";

const App = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const addTodoItem = () => {
    setTodoItems(
      todoItems.concat({
        id: Date.now(),
        text: newTodoText,
        checked: false,
      })
    );
  };

  const clearInputField = () => {
    setNewTodoText("");
  };

  const addButtonClickHandler = () => {
    if (newTodoText !== "") {
      addTodoItem();
      clearInputField();
    }
  };

  const checkTodoItem = (item) => {
    setTodoItems(
      todoItems.map((itemToCheck) => {
        if (itemToCheck.id !== item.id) {
          // If this is not the item we're looking for, leave it as-is
          return itemToCheck;
        } else {
          // If this is the item we're looking for, negate the checked state
          return {
            id: itemToCheck.id,
            text: itemToCheck.text,
            checked: !itemToCheck.checked,
          };
        }
      })
    );
  };

  const deleteTodoItem = (item) => {
    setTodoItems(
      todoItems.filter((itemToKeep) => {
        if (itemToKeep.id !== item.id) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  return (
    <div>
      <h1>To-do app</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={(event) => {
          setNewTodoText(event.target.value);
        }}
      />
      <button onClick={addButtonClickHandler}>Add todo</button>
      {todoItems.length === 0 && <p>No items</p>}
      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>
            <span
              style={{
                textDecoration: item.checked ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>
            <input
              type="checkbox"
              onChange={() => {
                checkTodoItem(item);
              }}
            />
            <button
              onClick={() => {
                deleteTodoItem(item);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
