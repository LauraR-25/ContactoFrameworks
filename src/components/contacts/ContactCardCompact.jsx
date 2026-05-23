export default function ContactCardCompact({ contact, onSelect, onEdit, onDelete }) {
  return (
    <div className="contact-card contact-card--compact" onClick={onSelect} role="button" tabIndex={0}>
      <img src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} />
      <div className="contact-card__title" title={`${contact.firstName} ${contact.lastName}`}>
        {contact.firstName} {contact.lastName}
      </div>
      <p className="contact-card__meta" title={contact.number}>
        {contact.number}
      </p>
      <div className="contact-card__actions">
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
