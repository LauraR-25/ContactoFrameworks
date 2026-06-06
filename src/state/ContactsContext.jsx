import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx"; // Escuchamos el contexto de autenticación

const ContactsContext = createContext(null);

const PLACEHOLDER_PHOTO = "https://www.gravatar.com/avatar/?d=mp&s=200";

const createId = () => `c-${Math.random().toString(36).slice(2, 9)}`;

export function ContactsProvider({ children }) {
  const { user } = useAuth(); // Obtenemos el usuario logueado actual
  const [contacts, setContacts] = useState([]);

  // 1. ÚNICO EFFECT: Solo sirve para CARGAR los contactos cuando el usuario cambia o inicia sesión
  useEffect(() => {
    if (!user || !user.username) {
      setContacts([]); // Si no hay usuario, la lista se limpia por completo de inmediato
      return;
    }

    // Buscamos la clave única de este usuario específico
    const userStorageKey = `contacto_frameworks_contacts_${user.username}`;
    const raw = window.localStorage.getItem(userStorageKey);
    
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setContacts(Array.isArray(parsed) ? parsed : []);
      } catch {
        setContacts([]);
      }
    } else {
      setContacts([]); // Si es un usuario nuevo sin contactos, empezamos limpio
    }
  }, [user?.username]); // Este efecto SOLO se dispara si cambia el nombre de usuario

  // 2. FUNCIÓN AUXILIAR: Guarda de inmediato bajo el nombre del usuario activo
  const saveToStorage = (newContacts) => {
    if (user && user.username) {
      const userStorageKey = `contacto_frameworks_contacts_${user.username}`;
      window.localStorage.setItem(userStorageKey, JSON.stringify(newContacts));
    }
  };

  // 3. ACCIONES: Modifican el estado de React E INMEDIATAMENTE guardan en el localStorage correcto
  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: createId(),
      photo: contact.photo?.trim() ? contact.photo : PLACEHOLDER_PHOTO
    };
    setContacts((prev) => {
      const updated = [newContact, ...prev];
      saveToStorage(updated); // Guardado inmediato
      return updated;
    });
  };

  const updateContact = (id, updates) => {
    setContacts((prev) => {
      const updated = prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              ...updates,
              photo: updates.photo?.trim() ? updates.photo : PLACEHOLDER_PHOTO
            }
          : contact
      );
      saveToStorage(updated); // Guardado inmediato
      return updated;
    });
  };

  const deleteContact = (id) => {
    setContacts((prev) => {
      const updated = prev.filter((contact) => contact.id !== id);
      saveToStorage(updated); // Guardado inmediato
      return updated;
    });
  };

  const value = useMemo(
    () => ({ contacts, addContact, updateContact, deleteContact, placeholderPhoto: PLACEHOLDER_PHOTO }),
    [contacts]
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts debe usarse dentro de un ContactsProvider");
  }
  return context;
}