import React, { Component } from 'react';
import shortid from 'shortid';

import './App.css';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Section from './components/Section';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [
       { "id": "id-1", "name": "Rosie Simpson", "number": "459-12-56" },
    { "id": "id-2", "name": "Hermione Kline", "number": "443-89-12" },
    { "id": "id-3", "name": "Eden Clements", "number": "645-17-79" },
    { "id": "id-4", "name": "Annie Copeland", "number": "227-91-26" }
    ],
    filter: '',
  };

  componentDidMount() {

    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }

  }

  componentDidUpdate(prevState) {

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }



  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const equalName = this.state.contacts.find(
      item => item.name === contact.name,
    );

    if (equalName) return alert(`${contact.name} is already in contacts`);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <>
        <Section>
          <h1 className="title">Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.onFilterChange} />
          {contacts.length ? (
            <ContactsList
              contacts={this.getFilteredContacts()}
              onDeleteContact={this.onDeleteContact}
            />
          ) : null}
        </Section>
      </>
    );
  }
}

export default App;
