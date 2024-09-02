import React from 'react'
import { IButton } from '@/app/types/button.interface'

const PrimaryButton: React.FC<IButton> = ({ title, isAuth, onClick }) => {
    return (
        <>
            <button
                className={`bg-green-300 rounded p-3 m-[10px] ${isAuth ? 'text-[20px] bg-green-500' : ''}`}
                onClick={onClick}
            >
                <span>{title}</span>
            </button>
        </>
    )
}

export default PrimaryButton
