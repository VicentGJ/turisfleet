export interface PanelItemType {
  route: string
  name: string
  subItems: PanelItemType[]
  show: boolean
}
