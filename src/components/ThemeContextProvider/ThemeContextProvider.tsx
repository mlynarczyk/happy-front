import type React from "react";

export const ThemeContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return <div>{children}</div>;
};
