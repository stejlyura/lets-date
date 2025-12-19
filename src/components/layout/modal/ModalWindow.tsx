import { useEffect, type PropsWithChildren } from "react"
import { createPortal } from "react-dom"

type ModalWindowProps = PropsWithChildren<{
    open?: boolean
    onClose?: () => void
}>

export const ModalWindow = ({ children, open = false, onClose }: ModalWindowProps) => {
    useEffect(() => {
        if (!open || typeof document === "undefined") {
            return
        }

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [open])

    if (!open) {
        return null
    }

    if (typeof document === "undefined") {
        return null
    }

    return createPortal(
        <dialog
            open={open}
            onClose={onClose}
            className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-start justify-center bg-black/80 p-6"
        >
            {children}
        </dialog>,
        document.body
    )
}
