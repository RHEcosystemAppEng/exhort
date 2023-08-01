import React from "react";
import { ClipboardCopy } from "@patternfly/react-core";
export const Command = ({ children }) => (
  <ClipboardCopy hoverTip="Copy" clickTip="Copied" isCode variant="expansion">
    {children}
  </ClipboardCopy>
);
