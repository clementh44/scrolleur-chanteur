import Manager from "./components/manager/Manager"
import ViewSong from "./components/view/ViewSong"

export default [
	{ path: "/", component: Manager, meta: { bodyClass: "bg-light" } },
	{ path: "/song/:id", name: "song", component: ViewSong }
]
