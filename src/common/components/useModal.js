import { useState } from 'react';

function useModal(show) {
  const [showModal, setShowModal] = useState(show);
  const onShow = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };
  return {
    show: showModal, onShow, onClose,
  };
}

export default useModal;
