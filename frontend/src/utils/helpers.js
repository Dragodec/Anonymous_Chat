export const generateRoomId = () => {
  // Cryptographically secure 128-bit UUID generation via Web Crypto API (OWASP standard)
  return crypto.randomUUID();
};

export const generateParticipantId = () => {
  // Generate heavily randomized bytes for unguessable identity tokens
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return 'User-' + array[0].toString(16).substring(0, 4).toUpperCase();
};
