import React from 'react';
import styled from 'styled-components';

const truncate = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ContactCardCompact({ contact, onSelect, onEdit, onDelete }) {
  if (!contact) return null;

  const defaultAvatar = "https://images.placeholders.dev/?width=150&height=150&text=👤&theme=mono";
  const fotoUrl = contact.photo || defaultAvatar;
  const fullName = `${contact.firstName} ${contact.lastName}`;

  return (
    <StyledWrapper>
      <div 
        className="card" 
        onClick={onSelect}
        role="button"
        tabIndex={0}
        title={`${fullName}\nNúmero: ${contact.number}`}
      >
        <div className="avatar-wrapper">
          <img className="avatar" src={fotoUrl} alt={fullName} />
        </div>
        
        <div className="info-wrapper">
          <p className="heading" title={fullName}>{truncate(fullName, 20)}</p>
          <p className="subtitle" title={contact.number}>📞 {truncate(contact.number, 20)}</p>
        </div>

        <div className="card-actions">
          <button className="btn edit" type="button" onClick={(e) => { e.stopPropagation(); onEdit(); }}>✏️ Editar</button>
          <button className="btn delete" type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>🗑️ Borrar</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;

  .card {
    position: relative;
    width: 190px;
    height: 254px;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    z-index: 1;
  }

  /* El borde rotatorio de gradiente */
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 200px;
    height: 264px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* El brillo trasero difuminado */
  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
    transition: filter 0.3s ease;
  }

  .card:hover::after {
    filter: blur(30px);
  }

  .card:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }

  /* --- Estilos internos de la información --- */
  
  .avatar-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .avatar {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.8);
    background-color: #222;
  }

  .info-wrapper {
    text-align: center;
    width: 100%;
    min-width: 0; 
  }

  .heading {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 6px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Corta el texto con ... si es muy largo */
  }

  .subtitle {
    font-size: 13px;
    color: #40c9ff; /* Toma el color cian del gradiente para combinar */
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: auto;
  }

  .btn {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 8px 0;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;