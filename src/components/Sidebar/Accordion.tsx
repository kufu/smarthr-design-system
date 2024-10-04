import type { ReactNode } from 'react';
import { AccordionPanel, AccordionPanelContent, AccordionPanelItem, AccordionPanelTrigger } from 'smarthr-ui';

// NOTE:
// AccordionPanelはJSで制御されており、アイランドにする必要があるので React コンポーネントに切り出しています

type Props = {
  title: string;
  children: ReactNode;
};

export default function Accordion({ title, children }: Props) {
  return (
    <AccordionPanel iconPosition="right">
      <AccordionPanelItem name="spSidebar">
        <AccordionPanelTrigger>{title}</AccordionPanelTrigger>
        <AccordionPanelContent>{children}</AccordionPanelContent>
      </AccordionPanelItem>
    </AccordionPanel>
  );
}
