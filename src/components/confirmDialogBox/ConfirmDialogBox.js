  
import React, {useState} from 'react';
import './confirmDialogBoxStyle.css';

const ConfirmDialogBox = (props) => { 
    const { confirm, tabToBeDelete } = props;
    const [isVisible, setIsVisible ] = useState(true);

    const dialogClose = () =>{
        confirm && confirm(false)
        // setIsVisible(false)
    }

    const confirmClick = () => {
        confirm && confirm(true)
        // setIsVisible(false)
    }

    return (
        <div className={`popup ${isVisible&&'isVisible'}`} role="alert">
        <div className="popupContainer">
            <p>{`Are you sure you want to delete ${tabToBeDelete.label}?`}</p>
            <div className="buttons">
                <div className="dangerButton" onClick={confirmClick}>Yes</div>
                <div className="primaryButton" onClick={dialogClose}>No</div>
            </div>
            <div className="popupClose" onClick={dialogClose} />
        </div> 
        </div> 
    )
};

export default ConfirmDialogBox