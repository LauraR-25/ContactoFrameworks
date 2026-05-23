export default function ContactCardMinimal({ contact, onSelect, onEdit, onDelete }) {
  return (
    <div className="contact-card contact-card--minimal" onClick={onSelect} role="button" tabIndex={0}>
      <div className="contact-card__title">
        {contact.firstName} {contact.lastName}
      </div>
      <p>{contact.number}</p>
      <div style={{ display: "flex", gap: "6px" }}>
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
