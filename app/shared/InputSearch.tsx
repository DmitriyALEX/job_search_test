interface IInput {
    handleInputChange: (value: string) => void
}

const InputSearch = ({ handleInputChange }: IInput) => {
    return (
        <>
            <input
                type="text"
                onChange={e => handleInputChange(e.target.value)}
                className=" border-2 border-green-300 rounded w-[500px] p-[1rem] outline-none"
                placeholder="search job"
            />
        </>
    )
}

export default InputSearch
