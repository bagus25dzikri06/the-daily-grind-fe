import Button from "@/app/(landing)/components/ui/button";
import Modal from "./modal";

type TLogoutModalProps ={
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal = ({isOpen, onClose, onConfirm} : TLogoutModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Log Out">
            <p>Are you sure you want to log out?</p>
            <div className="flex gap-5 mt-5">
                <Button variant="ghost" className="w-full rounded-md" onClick={onClose}>Cancel</Button>
                <Button className="w-full rounded-md" onClick={onConfirm}>Yes</Button>
            </div>
        </Modal>
    )
}

export default LogoutModal