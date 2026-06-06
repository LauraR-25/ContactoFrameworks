import { useState, useEffect } from "react";

export default function ContactForm({ onSave, editingContact, onCancel }) {
  const blankForm = {
    firstName: "",
    lastName: "",
    number: "",
    photo: "",
    notes: "",
    nicknames: "" // Mapeado como Apodo
  };

  const [formData, setFormData] = useState(blankForm);

  // Sincroniza el formulario si el usuario presiona "Editar" en un contacto
  useEffect(() => {
    if (editingContact) {
      setFormData({
        firstName: editingContact.firstName || "",
        lastName: editingContact.lastName || "",
        number: editingContact.number || "",
        photo: editingContact.photo || "",
        notes: editingContact.notes || "",
        nicknames: editingContact.nicknames || ""
      });
    } else {
      setFormData(blankForm);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(blankForm); // Limpia los campos después de guardar
  };

  return (
    <form className="contact-form-container" onSubmit={handleSubmit}>
      <h3 className="contact-form-title">
        {editingContact ? "Editar Contacto" : "Nuevo Contacto"}
      </h3>

      <div className="form-field">
        <label>Nombre *</label>
        <input 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          maxLength={20} 
          required 
          placeholder="Máx. 20 caracteres"
        />
      </div>

      <div className="form-field">
        <label>Apellido *</label>
        <input 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          maxLength={20} 
          required 
          placeholder="Máx. 20 caracteres"
        />
      </div>

      <div className="form-field">
        <label>Número *</label>
        <input 
          name="number" 
          value={formData.number} 
          onChange={handleChange} 
          required 
          placeholder="Ej: +58412..."
        />
      </div>

      <div className="form-field">
        <label>URL (Foto)</label>
        <input 
          name="photo" 
          value={formData.photo} 
          onChange={handleChange} 
          placeholder="https://ejemplo.com/foto.jpg"
        />
      </div>

      <div className="form-field">
        <label>Apodo</label>
        <input 
          name="nicknames" 
          value={formData.nicknames} 
          onChange={handleChange} 
          maxLength={20} 
          placeholder="Máx. 20 caracteres"
        />
      </div>

      <div className="form-field">
        <label>Notas</label>
        <textarea 
          name="notes" 
          value={formData.notes} 
          onChange={handleChange} 
          rows="3" 
          maxLength={20} 
          placeholder="Descripción corta (Máx. 20)"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
          Guardar
        </button>
        {editingContact && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}