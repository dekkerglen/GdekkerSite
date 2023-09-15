import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AutocompleteInput from 'components/AutocompleteInput';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ChooseCardModal = ({ value, setValue, isOpen, toggle, title }) => {
  const [val, setVal] = useState(value);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xs">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <AutocompleteInput
          treeUrl="/tree"
          treePath="cardnames"
          type="text"
          className="me-2"
          name="remove"
          value={val}
          setValue={setVal}
          onSubmit={(event) => event.preventDefault()}
          placeholder="Card Name"
          autoComplete="off"
          data-lpignore
        />
      </ModalBody>
      <ModalFooter>
        <Button
          block
          type="submit"
          color="primary"
          onClick={() => {
            setValue(val);
            toggle();
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ChooseCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default ChooseCardModal;
