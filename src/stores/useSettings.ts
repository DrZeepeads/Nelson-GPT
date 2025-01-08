import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  chatBubbleStyle: 'rounded' | 'square';
  sendOnEnter: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setNotifications: (enabled: boolean) => void;
  setChatBubbleStyle: (style: 'rounded' | 'square') => void;
  setSendOnEnter: (enabled: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      fontSize: 'medium',
      notifications: true,
      chatBubbleStyle: 'rounded',
      sendOnEnter: true,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setNotifications: (notifications) => set({ notifications }),
      setChatBubbleStyle: (chatBubbleStyle) => set({ chatBubbleStyle }),
      setSendOnEnter: (sendOnEnter) => set({ sendOnEnter }),
    }),
    {
      name: 'settings-storage',
    }
  )
);