import { ActionFunction, redirect } from "remix";

export async function loader() {
  return redirect("/todos");
}
