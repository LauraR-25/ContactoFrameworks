import { useState } from "react";
import { useContacts } from "../state/ContactsContext.jsx";
import ContactForm from "../components/contacts/ContactForm.jsx";
import ContactList from "../components/contacts/ContactList.jsx";
import ContactDetailModal from "../components/contacts/ContactDetailModal.jsx";

const viewModes = [
  { value: "list", label: "Lista clasica" },
  { value: "grid", label: "Tarjeta / Grid" },
  { value: "compact", label: "Tarjeta compacta" },
  { value: "matrix", label: "Matriz avanzada" }
];

export default function ContactsPage() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [viewMode, setViewMode] = useState(viewModes[0].value);

  const handleSave = (data) => {
    if (editingContact) {
      updateContact(editingContact.id, data);
      setEditingContact(null);
      return;
    }
    addContact(data);
  };

  return (
    <div className="layout-grid">
      <ContactForm
        onSave={handleSave}
        editingContact={editingContact}
        onCancel={() => setEditingContact(null)}
      />
      <section>
        <div className="view-selector">
          <label>Vista:</label>
          <select value={viewMode} onChange={(event) => setViewMode(event.target.value)}>
            {viewModes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
        <ContactList
          contacts={contacts}
          viewMode={viewMode}
          onSelect={(contact) => setSelectedContact(contact)}
          onEdit={(contact) => setEditingContact(contact)}
          onDelete={deleteContact}
        />
      </section>
      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onEdit={(contact) => {
          setEditingContact(contact);
          setSelectedContact(null);
        }}
        onDelete={(contactId) => {
          deleteContact(contactId);
          setSelectedContact(null);
        }}
      />
    </div>
  );
}
