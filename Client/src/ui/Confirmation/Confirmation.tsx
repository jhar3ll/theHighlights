import "./Confirmation.css";
import React, { JSX } from 'react'
import { Library } from '../../lib/library';
const { Button, Dialog } = Library;

type ConfirmationType = {
    confirmFunction: () => void
    disableBackdropClose?: boolean
    disableEscapeClose?: boolean
    message: string|JSX.Element
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Confirmation = ({ confirmFunction, disableBackdropClose=false, disableEscapeClose=false, message, open, setOpen }: ConfirmationType) => {
    function handleClose(_event: {}, reason: "backdropClick" | "escapeKeyDown"){
        if (reason === "backdropClick" && !disableBackdropClose) setOpen(false);
    }

    return (
        <div className='confirmationMain'>
            <Dialog disableEscapeKeyDown={disableEscapeClose} onClose={handleClose} open={open}>
                <div className='confirmationBodyContainer'>
                    {typeof message === "string" ? <span>{message}</span> : message}
                    <div className="confirmationButtonsContainer">
                        <Button color='error' onClick={() => setOpen(false)} variant='contained' >No</Button>
                        <Button onClick={confirmFunction} variant='contained' >Yes</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Confirmation;