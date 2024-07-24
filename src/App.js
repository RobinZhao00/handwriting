import React from 'react';
import './App.scss';
// import Tree from '../src/common/application/tree';
// import Upload from '../src/common/application/upload/upload';
// import Draw from './common/canvas/day01/draw';
import Modal from './common/components/Modal';
import useModal from './common/components/useModal';
// import Upload from './Upload';
// import Counter from './Counter';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
  const { show, onClose, onShow } = useModal(false);
  // const [data, setData] = useState({ test: 1 })
  // const files = [
  //   {
  //     name: '',
  //     uid: '-1',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   }
  // ];
  const handleClick = () => {
    // setData({ ...data, test: 2 });
    alert('okk')
  }
  // const handleEnd = () => {
  //   console.log('计时结束')
  // }


  return (// <div className="app-container" onClick={handleClick}>
    //   {/*<Upload*/}
    //   {/*  src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}*/}
    //   {/*  files={files}*/}
    //   {/*/>*/}
    //   {/*<Draw />*/}
    //   <Demo />
    //   {/*<Upload />*/}
    //   {/*<Counter count={60} onEnd={handleEnd}>*/}
    //   {/*  <div className="text">0000</div>*/}
    //   {/*</Counter>*/}
    // </div>
    <div className="app-container" onClick={handleClick}>
      <button onClick={onShow}>显示</button>
      <Modal
        show={show}
        onClose={onClose}
        onShow={onShow}
        footer={<div className="modal-footer">
          <div className="btn" onClick={onClose}>我知道了</div>
        </div>}
      >
      </Modal>
    </div>);
};

export default App;
