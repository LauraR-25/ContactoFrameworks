export default function ContactCardDetailed({ contact, onSelect, onEdit, onDelete }) {
  return (
    <div className="contact-card contact-card--detailed" onClick={onSelect} role="button" tabIndex={0}>
      <div style={{ display: "flex", gap: "10px" }}>
        <img src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} />
        <div>
          <div className="contact-card__title">
            {contact.firstName} {contact.lastName}
          </div>
          <p>{contact.number}</p>
          <p>{contact.nicknames || "-"}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
        <button className="btn" type="button" onClick={(event) => { event.stopPropagation(); onEdit(); }}>
          Editar
        </button>
        <button className="btn" type="button" onClick={(event) => { event.stopPropagation(); onDelete(); }}>
          Borrar
        </button>
      </div>
    </div>
  );
}
