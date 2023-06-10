import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ContactName,
  ContactNumber,
  DeleteButton,
} from './ContactItem.styled';

const ContactItem = ({ id, name, number, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(id);
  };

  return (
    <ListItem>
      <ContactName>{name}</ContactName>
      <ContactNumber>{number}</ContactNumber>
      <DeleteButton onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Видалити'}
      </DeleteButton>
    </ListItem>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
