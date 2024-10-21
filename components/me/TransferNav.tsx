interface NavProps {
  type: string;
  handleChooseType: (type: string) => void;
}
const TransferNav = ({ type, handleChooseType }: NavProps) => {
  return (
    <nav className="">
      <div className="flex text-center gap-1 font-medium tracking-widest items-center justify-center">
        <p
          className={`relative transition-all duration-300 ease-in-out w-full flex items-center gap-5 justify-center py-2 rounded ${
            type === "internal" ? "bg-primary/5 shadow" : "hover:bg-gray-100"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 ring-1 shadow-inner inline-block rounded-full border ${
              type === "internal"
                ? "bg-primary ring-primary/40"
                : "ring-gray-300"
            }`}
          />
          Internal
          <span
            onClick={() => handleChooseType("internal")}
            className="absolute inset-0 cursor-pointer"
          />
        </p>
        <p
          className={`relative transition-all duration-300 ease-in-out w-full flex items-center gap-5 justify-center py-2 rounded ${
            type === "external" ? "bg-primary/5 shadow" : "hover:bg-gray-100"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 ring-1 shadow-inner inline-block rounded-full border ${
              type === "external"
                ? "bg-primary ring-primary/40"
                : "ring-gray-300"
            }`}
          />
          External
          <span
            onClick={() => handleChooseType("external")}
            className="absolute inset-0 cursor-pointer"
          />
        </p>
      </div>
    </nav>
  );
};

export default TransferNav;
