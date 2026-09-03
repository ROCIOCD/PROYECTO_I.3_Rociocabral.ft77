import { describe, it, expect } from 'vitest';
import { sanitizeInput, formatTimestamp } from '../src/utils.js';

describe('Pruebas unitarias de utilidades', () => {
  it('Debería limpiar espacios en blanco innecesarios', () => {
    const input = '   Hola Gemini   ';
    expect(sanitizeInput(input)).toBe('Hola Gemini');
  });

  it('Debería manejar entradas vacías o no válidas', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput(null)).toBe('');
  });

  it('Debería formatear correctamente la hora', () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    expect(formatTimestamp()).toMatch(timeRegex);
  });
});
it('Debería retornar string vacío si se pasa un número o booleano', () => {
  expect(sanitizeInput(12345)).toBe('');
  expect(sanitizeInput(true)).toBe('');
});