import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form2 from './Form2';

export function ModalForVC(props) {
  const { isOpen, toggle, oneInfo, selectedCode } = props;
  const { className } = props;

  const [filteredData, filterData] = useState('');

  useEffect(() => {
    filterData(oneInfo(selectedCode));
  }, [oneInfo, selectedCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //수정모드? 복사모드?
    props.postData(filteredData, props.mode);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={className}
      backdrop={'static'}
      keyboard={false}
    >
      <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
      <ModalBody>
        <Form2
          {...props}
          handleSubmit={handleSubmit}
          fD={filteredData}
          mode={props.mode}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="warning" type="submit" form="nm-board">
          {props.btnText}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalForVC;
