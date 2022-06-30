import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';

const MobilePopupContainerWrap = styled.div`

  .mobile-popup__main {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(1,1,1,.4);
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    z-index: 99;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transition: .3s ease;

    &.__show {
      visibility: visible;
      opacity: 1;

      .mobile-popup__inner {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .mobile-popup__inner {
      width: calc(100% - 40px);
      background: white;
      border-radius: 8px;
      margin-bottom: 20px;
      transform: translateY(30px);
      opacity: 0;
      transition: .4s ease;

      .mobile-popup__heading {
        padding: 16px 12px;
        border-bottom: 1px solid #DBDBDB;
        line-height: normal;
        font-size: 16px;
        color: #0F1729;
        font-weight: 600;
        display: flex;
        justify-content: space-between;

        .modal-close {
          width: 30px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
      }

      .mobile-popup__body {

      }
    }
  }
`

export default ({ show, children, title, onClose }) => {
  let [Modal, setModal] = useState(null);

  const ModalTemplate = () => {
    const _Modal = document.createElement('DIV');
    _Modal.className = 'mobile-popup';
    document.body.appendChild(_Modal);

    return _Modal;
  }

  useEffect(() => {
    let _Modal = ModalTemplate()
    document.body.appendChild(_Modal);

    setModal(_Modal);

    return () => {
      document.body.removeChild(_Modal);
    }
  }, []);

  const _onClose = (e) => {
    e.preventDefault();
    onClose();
  }

  return Modal && ReactDOM.createPortal(<MobilePopupContainerWrap>
      <div className={ ['mobile-popup__main', show ? '__show' : ''].join(' ') }>
        <div className="mobile-popup__inner">
          <div className="mobile-popup__heading">
            { title }
            <span className="modal-close" onClick={ _onClose }>
              <RiCloseFill />
            </span>
          </div>
          <div className="mobile-popup__body">
            { children }
          </div>
        </div>
      </div>
    </MobilePopupContainerWrap>, Modal);
}