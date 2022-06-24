import { useWPBG_Context } from '../libs/context/WPBG_Context';
import styled from 'styled-components';

const BoardContainer = styled.div`
  .board__inner {
    display: flex;

    .board__item {
      width: calc(100% / ${ props => props.boarsItem ? props.boarsItem : 0 });
      min-height: 500px;
      
      &:not(:last-child) {
        border-right: 1px dashed #D8D8D8;
      }
    }
  }
`;

export default () => {
  const { board } = useWPBG_Context();

  return <BoardContainer boarsItem={ board.length }>
    <div class="board__inner">
    {
      board.length > 0 &&
      board.map((item, _index) => {
        return <div className="board__item" key={ _index }>
          
        </div>
      })
    }
    </div>
  </BoardContainer>
}