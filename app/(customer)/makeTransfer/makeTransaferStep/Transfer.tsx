import { useState } from "react";
import InternalTransfer from "./InternalTransfer";
import ExternalTransfer from "./ExternalTransfer";
import TransferNav from "@/components/me/TransferNav";

const Transfer = () => {
  const [type, setType] = useState("internal");

  const handleChooseType = () => {
    setType(type === "internal" ? "external" : "internal");
  };

  return (
    <div className="mx-8">
      <TransferNav handleChooseType={handleChooseType} type={type} />
      {type === "internal" ? <InternalTransfer /> : <ExternalTransfer />}
    </div>
  );
};

export default Transfer;
