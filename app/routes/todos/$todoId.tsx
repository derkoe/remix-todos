import { ActionFunction, redirect } from "remix";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  switch (form.get("_method")) {
    case "delete":
      await db.todos.delete({ where: { id: params.todoId } });
      break;
    case "toggle":
      await db.$queryRaw`UPDATE todos SET completed = NOT(completed) WHERE id = ${params.todoId}`;
      break;
    case "edit":
      const title = form.get("title") as string;
      await db.todos.update({ data: { title }, where: { id: params.todoId } });
      break;
    default:
      throw new Response(`The _method ${form.get("_method")} is not supported`, { status: 400 });
  }
  return redirect("/todos"); // TODO keep filter after todo item handler
};
