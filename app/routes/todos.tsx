import { ActionFunction, Form, json, LoaderFunction, useLoaderData } from "remix";
import TodoItem from "~/components/TodoItem";
import { Todo } from "~/model/todos";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const todos = await db.todos.findMany();
  return json(todos);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  await db.todos.create({ data: { title } });
  return null;
};

export default function Todos() {
  const todos = useLoaderData<Todo[]>();
  const itemsLeft = Array.isArray(todos) ? todos.filter((todo) => !todo.completed).length : 0;
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form method="post" reloadDocument>
          <input className="new-todo" name="title" placeholder="What needs to be done?" autoFocus />
        </Form>
      </header>
      <section className="main">
        <form action="/todos/toggle-all" method="POST">
          <button type="submit" id="toggle-all" className="toggle-all"></button>
          <label htmlFor="toggle-all">Mark all as complete</label>
        </form>
        <ul className="todo-list" id="todo-list">
          {Array.isArray(todos) && todos.map((todo) => <TodoItem key={todo.id} todo={todo}></TodoItem>)}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{itemsLeft}</strong> {itemsLeft == 1 ? "item" : "items"} left
        </span>
        <ul className="filters">
          <li>
            <a className="{all ? 'selected' : ''}" href="/todos">
              All
            </a>
          </li>
          <li>
            <a className="{active ? 'selected' : ''}" href="/todos/active">
              Active
            </a>
          </li>
          <li>
            <a className="{completed ? 'selected' : ''}" href="/todos/completed">
              Completed
            </a>
          </li>
        </ul>
        <form action="/todos/clear-completed" method="POST">
          <button className="clear-completed">Clear completed</button>
        </form>
      </footer>
    </section>
  );
}
