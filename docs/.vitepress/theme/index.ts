import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MoMeng from 'momeng-ui'
import Demo from './components/Demo.vue'
import HomePage from './components/HomePage.vue'
import ColorPalette from './components/ColorPalette.vue'
import IconGallery from './components/IconGallery.vue'
import DoDont from './components/DoDont.vue'
import TokenTable from './components/TokenTable.vue'
import ComponentOverview from './components/ComponentOverview.vue'
import Playground from './components/Playground.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(MoMeng)
    app.component('Demo', Demo)
    app.component('HomePage', HomePage)
    app.component('ColorPalette', ColorPalette)
    app.component('IconGallery', IconGallery)
    app.component('DoDont', DoDont)
    app.component('TokenTable', TokenTable)
    app.component('ComponentOverview', ComponentOverview)
    app.component('Playground', Playground)
  },
} satisfies Theme
