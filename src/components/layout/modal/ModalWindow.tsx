import type { PropsWithChildren } from "react"

type ModalWindowProps = PropsWithChildren<{
    open?: boolean
    onClose?: () => void
}>

export const ModalWindow = ({ children, open = false, onClose }: ModalWindowProps) => {
    return (
        <dialog open={open} onClose={onClose}>
            {children}
        </dialog>
    )
}
