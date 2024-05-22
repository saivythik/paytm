export function Balance ({balance}) {
    return (
        <div className="h-16 flex rounded-md font-semibold text-lg">
            <div className="flex flex-col justify-center h-full ml-4 font-bold">
                Your Balance
            </div>
            <div className="flex flex-col justify-center h-full ml-4">
                Rs {balance}
            </div>

        </div>
    )
}