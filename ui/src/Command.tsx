import React, { PropsWithChildren } from 'react';
import { ClipboardCopy } from '@patternfly/react-core';
export const Command = (props: PropsWithChildren<any>) => (
  <ClipboardCopy hoverTip="Copy" clickTip="Copied" isCode variant="expansion">
    {props.children}
  </ClipboardCopy>
);
