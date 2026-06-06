import { useState } from "react";
import { useContacts } from "../state/ContactsContext.jsx";
import ContactForm from "../components/contacts/ContactForm.jsx";
import ContactList from "../components/contacts/ContactList.jsx";
import ContactDetailModal from "../components/contacts/ContactDetailModal.jsx";

const viewModes = [
  { value: "list", label: "Lista clásica" },
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
    } else {
      addContact(data);
    }
  };

  return (
    <div className="layout-grid">
      {/* Lado Izquierdo: Formulario Fijo */}
      <div className="form-container">
        <ContactForm
          onSave={handleSave}
          editingContact={editingContact}
          onCancel={() => setEditingContact(null)}
        />
      </div>

      {/* Lado Derecho: Controles de vista y Listas */}
      <section style={{ width: "100%" }}>
        <div className="view-selector-wrapper">
          <div className="view-selector">
            <label>Vista:</label>
            <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
              {viewModes.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <ContactList
          contacts={contacts}
          viewMode={viewMode}
          onSelect={setSelectedContact}
          onEdit={setEditingContact}
          onDelete={deleteContact}
        />
      </section>

      {/* Modal de Detalle */}
      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onEdit={(contact) => {
          setEditingContact(contact);
          setSelectedContact(null);
        }}
        onDelete={(id) => {
          deleteContact(id);
          setSelectedContact(null);
        }}
      />
    </div>
  );
}