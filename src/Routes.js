import Chants from "./chants.json"

export const routes = [
	{
		path: "/",
		name: "home",
		component: () => import(/* webpackChunkName: "home" */ "./components/manager/Manager.vue"),
		meta: { bodyClass: "bg-light" }
	},
	{
		path: "/song/:id",
		name: "song",
		component: () => import(/* webpackChunkName: "song" */ "./components/view/ViewSong.vue"),
		meta: {
			sitemap: {
				slugs: getSongsId()
			}
		}
	}
]

export default routes

function getSongsId() {
	let ids = []
	Chants.forEach((song) => ids.push(song.id))
	return ids
}
