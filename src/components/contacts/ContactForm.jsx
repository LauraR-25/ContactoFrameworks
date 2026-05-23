import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  number: "",
  photo: "",
  notes: "",
  nicknames: ""
};

export default function ContactForm({ onSave, editingContact, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingContact) {
      setForm({
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        number: editingContact.number,
        photo: editingContact.photo,
        notes: editingContact.notes,
        nicknames: editingContact.nicknames
      });
      setError("");
    } else {
      setForm(emptyForm);
      setError("");
    }
  }, [editingContact]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.number.trim()) {
      setError("Nombre, apellido y numero son obligatorios.");
      return;
    }

    onSave({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      number: form.number.trim(),
      photo: form.photo.trim(),
      notes: form.notes.trim(),
      nicknames: form.nicknames.trim()
    });
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="card contact-form">
      <h2>{editingContact ? "Editar contacto" : "Nuevo contacto"}</h2>
      {error ? <p style={{ color: "#b42318" }}>{error}</p> : null}
      <div className="form-field">
        <label>Nombre *</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Apellido *</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Numero *</label>
        <input name="number" value={form.number} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Foto (URL)</label>
        <input name="photo" value={form.photo} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Notas</label>
        <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Apodos</label>
        <input name="nicknames" value={form.nicknames} onChange={handleChange} />
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <button className="btn primary" type="submit">
          {editingContact ? "Guardar cambios" : "Crear"}
        </button>
        {editingContact ? (
          <button type="button" className="btn" onClick={onCancel}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
