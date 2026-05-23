export default function ContactCardGallery({ contact, onSelect, onEdit, onDelete }) {
  return (
    <div className="contact-card contact-card--gallery" onClick={onSelect} role="button" tabIndex={0}>
      <img
        src={contact.photo}
        alt={`${contact.firstName} ${contact.lastName}`}
        style={{ width: "100%", height: "100px", borderRadius: "8px", objectFit: "cover" }}
      />
      <div className="contact-card__title">
        {contact.firstName} {contact.lastName}
      </div>
      <p>{contact.number}</p>
      <div style={{ display: "flex", gap: "6px" }}>
        <button
          className="btn"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
        >
          Editar
        </button>
        <button
          className="btn"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}
