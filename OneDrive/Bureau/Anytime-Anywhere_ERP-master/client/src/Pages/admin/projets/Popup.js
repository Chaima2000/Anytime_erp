import React from 'react';
import { Dialog, DialogTitle , DialogContent } from "@material-ui/core";


function Popup(props) {
    const { title , children , isOpen , setIsOpen} = props;
  return (
    <Dialog open={isOpen}>
    <DialogTitle>
        title
    </DialogTitle>
    <DialogContent>
        {children}
    </DialogContent>
    </Dialog>
  )
}

export default Popup