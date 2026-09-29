import { withInstall, withNoopInstall } from '../../utils'
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
import MenuItemGroup from './MenuItemGroup.vue'

export const MoMenu = withInstall(Menu, { MenuItem, SubMenu, MenuItemGroup })
export const MoMenuItem = withNoopInstall(MenuItem)
export const MoSubMenu = withNoopInstall(SubMenu)
export const MoMenuItemGroup = withNoopInstall(MenuItemGroup)
export default MoMenu
export * from './menu'
