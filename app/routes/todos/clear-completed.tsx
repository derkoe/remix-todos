import { ActionFunction, redirect } from "remix";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  await db.todos.deleteMany({ where: { completed: true } });
  return redirect("/todos");
};
