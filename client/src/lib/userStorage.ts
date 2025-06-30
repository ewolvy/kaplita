// Simple user identification using localStorage
export function getUserId(): string {
  const storageKey = 'kaplita-user-id';
  
  // Check if user already has an ID
  let userId = localStorage.getItem(storageKey);
  
  if (!userId) {
    // Generate a unique ID for new users
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, userId);
  }
  
  return userId;
}

export function getUserDisplayName(): string {
  const storageKey = 'kaplita-user-name';
  
  let userName = localStorage.getItem(storageKey);
  
  if (!userName) {
    // Generate a friendly display name in Spanish
    const adjectives = ['Feliz', 'Saludable', 'Hidratado', 'Fresco', 'Claro', 'Puro', 'Brillante', 'Activo'];
    const nouns = ['Bebedor', 'Hidratador', 'Guerrero', 'Campeón', 'Amigo', 'Estrella', 'Maestro', 'Héroe'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    userName = `${adjective} ${noun}`;
    localStorage.setItem(storageKey, userName);
  }
  
  return userName;
}

export function setUserDisplayName(name: string): void {
  const storageKey = 'kaplita-user-name';
  localStorage.setItem(storageKey, name);
}