import React from 'react';

const truncate = (text, maxLength = 30) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ContactDetailModal({ contact, onClose, onEdit, onDelete }) {
  if (!contact) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '90vw', overflow: 'hidden' }}>
        <div className="modal__header">
          <h2 title={`${contact.firstName} ${contact.lastName}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {truncate(`${contact.firstName} ${contact.lastName}`, 30)}
          </h2>
          <div className="modal__actions">
            <button className="btn" onClick={() => onEdit(contact)}>Editar</button>
            <button className="btn" onClick={() => onDelete(contact.id)}>Borrar</button>
            <button className="btn" onClick={onClose}>Cerrar</button>
          </div>
        </div>
        
        <div className="modal__content" style={{ overflow: 'hidden' }}>
          <img src={contact.photo} alt={contact.firstName} style={{ maxWidth: '100%', height: 'auto' }} />
          <div>
            <p title={contact.number}><strong>Numero:</strong> {truncate(contact.number, 30)}</p>
            <p title={contact.nicknames}><strong>Apodos:</strong> {truncate(contact.nicknames || "-", 30)}</p>
            <p title={contact.notes}><strong>Notas:</strong> {truncate(contact.notes || "-", 50)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}