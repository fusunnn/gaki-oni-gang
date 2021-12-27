import { FC, useCallback, MouseEventHandler } from "react";
import { ButtonProps } from "@material-ui/core";

import { useWalletDialog } from "@solana/wallet-adapter-material-ui";

const WalletDialogButton: FC<ButtonProps> = ({
  children = "Select Wallet",

  onClick,
}) => {
  const { setOpen } = useWalletDialog();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setOpen(true);
    },
    [onClick, setOpen]
  );

  return (
    <button onClick={handleClick} className="link">
      {children}
    </button>
  );
};

export default WalletDialogButton;
