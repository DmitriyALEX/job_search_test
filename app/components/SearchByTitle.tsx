'use client'
import PrimaryButton from '@/app/shared/buttons/PrimaryButton'
import InputSearch from '@/app/shared/InputSearch'
import React, { useState } from 'react'

interface ISearchByTitle {
    onSearch: (value: string) => void
}

const SearchByTitle: React.FC<ISearchByTitle> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>('')

    const handleInputChange = (value: string) => {
        setInputValue(value)
    }

    const handleSetValue = () => {
        onSearch(inputValue)
    }

    return (
        <section>
            <InputSearch handleInputChange={handleInputChange} />
            <PrimaryButton title="search" onClick={handleSetValue} />
        </section>
    )
}

export default SearchByTitle
