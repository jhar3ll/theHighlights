import { Library } from "../../lib/library";
const { Alert, Snackbar } = Library;

export type AlertMessageProps = {
    duration: number,
    message: string,
    open?: boolean,
    setShowAlert?: (alert: AlertMessageProps) => void,
    severity: "error" | "warning" | "info" | "success" 
};

const AlertMessage = ({ duration, message, open, setShowAlert, severity }: AlertMessageProps) => {
    function handleClose(){
        setShowAlert && setShowAlert({message: "", duration: 0, severity: "success", open: false});
    }

    return (
        <div className='errorContainer'>
            <Snackbar  open={open}
                anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
                autoHideDuration={duration} onClose={handleClose}
            >
                <Alert severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertMessage;