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

  // Carrusel 3D (Vista 'list')
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
  display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin: 20px auto;

  .carousel-wrapper { display: flex; align-items: center; gap: 10px; width: 100%; max-width: 900px; justify-content: center; position: relative; }
  .wrap_carousel_3d { position: relative; width: 550px; height: 380px; display: flex; align-items: center; justify-content: center; perspective: 1000px; }

  /* Animación Suave Optimizada */
  .card-slot {
    position: absolute;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity; /* <--- IMPORTANTE: Esto elimina los saltos */
    width: 220px; height: 300px; transform-origin: center center;
  }

  .position-center { z-index: 3; transform: translate3d(0, 0, 0) rotateY(0deg) scale(1); opacity: 1; }
  .position-left { z-index: 1; transform: translate3d(-140px, 15px, -100px) rotate(-12deg) scale(0.85); opacity: 0.9; cursor: pointer; }
  .position-right { z-index: 1; transform: translate3d(140px, 15px, -100px) rotate(12deg) scale(0.85); opacity: 0.9; cursor: pointer; }
  .position-hidden { z-index: 0; transform: translate3d(0, 0, -200px) scale(0.5); opacity: 0; pointer-events: none; }

  .nav-btn { background: #ffffff; border: 1px solid #e5e7eb; padding: 10px 16px; border-radius: 50px; cursor: pointer; z-index: 10; transition: all 0.2s ease; }
  .nav-btn:hover { background: #f9fafb; transform: scale(1.05); }
`;