"use client";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({
  children,
  toggleState,
}: {
  children: ReactNode;
  toggleState: boolean;
}) => {
  const mountElement = document.querySelector("#root");
  console.log(mountElement);

  return (
    <>{mountElement && toggleState && createPortal(children, mountElement)}</>
  );
};

export default ModalPortal;
