export interface IButton {
    title: string | JSX.Element
    onClick?: () => void
    type?: string
    isAuth?: boolean
}
