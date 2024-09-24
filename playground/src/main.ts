//@ts-ignore
import neplayer from "../../dist/index.full.min.mjs"
import "../../dist/style.css"
import { createApp } from "vue"
import App from "./App.vue"

createApp(App).use(neplayer).mount("#app")
