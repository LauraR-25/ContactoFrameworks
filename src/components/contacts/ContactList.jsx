import { useState } from "react";
import styled from "styled-components";
import ContactCardDetailed from "./ContactCardDetailed.jsx";
import ContactCardGallery from "./ContactCardGallery.jsx";
import ContactCardCompact from "./ContactCardCompact.jsx";
import ContactCardMinimal from "./ContactCardMinimal.jsx";

const viewMap = {
  list: ContactCardDetailed,
  grid: ContactCardGallery,
  compact: ContactCardCompact,
  matrix: ContactCardMinimal
};

export default function ContactList({ contacts, viewMode, onSelect, onEdit, onDelete }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const CardComponent = viewMap[viewMode] || ContactCardCompact;

  if (!contacts.length) return <p>No hay contactos registrados</p>;

  // Caso Especial: Matrix
  if (viewMode === 'matrix') {
    return <ContactCardMinimal contacts={contacts} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} />;
  }

  // Carrusel Plano Estilo Deck (Vista 'list')
  if (viewMode === 'list') {
    const total = contacts.length;
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
    const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);

    const getOffset = (index) => {
      let diff = index - activeIndex;
      if (diff > Math.floor(total / 2)) diff -= total;
      if (diff < -Math.floor(total / 2)) diff += total;
      return diff;
    };

    return (
      <CarouselContainer>
        <div className="carousel-wrapper">
          <button className="nav-btn prev-btn" onClick={handlePrev} type="button">✦ ←</button>

          <div className="wrap_carousel_3d">
            {contacts.map((contact, index) => {
              const offset = getOffset(index);
              let positionClass = "position-hidden";
              if (offset === 0) positionClass = "position-center";
              else if (offset === 1) positionClass = "position-right";
              else if (offset === -1) positionClass = "position-left";

              const colors = ["gold", "blue", "purple"];
              const myColor = colors[index % colors.length];

              return (
                <div key={contact.id} className={`card-slot ${positionClass}`}>
                  <ContactCardDetailed 
                    contact={contact} 
                    cardRole={offset === 0 ? "primary" : "secondary"}
                    bgType={myColor}
                    onSelect={() => {
                      if (offset === 1) handleNext();
                      else if (offset === -1) handlePrev();
                      else if (offset === 0) onSelect(contact);
                    }}
                    onEdit={() => offset === 0 && onEdit(contact)}
                    onDelete={() => offset === 0 && onDelete(contact.id)}
                  />
                </div>
              );
            })}
          </div>

          <button className="nav-btn next-btn" onClick={handleNext} type="button">→ ✦</button>
        </div>
      </CarouselContainer>
    );
  }

  // Otras Vistas (Grid, Compact)
  return (
    <div className={`contact-list contact-list--${viewMode}`}>
      {contacts.map((contact) => (
        <CardComponent
          key={contact.id}
          contact={contact}
          onSelect={() => onSelect(contact)}
          onEdit={() => onEdit(contact)}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </div>
  );
}

const CarouselContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  width: 100%; 
  margin: 20px auto;

  .carousel-wrapper { 
    display: flex; 
    align-items: center; 
    gap: 20px; 
    width: 100%; 
    max-width: 900px; 
    justify-content: center; 
    position: relative; 
  }
  
  .wrap_carousel_3d { 
    position: relative; 
    width: 550px; 
    height: 360px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
  }

  /* Línea/Ranura estética del fondo del video */
  .wrap_carousel_3d::after {
    content: '';
    position: absolute;
    bottom: 12px;
    left: 10%;
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #333333, transparent);
    z-index: 4;
  }

  /* Estilo de la Tarjeta Base Alineada Abajo */
  .card-slot {
    position: absolute;
    bottom: 20px; /* Ancladas desde abajo para el efecto bolsillo/ranura */
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, z-index 0.5s step-end;
    will-change: transform, opacity;
    width: 220px; 
    height: 300px; 
    transform-origin: bottom center; /* La escala se calcula desde la base */
  }

  /* Tarjeta Activa (Centro): Al frente, escala real (1) y sutil elevación */
  .position-center { 
    z-index: 3; 
    transform: translate3d(0, -15px, 0) scale(1); 
    opacity: 1; 
  }
  
  /* Tarjeta Izquierda: Desplazada horizontalmente, más pequeña (0.85) y al ras de la base */
  .position-left { 
    z-index: 2; 
    transform: translate3d(-140px, 0, 0) scale(0.85); 
    opacity: 0.85; 
    cursor: pointer; 
  }
  
  /* Tarjeta Derecha: Desplazada horizontalmente, más pequeña (0.85) y al ras de la base */
  .position-right { 
    z-index: 2; 
    transform: translate3d(140px, 0, 0) scale(0.85); 
    opacity: 0.85; 
    cursor: pointer; 
  }
  
  /* Tarjetas en espera (Ocultas perfectamente detrás) */
  .position-hidden { 
    z-index: 1; 
    transform: translate3d(0, 0, 0) scale(0.7); 
    opacity: 0; 
    pointer-events: none; 
  }

  .nav-btn { 
    background: #111111; 
    color: #ffffff;
    border: 1px solid #333333; 
    padding: 10px 16px; 
    border-radius: 50px; 
    cursor: pointer; 
    z-index: 10; 
    transition: all 0.2s ease; 
  }
  
  .nav-btn:hover { 
    background: #222222; 
    transform: scale(1.05); 
  }
`;