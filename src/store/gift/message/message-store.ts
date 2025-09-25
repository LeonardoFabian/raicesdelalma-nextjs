import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface MessageState {
    message: {
        sender: string;
        recipient: string;
        message: string;
    }
    setMessage: (message: MessageState['message']) => void;
}

export const useGiftMessageStore = create<MessageState>()(
    persist(
        ( set, get ) => ({
            message: {
                sender: '',
                recipient: '',
                message: ''
            },

            setMessage: (message) => {
                set({ message });
            }
        }), {
            name: 'pbb-gift-message'
        }
    )
);