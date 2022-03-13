import { ActionFunction, redirect } from "remix";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  await db.$queryRaw`UPDATE todos SET completed = NOT(completed)`;
  return redirect("/todos");
};
