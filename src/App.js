import { useState } from "react";

const App = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  return (
    <div>
      <h1>To-do app</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={(event) => {
          console.log(event);
          setNewTodoText(event.target.value);
        }}
      />
      <button
        onClick={() => {
          if (newTodoText !== "") {
            setTodoItems(
              todoItems.concat({
                id: Date.now(),
                text: newTodoText,
                checked: false,
              })
            );
            setNewTodoText("");
          }
        }}
      >
        Add todo
      </button>
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
              }}
            />
            <button
              onClick={() => {
                setTodoItems(
                  todoItems.filter((itemToKeep) => {
                    if (itemToKeep.id !== item.id) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                );
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
