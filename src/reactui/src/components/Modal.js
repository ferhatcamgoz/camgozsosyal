import React from 'react';
import {useTranslation} from "react-i18next";
import Buttonproges from "./buttonproges";

const Modal = ({visible,setVisiable,onClickOk,data,pendingApiCall}) => {
    let className="modal fade";
    if(visible) className+= " show d-block";
    const {t}=useTranslation();
    return (

        <div className={className} style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" >{t("Delete Message")}</h5>
                    </div>
                    <div class="modal-body">
                        {data&&data.content+ t("Are your sure to delete message?")}
                    </div>
                    <div class="modal-footer">
                        <button  disabled={pendingApiCall} type="button" class="btn btn-light" onClick={()=>setVisiable(false)}>{t("Cancel")}</button>

                        <Buttonproges
                            onClick={()=>onClickOk(data.id)}
                            disabled={ pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t("Delete")}
                            className={"btn btn-danger"}
                        />

                        </div>
                </div>
            </div>
        </div>
            );
};

export default Modal;