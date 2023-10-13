import React, { useEffect, FC } from "react";
import {
  ModalBlock,
  ModalContainer,
} from "./modalStyles";
import { useClickOutside } from '../../utils/hooks/useClickOutside';

interface ModalProps {
  show: boolean;
  children: React.ReactElement;
  onCloseButtonClick: (isShow: boolean) => void;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {

  const handleCloseButton = () => {
    props.onCloseButtonClick(false)
  }

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseButton()
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  });

  const ref = useClickOutside(() => {
    handleCloseButton()
  });

  if (!props.show) {
    return null;
  }

  return (
    <ModalBlock>
      <ModalContainer ref={ref}>
        {props.children}
      </ModalContainer>
    </ModalBlock>
  );
};
export { Modal };
