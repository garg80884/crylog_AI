export interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  emotions: string[];
  timestamp: Date;
  aiResponse: string;
}

const STORAGE_KEY = 'crylog_journal_entries';

export const saveEntriesToStorage = (entries: JournalEntry[]): void => {
  try {
    const serializedEntries = JSON.stringify(entries, (key, value) => {
      // Convert Date objects to ISO strings for storage
      if (key === 'timestamp' && value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEY, serializedEntries);
  } catch (error) {
    console.error('Error saving entries to storage:', error);
  }
};

export const loadEntriesFromStorage = (): JournalEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    // Convert ISO strings back to Date objects
    return parsed.map((entry: any) => ({
      ...entry,
      timestamp: new Date(entry.timestamp)
    }));
  } catch (error) {
    console.error('Error loading entries from storage:', error);
    return [];
  }
};

export const deleteEntryFromStorage = (entryId: string): void => {
  try {
    const entries = loadEntriesFromStorage();
    const filteredEntries = entries.filter(entry => entry.id !== entryId);
    saveEntriesToStorage(filteredEntries);
  } catch (error) {
    console.error('Error deleting entry from storage:', error);
  }
};

export const clearAllEntries = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing entries:', error);
  }
};