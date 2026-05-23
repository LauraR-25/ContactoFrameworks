import ContactCardCompact from "./ContactCardCompact.jsx";
import ContactCardDetailed from "./ContactCardDetailed.jsx";
import ContactCardMinimal from "./ContactCardMinimal.jsx";
import ContactCardGallery from "./ContactCardGallery.jsx";

const viewMap = {
  compact: ContactCardCompact,
  detailed: ContactCardDetailed,
  minimal: ContactCardMinimal,
  gallery: ContactCardGallery
};

export default function ContactList({ contacts, viewMode, onSelect, onEdit, onDelete }) {
  const CardComponent = viewMap[viewMode] || ContactCardCompact;

  if (!contacts.length) {
    return <p>No hay contactos registrados</p>;
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <CardComponent
          key={contact.id}
          contact={contact}
          onSelect={() => onSelect(contact)}
          onEdit={() => onEdit(contact)}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </div>
  );
}
