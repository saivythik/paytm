export function InputBox ({label, type, placeholder, onChange}) {
    return (
        <div className="text-base pt-1 px-2 flex flex-col">
            <label className="text-base text-start"> {label}</label>
            <input onChange={onChange} className="border border-gray-400 w-full p-1" placeholder={placeholder} type={type ? type : ""}></input>
        </div>
    )
}