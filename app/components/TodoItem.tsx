import { useEffect, useRef } from "react";
import { Form } from "remix";
import { Todo } from "~/model/todos";

export default function TodoItem({
  todo,
  editing,
  onEditTodo,
}: {
  todo: Todo;
  editing: boolean;
  onEditTodo: (id: string | null) => void;
}) {
  const toggleForm = useRef<HTMLFormElement>(null);
  const editInput = useRef<HTMLInputElement>(null);
  const todoClass = `${todo.completed && "completed"} ${editing && "editing"}`;
  useEffect(() => {
    if (editing) {
      editInput.current?.setAttribute("value", todo.title);
      editInput.current?.setSelectionRange(todo.title.length, todo.title.length);
      editInput.current?.focus();
    }
  }, [editInput, editing]);

  return (
    <li className={todoClass} onDoubleClick={() => onEditTodo(todo.id)}>
      <div className="view">
        <Form action={`/todos/${todo.id}`} method="post" ref={toggleForm} reloadDocument replace>
          <input type="hidden" name="_method" value="toggle" />
        </Form>
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleForm.current?.submit()}
        />
        <label>{todo.title}</label>
        <Form action={`/todos/${todo.id}`} method="post" reloadDocument replace>
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="destroy"></button>
        </Form>
      </div>
      <Form action={`/todos/${todo.id}`} method="post" reloadDocument replace>
        <input type="hidden" name="_method" value="edit" />
        <input className="edit" name="title" onBlur={() => onEditTodo(null)} ref={editInput} />
      </Form>
    </li>
  );
}
