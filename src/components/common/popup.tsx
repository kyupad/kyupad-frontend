import React, { memo } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from './dialog';

function Popup({
  visible,
  setVisible,
  id,
  description,
}: {
  visible?: boolean;
  setVisible: any;
  id?: string;
  description?: string;
}) {
  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[425px] outline-0" id={id}>
        <DialogHeader>
          <DialogDescription>{description || ''}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default memo(Popup);
