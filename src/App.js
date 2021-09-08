import  { useState } from 'react';
import shortid from 'shortid';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Section from './components/Section';
import Filter from './components/Filter';
import useLocalStorage from 'hooks/useLocalStorage';

function App() {
  // state = {
  //   contacts: [
  //      { "id": "id-1", "name": "Rosie Simpson", "number": "459-12-56" },
  //   { "id": "id-2", "name": "Hermione Kline", "number": "443-89-12" },
  //   { "id": "id-3", "name": "Eden Clements", "number": "645-17-79" },
  //   { "id": "id-4", "name": "Annie Copeland", "number": "227-91-26" }
  //   ],
  //   filter: '',
  // };
const [contacts, setContacts] = useLocalStorage('contacts', [])
//   const [contacts, setContacts] = useState(() => {
//    return JSON.parse(window.localStorage.getItem('contacts')) ?? []
// });
  const [filter, setFilter] = useState('');

  // componentDidMount() {

  //   const localContacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(localContacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }

  // }

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts))
  // }, [contacts])

  // componentDidUpdate(prevState) {

  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (nextContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }



  const addContact = ({ name, number}) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.find(item => item.name === contact.name)) {

      return toast.warn(`${contact.name} is already in contacts`);
      //alert(`${contact.name} is already in contacts`);
   };
   
    setContacts(prevContacts => [...prevContacts, contact]); 
  }

  const onDeleteContact = id => {
    setContacts( contacts.filter(contact => contact.id !== id));
  };

  const onFilterChange = e => {
 setFilter(e.currentTarget.value)
  };

  const getFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };


    return (
      <>
        <Section>
          <h1 className="title">Phonebook</h1>
          <ContactForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={onFilterChange} />
          {contacts.length ? (
            <ContactsList
              contacts={ getFilteredContacts()}
              onDeleteContact={onDeleteContact}
            />
          ) : null}
        </Section>
         <ToastContainer />
      </>
    );
  
}

export default App;
