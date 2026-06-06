export default function ContactDetailModal({ contact, onClose, onEdit, onDelete }) {
  if (!contact) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
          <div className="modal__actions">
            <button className="btn" type="button" onClick={() => onEdit(contact)}>
              Editar
            </button>
            <button className="btn" type="button" onClick={() => onDelete(contact.id)}>
              Borrar
            </button>
            <button className="btn" type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
        <div className="modal__content">
          <img src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} />
          <div>
            <p>
              <strong>Numero:</strong> {contact.number}
            </p>
            <p>
              <strong>Apodos:</strong> {contact.nicknames || "-"}
            </p>
            <p>
              <strong>Notas:</strong> {contact.notes || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
