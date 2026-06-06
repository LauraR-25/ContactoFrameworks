import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ContactsContext = createContext(null);

const PLACEHOLDER_PHOTO = "https://www.gravatar.com/avatar/?d=mp&s=200";

const STORAGE_KEY = "contacto_frameworks_contacts";

const loadContacts = () => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const createId = () => `c-${Math.random().toString(36).slice(2, 9)}`;

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() => loadContacts());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: createId(),
      photo: contact.photo?.trim() ? contact.photo : PLACEHOLDER_PHOTO
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const updateContact = (id, updates) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              ...updates,
              photo: updates.photo?.trim() ? updates.photo : PLACEHOLDER_PHOTO
            }
          : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
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
    throw new Error("useContacts debe usarse dentro de ContactsProvider");
  }
  return context;
}
