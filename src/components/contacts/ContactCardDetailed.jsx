import React from 'react';
// 1. Importación corregida que incluye 'keyframes'
import styled, { keyframes } from 'styled-components';

// 2. Definición encapsulada de la animación de balanceo y flotación
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export default function ContactCardDetailed({ contact, onSelect, onEdit, onDelete, cardRole = "primary", bgType = "gold" }) {
  if (!contact) return null;

  // Foto de respaldo si no hay o falla la carga
  const defaultAvatar = "https://images.placeholders.dev/?width=150&height=150&text=👤&theme=mono";
  const fotoUrl = contact.photo || defaultAvatar;

  const backgroundGradients = {
    gold: "radial-gradient(circle, rgba(252, 240, 142, 1) 0%, rgba(246, 173, 32, 1) 50%, rgba(192, 142, 8, 1) 100%)",
    blue: "radial-gradient(circle, rgba(142, 249, 252, 1) 0%, rgba(32, 164, 246, 1) 50%, rgba(8, 81, 192, 1) 100%)",
    purple: "radial-gradient(circle, rgba(222, 128, 233, 1) 0%, rgba(213, 32, 246, 1) 50%, rgba(139, 6, 157, 1) 100%)"
  };

  const currentBg = backgroundGradients[bgType] || backgroundGradients.gold;

  return (
    <StyledCard style={{ '--card-bg': currentBg }} className={`card-inner-box ${cardRole}`}>
      <div className="content-shield">
        <span className="bg-letter">
          {contact.firstName ? contact.firstName[0].toUpperCase() : '👤'}
        </span>

        <div className="info-layout" onClick={onSelect} role="button" tabIndex={0}>
          <img 
            className="avatar" 
            src={fotoUrl} 
            alt={contact.firstName} 
            onError={(e) => { e.target.src = defaultAvatar; }} 
          />
          
          <div className="text-fields">
            <h3 className="fullname">{contact.firstName} {contact.lastName}</h3>
            <div className="extra-details">
              <p className="phone-row">📞 {contact.number}</p>
              {contact.nicknames && <p className="nickname-badge">✨ {contact.nicknames}</p>}
            </div>
          </div>
          
          <div className="action-row">
            <button className="action-btn edit-trigger" type="button" onClick={(e) => { e.stopPropagation(); onEdit(); }}>✏️</button>
            <button className="action-btn delete-trigger" type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>🗑️</button>
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: var(--card-bg);
  padding: 4px;
  box-sizing: border-box;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  /* Transición suave para el estado Hover */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;

  /* Efectos dinámicos al pasar el cursor (Hover) */
  &:hover {
    transform: translateY(-8px) scale(1.02); /* Eleva la tarjeta ligeramente */
    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.3); /* Sombra más profunda */

    .avatar {
      transform: scale(1.1) rotate(4deg); /* Agranda y rota la foto sutilmente */
      border-color: rgba(255, 255, 255, 1);
    }

    .bg-letter {
      /* Mantiene el centrado original pero añade pulso y rotación */
      transform: translate(-50%, -50%) scale(1.08) rotate(-5deg);
      opacity: 0.35;
    }
  }

  .content-shield {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    
    /* 3. Asigna la animación constante usando la constante floatAnimation */
    animation: ${floatAnimation} 6s ease-in-out infinite;
  }

  .bg-letter {
    font-size: 200px;
    font-weight: 900;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.3);
    opacity: 0.2;
    z-index: 1;
    pointer-events: none;
    font-family: system-ui, sans-serif;
    
    /* Transición para que herede el efecto hover de la tarjeta */
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  .info-layout {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.7);
    background-color: #f3f4f6;
    transition: all 0.4s ease;
  }

  .text-fields {
    margin: auto 0;
    text-align: center;
    width: 100%;
  }

  .fullname {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .extra-details {
    transition: all 0.4s ease;
    max-height: 100px;
    opacity: 1;
    overflow: hidden;
  }

  .phone-row { font-size: 0.85rem; margin: 0; opacity: 0.95; }

  .nickname-badge {
    font-size: 0.75rem;
    margin: 6px 0 0 0;
    background: rgba(255, 255, 255, 0.25);
    padding: 2px 10px;
    border-radius: 20px;
    display: inline-block;
  }

  .action-row {
    display: flex;
    gap: 12px;
    margin-top: auto;
    transition: all 0.4s ease;
    opacity: 1;
    transform: translateY(0);
  }

  .action-btn {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn:hover { background: #ffffff; transform: scale(1.1); }

  &.secondary .avatar { width: 60px; height: 60px; opacity: 0.8; }
  &.secondary .info-layout { justify-content: center; }
  &.secondary .extra-details, &.secondary .action-row { 
    max-height: 0; opacity: 0; margin: 0; pointer-events: none; transform: translateY(10px); 
  }
`;