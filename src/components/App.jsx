import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import initialContacts from '../components/storage.json';
import { Container, Title, FilterInput } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        contact.number.trim() === number.trim()
    );

    if (isDuplicate) {
      alert(`${name} or ${number} is already in contacts`);
    } else {
      const newContact = { id: nanoid(), name, number };
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />

      <h2>Contacts</h2>
      <FilterInput
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search contacts..."
      />

      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </Container>
  );
};

export default App;
