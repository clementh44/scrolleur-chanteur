import Chants from "./chants.json"

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "./components/manager/Manager.vue"),
    meta: {
      title: "Scolleur Chanteur",
      bodyClass: "bg-light",
      sitemap: {
        lastmod: new Date().toISOString().slice(0, 10),
      },
    },
  },
  {
    path: "/song/:id",
    name: "song",
    component: () => import(/* webpackChunkName: "song" */ "./components/view/ViewSong.vue"),
    meta: {
      sitemap: {
        slugs: getSitemapInfo(),
      },
    },
  },
]

export default routes

function getSitemapInfo() {
  let ids = []
  Chants.forEach((song) =>
    ids.push({
      id: song.id,
      lastmod: new Date().toISOString().slice(0, 10),
      changefreq: "monthly",
    })
  )
  return ids
}
