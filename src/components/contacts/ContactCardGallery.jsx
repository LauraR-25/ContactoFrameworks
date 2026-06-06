import React from 'react';
import styled from 'styled-components';

export default function ContactCardGallery({ contact, onSelect, onEdit, onDelete }) {
  if (!contact) return null;

  // URL del placeholder por si falla o si no hay foto
  const placeholderUrl = "https://images.placeholders.dev/?width=150&height=150&text=👤&theme=mono";

  return (
    <StyledWrapper>
      <div 
        className="card" 
        onClick={onSelect}
        role="button"
        tabIndex={0}
        title={`Contacto: ${contact.firstName} ${contact.lastName}\nNúmero: ${contact.number}\nNotas: ${contact.notes || '-'}`}
      >
        {/* Aquí aplicamos el onError */}
        <img 
          src={contact.photo || placeholderUrl} 
          alt={contact.firstName} 
          className="card__avatar" 
          onError={(e) => {
            e.target.src = placeholderUrl;
          }}
        />
        
        <div className="card__content">
          <p className="card__title">{contact.firstName} {contact.lastName}</p>
          <p className="card__description">📞 {contact.number}</p>
          
          {contact.notes && <p className="card__notes">📝 {contact.notes}</p>}
          
          <div className="card__actions">
            <button 
              className="btn btn-edit" 
              type="button" 
              onClick={(e) => { 
                e.stopPropagation(); 
                onEdit(); 
              }}
            >
              ✏️ Editar
            </button>
            <button 
              className="btn btn-delete" 
              type="button" 
              onClick={(e) => { 
                e.stopPropagation(); 
                onDelete(); 
              }}
            >
              🗑️ Borrar
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding: 12px;

  .card {
    position: relative;
    width: 300px;
    height: 200px;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .card__avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.3);
    background-color: #fff;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }

  .card:hover {
    transform: rotate(-5deg) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 100%;
    height: 100%;
    padding: 24px;
    box-sizing: border-box;
    background-color: #fff;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card:hover .card__content {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 1;
  }

  .card:hover .card__avatar {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }

  /* ... resto de tus estilos (card__title, card__actions, etc.) se mantienen igual ... */
  .card__title { margin: 0; font-size: 20px; color: #1f2937; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card__description { margin: 6px 0 0; font-size: 14px; color: #4b5563; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card__notes { margin: 4px 0 0; font-size: 13px; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card__actions { display: flex; gap: 10px; margin-top: auto; padding-top: 16px; }
  .btn { flex: 1; padding: 8px 0; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
  .btn-edit { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }
  .btn-edit:hover { background: #e5e7eb; }
  .btn-delete { background: #fee2e2; color: #ef4444; border: 1px solid #fecaca; }
  .btn-delete:hover { background: #fecaca; }
`;