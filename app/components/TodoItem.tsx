import { useRef } from "react";
import { Form } from "remix";
import { Todo } from "~/model/todos";

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleForm = useRef<HTMLFormElement>(null);
  return (
    <li className={todo.completed ? "completed" : ""}>
      <div className="view">
        <Form action={`/todos/${todo.id}`} method="post" ref={toggleForm}>
          <input type="hidden" name="_method" value="toggle" />
        </Form>
        <input className="toggle" type="checkbox" checked={true} onChange={() => toggleForm.current?.submit()} />
        <label>{todo.title}</label>
        <Form action={`/todos/${todo.id}`} method="post" reloadDocument>
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="destroy"></button>
        </Form>
      </div>
      <Form action={`/todos/${todo.id}`} method="post">
        <input className="edit" name="title" value={todo.title} onChange={(e) => (todo.title = e.target.value)} />
      </Form>
    </li>
  );
}
