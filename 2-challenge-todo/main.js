/*
  1. Implement adding and deleting todo items.
  2. Implement completing todo items (completed items should be moved to the bottom).
*/

const { useState } = React;
function MyApp() {
  const defaultList = [
    {
      id: 1,
      text: "Learn React",
      completed: true,
    },
    {
      id: 2,
      text: "Learn Angular",
      completed: false,
    },
    {
      id: 3,
      text: "Learn Vue",
      completed: false,
    },
    {
      id: 4,
      text: "Learn Svelte",
      completed: false,
    },
  ];

  const [todoList, setTodoList] = useState(defaultList);
  const [newItemText, setNewItemText] = useState("");
  const [newItemId, setNewItemId] = useState(5);

  const addItem = () => {
    setNewItemId(newItemId + 1);
    setTodoList([
      ...todoList,
      {
        id: newItemId,
        text: newItemText,
        completed: false,
      },
    ]);
    setNewItemText("");
  };

  const toggleComplete = (item) => {
    const newList = todoList.map((i) => {
      if (i.id === item.id) {
        return { ...item, completed: !item.completed };
      }
      return i;
    });

    newList.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return a.id - b.id;
    });

    setTodoList(newList);
  };

  return (
    <main>
      <h1>React Todo List</h1>
      <input
        type="text"
        placeholder="Add item into as todo"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item)}
            />
            <span className={item.completed ? "deleted" : ""}>{item.text}</span>
            <button onClick={() => deleteItem(item)}>delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

const appEl = document.querySelector("#app");
const root = ReactDOM.createRoot(appEl);

root.render(<MyApp />);
