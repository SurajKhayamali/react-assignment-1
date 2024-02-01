import { useEffect, useRef, useState } from 'react';
import Button from '../../compoments/Button';

interface TodoProps {
  todo: string;
}

const Todo = (props: TodoProps) => {
  const { todo: title } = props;
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener('input', handleInput);

    return () => ref.current?.removeEventListener('input', handleInput);
  }, []);

  const handleInput = (e: Event) => {
    console.log(e);
  };

  const handleEdit = () => {};

  return (
    <li ref={ref}>
      {title} <Button title="Edit" onClick={handleEdit} />
    </li>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodo = (title: string) => {
    setTodos((oldTodos) => [...oldTodos, title]);
  };

  const updateTodo = (index: number, title: string) => {
    const todo = todos[index];
    if (!todo) return;

    setTodos((oldTodos) => [
      ...oldTodos.slice(0, index),
      title,
      ...oldTodos.slice(index + 1, oldTodos.length),
    ]);
  };

  const handleAdd = () => {
    if (!inputRef.current?.value) return;

    const title = inputRef.current.value;

    if (todos.includes(title)) return;

    addTodo(title);
    inputRef.current.value = '';
  };
  console.log(todos);

  return (
    <>
      <div className="join">
        <input
          ref={inputRef}
          className="input input-bordered join-item"
          placeholder="Add a todo"
        />
        <button onClick={handleAdd} className="btn join-item rounded-r-full">
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <Todo key={todo} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
