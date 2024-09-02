'use client'

import { useEffect } from 'react'
import SecondaryButton from './buttons/SecondaryButton'

interface IModalWindow {
    children: React.ReactNode
    openModalWindow: boolean
    setOpenModalWindow: (value: boolean) => void
}

const ModalWindow: React.FC<IModalWindow> = ({ children, openModalWindow, setOpenModalWindow }) => {
    useEffect(() => {
        if (openModalWindow) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [openModalWindow])

    const closeIcon = '/icons/closeIcon.svg'

    const handleClose = () => {
        setOpenModalWindow(!openModalWindow)
    }

    return (
        <section className="w-screen h-screen absolute flex justify-center items-center bg-green-100 bg-opacity-95">
            <div className="w-[550px] h-[550px] flex flex-col bg-green-50 rounded">
                {/* CLOSE MODAL WINDOW */}
                <div className=" flex justify-end m-2">
                    <SecondaryButton title={<img src={closeIcon} alt="closeIcon" />} onClick={handleClose} />
                </div>
                {children}
            </div>
        </section>
    )
}

export default ModalWindow
