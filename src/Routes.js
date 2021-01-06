import Manager from "./components/manager/Manager"
import ViewWindow from "./components/view/ViewWindow"

export default [
  { path: "/", component: Manager, meta: { bodyClass: "bg-light" } },
  { path: "/view", component: ViewWindow },
]
