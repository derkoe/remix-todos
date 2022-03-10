import { Todo } from "~/model/todos";

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <div className="view">
        <form action={`/todos/{todo.id}/toggle`} method="POST"></form>
        <input className="toggle" type="checkbox" checked={todo.completed} onClick={() => console.log("x")} />
        <label>{todo.title}</label>
        <form action="/todos/{todo.id}/delete" method="POST">
          <button type="submit" className="destroy"></button>
        </form>
      </div>
      <form action="/todos/{todo.id}" method="POST">
        <input className="edit" name="title" value={todo.title} />
      </form>
    </li>
  );
}
