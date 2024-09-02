import React from 'react'
import { IButton } from '@/app/types/button.interface'

const SecondaryButton: React.FC<IButton> = ({ title, onClick }) => {
    return (
        <>
            <button
                className="flex items-center justify-center bg-green-200 p-[10px] w-[150px] rounded-md text-lg"
                onClick={onClick}
            >
                <span className=" p-10px">{title}</span>
            </button>
        </>
    )
}

export default SecondaryButton
