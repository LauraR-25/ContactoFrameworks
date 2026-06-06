import React from 'react';
import styled from 'styled-components';

const truncate = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ContactCardMinimal({ contacts, onSelect, onEdit, onDelete }) {
  if (!contacts || contacts.length === 0) return null;

  const colors = [
    '142, 249, 252', '142, 252, 204', '142, 252, 157', 
    '215, 252, 142', '252, 252, 142', '252, 208, 142', 
    '252, 142, 142', '252, 142, 239', '204, 142, 252', '142, 202, 252'
  ];

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{ '--quantity': contacts.length }}>
          {contacts.map((contact, index) => (
            <div 
              key={contact.id} 
              className="card" 
              style={{ 
                '--index': index, 
                '--color-card': colors[index % colors.length] 
              }}
              onClick={() => onSelect(contact)}
            >
              {/* Aquí está el cambio: Usamos <img> en lugar de div para poder usar onError */}
              <img 
                className="img" 
                src={contact.photo || "https://via.placeholder.com/150"} 
                alt={contact.firstName}
                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
              />
              
              <div className="card-info">
                <p className="card-title">{contact.firstName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper {
    width: 100%;
    height: 400px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .inner {
    --w: 120px;
    --h: 160px;
    --translateZ: 250px;
    --rotateX: -10deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 25%;
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from { transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0); }
    to { transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn); }
  }

  .card {
    position: absolute;
    border: 2px solid rgba(var(--color-card), 0.8);
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    cursor: pointer;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
  }

  /* Estilo ajustado para la etiqueta <img> */
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Esto asegura que la foto se vea bien */
    display: block;
    background: radial-gradient(
        circle,
        rgba(var(--color-card), 0.2) 0%,
        rgba(var(--color-card), 0.6) 80%,
        rgba(var(--color-card), 0.9) 100%
      );
  }

  .card-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background: rgba(0,0,0,0.6);
    color: white;
    font-size: 12px;
  }
`;