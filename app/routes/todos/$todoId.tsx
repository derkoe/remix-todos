import { ActionFunction, redirect } from "remix";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    console.log("Deleting todo", params.todoId);
    await db.todos.delete({ where: { id: params.todoId } });
  }
  return redirect("/todos");
};
