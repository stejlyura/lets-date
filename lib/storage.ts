import { Message } from './types';
import { PROFILES } from './data';

const STORAGE_KEYS = {
  MESSAGES_PREFIX: 'lets_date_msg_',
  MATCHES: 'lets_date_matches',
  SWIPES: 'lets_date_swipes',
  LATER: 'lets_date_saved_later',
  LAST_SEEN: 'lets_date_last_seen',
};

// Safe localStorage checker for SSR/Hydration
const isClient = () => typeof window !== 'undefined';

// Event dispatch for real-time sync across components
export const DISPATCH_EVENT_NAME = 'lets_date_storage_update';

export function notifyStorageChange(detailKey: string) {
  if (!isClient()) return;
  window.dispatchEvent(new CustomEvent(DISPATCH_EVENT_NAME, { detail: { key: detailKey } }));
}

/**
 * Get messages for a given profile
 */
export function getMessagesForProfile(profileId: string): Message[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.MESSAGES_PREFIX}${profileId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to get messages:', err);
    return [];
  }
}

/**
 * Save user message
 */
export function sendUserMessage(profileId: string, text: string): Message {
  const currentMessages = getMessagesForProfile(profileId);
  const newMessage: Message = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    profileId,
    sender: 'user',
    text: text.trim(),
    timestamp: new Date().toISOString(),
    isRead: true,
  };

  const updated = [...currentMessages, newMessage];
  if (isClient()) {
    try {
      localStorage.setItem(`${STORAGE_KEYS.MESSAGES_PREFIX}${profileId}`, JSON.stringify(updated));
      // Automatically ensure user is in matches list
      addMatchedProfile(profileId);
      notifyStorageChange(`messages_${profileId}`);
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  }

  return newMessage;
}

/**
 * Matches list
 */
export function getMatchedProfileIds(): string[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MATCHES);
    if (!raw) {
      // Default: Initial set of instant matches so user can chat right away!
      const initialMatches = PROFILES.slice(0, 8).map((p) => p.id);
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(initialMatches));
      return initialMatches;
    }
    return JSON.parse(raw);
  } catch (err) {
    return PROFILES.slice(0, 8).map((p) => p.id);
  }
}

export function addMatchedProfile(profileId: string): void {
  if (!isClient()) return;
  try {
    const current = getMatchedProfileIds();
    if (!current.includes(profileId)) {
      const updated = [profileId, ...current];
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(updated));
      notifyStorageChange(STORAGE_KEYS.MATCHES);
    }
  } catch (err) {
    console.error('Failed to add match:', err);
  }
}

/**
 * Swipes record
 */
export function getSwipesRecord(): Record<string, 'like' | 'dislike' | 'later'> {
  if (!isClient()) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SWIPES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSwipeRecord(profileId: string, action: 'like' | 'dislike' | 'later'): void {
  if (!isClient()) return;
  try {
    const current = getSwipesRecord();
    current[profileId] = action;
    localStorage.setItem(STORAGE_KEYS.SWIPES, JSON.stringify(current));

    if (action === 'like') {
      addMatchedProfile(profileId);
    }

    if (action === 'later') {
      saveForLater(profileId);
    }

    notifyStorageChange(STORAGE_KEYS.SWIPES);
  } catch (err) {
    console.error('Failed to save swipe:', err);
  }
}

/**
 * Saved for later bookmarks
 */
export function getSavedForLaterIds(): string[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LATER);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveForLater(profileId: string): void {
  if (!isClient()) return;
  try {
    const current = getSavedForLaterIds();
    if (!current.includes(profileId)) {
      const updated = [profileId, ...current];
      localStorage.setItem(STORAGE_KEYS.LATER, JSON.stringify(updated));
      notifyStorageChange(STORAGE_KEYS.LATER);
    }
  } catch (err) {
    console.error('Failed to save for later:', err);
  }
}

export function removeSavedForLater(profileId: string): void {
  if (!isClient()) return;
  try {
    const current = getSavedForLaterIds();
    const updated = current.filter((id) => id !== profileId);
    localStorage.setItem(STORAGE_KEYS.LATER, JSON.stringify(updated));
    notifyStorageChange(STORAGE_KEYS.LATER);
  } catch (err) {
    console.error('Failed to remove later:', err);
  }
}

/**
 * Reset all user activity (clean slate)
 */
export function resetAllStorage(): void {
  if (!isClient()) return;
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('lets_date_')) {
        localStorage.removeItem(key);
      }
    });
    notifyStorageChange('all_reset');
  } catch (err) {
    console.error('Failed to reset storage:', err);
  }
}
