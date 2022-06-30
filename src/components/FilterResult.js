import React, { Fragment, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './Board';
import { useWPBG_Context } from '../libs/context/WPBG_Context';

const FilterResultContainer = styled.div`
  position: relative;
`;

const FilterResultContainerInner = styled.div`
  padding: 0 48px;

  @media(max-width: 1278px) {
    padding: 0;
  }
`;

const DragToScrollContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 90;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 77.3%);

  .drag-to-scroll-container__inner {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;

    label {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export default () => {
  const { transformFilterScreen } = useWPBG_Context();
  const dragScroll = useRef(null);
  const [lock, setLock] = useState(true);

  useEffect(() => {

    dragScroll?.current?.addEventListener('mouseenter', e => {
      setLock(false);
    })

    dragScroll?.current?.addEventListener('touchstart', e => {
      setLock(false);
    })
  }, [transformFilterScreen]);
  
  return <FilterResultContainer> 
    {
      transformFilterScreen && 
      lock &&
      <DragToScrollContainer ref={ dragScroll }>
        <div className="drag-to-scroll-container__inner">
          <span className="__icon">
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9995 4.75445C14.8904 4.81742 14.635 5.01437 14.401 5.26619C13.7751 4.34996 12.5263 4.06076 11.5399 4.63027C11.0958 4.88663 10.7758 5.27612 10.6021 5.71796C9.94983 5.13704 9.04016 5.01267 8.26196 5.46197C7.74665 5.75948 7.40926 6.23397 7.28015 6.76536L4.25693 1.93991C3.60222 0.805919 2.30171 0.416766 1.23169 1.03454C0.161672 1.65232 -0.151563 2.97317 0.508046 4.11564L5.5953 12.5025C5.44599 12.7439 5.24041 13.1466 5.03814 13.7672C4.33877 15.9156 5.68982 19.3555 8.74707 20.8565C12.1503 22.5274 14.9653 22.4541 18.1595 20.6099C21.5438 18.656 21.7056 16.3215 21.5814 14.0976C21.462 11.9587 17.8104 5.61169 17.6551 5.34278C17.1659 4.49479 15.925 4.22007 14.9995 4.75445ZM20.6569 14.1568C20.7738 16.2505 20.6324 18.1214 17.7005 19.8141C14.7699 21.5061 12.2966 21.5685 9.16326 20.0296C7.33764 19.1332 5.16634 16.3558 5.91894 14.0433C6.0003 13.7937 6.08081 13.5885 6.15386 13.4229L7.81529 16.162C7.94716 16.3786 8.23483 16.448 8.45059 16.3142C8.66972 16.1814 8.7409 15.8981 8.60941 15.6808L1.3076 3.6427C0.902009 2.94019 1.05968 2.19465 1.69157 1.82983C2.32345 1.46501 3.04795 1.70123 3.46208 2.41791L8.0172 9.68875C8.14233 9.88878 8.40011 9.96024 8.6133 9.85483C8.82477 9.75078 8.92688 9.50123 8.84524 9.27999L8.35962 7.96917C8.35067 7.94499 8.33983 7.9219 8.32697 7.89962C7.97788 7.29497 8.14757 6.58881 8.72184 6.25725C9.36953 5.88331 9.98197 6.26272 10.277 6.77376L10.7364 7.56935C10.8631 7.78894 11.1461 7.86318 11.368 7.73508C11.5899 7.60698 11.6671 7.32479 11.5403 7.10521C11.2025 6.52018 11.4086 5.76686 11.9997 5.42556C12.5909 5.08426 13.3463 5.28246 13.6841 5.86749L14.6793 7.59128C14.8061 7.81087 15.0891 7.88511 15.3109 7.75701C15.5328 7.6289 15.61 7.34672 15.4832 7.12714L14.8983 6.11408C15.0144 5.94381 15.2701 5.65897 15.4593 5.54974C15.939 5.2728 16.6155 5.39742 16.8518 5.80662C17.8798 7.58785 20.5678 12.5605 20.6569 14.1568Z" fill="white"/>
            </svg>
          </span>
          <label>Drag to Scroll </label>
        </div>
      </DragToScrollContainer>
    }
    
    <FilterResultContainerInner>
      <Board />
    </FilterResultContainerInner>
  </FilterResultContainer>
}