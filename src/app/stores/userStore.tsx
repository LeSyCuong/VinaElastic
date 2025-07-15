import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  phone?: string;
  vnd: number;
}

interface UserStore {
  user: User | null;
  isFetching: boolean;
  hasFetchedUser: boolean; // Cờ đánh dấu liệu user đã được fetch hay chưa
  setUser: (user: User | null) => void;
  checkUser: () => Promise<User | null>;
  updateUserFromBackend: (userId: number) => Promise<void>;
}

const url_backend = process.env.NEXT_PUBLIC_URL_BACKEND;

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isFetching: false,
  hasFetchedUser: false, // Khởi tạo cờ hasFetchedUser là false

  setUser: async (user) => {
    set({ user });
    if (user) {
      // Nếu đã có user, kiểm tra cờ hasFetchedUser
      if (!useUserStore.getState().hasFetchedUser) {
        await useUserStore.getState().updateUserFromBackend(user.id);
      }
    } else {
      set({ user: null });
    }
  },

  checkUser: async () => {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      set({ user });
      return user;
    } else if (localUser) {
      const user = JSON.parse(localUser);
      set({ user });
      return user;
    } else {
      set({ user: null });
      return null;
    }
  },

  updateUserFromBackend: async (userId: number) => {
    const { isFetching, hasFetchedUser } = useUserStore.getState();

    // Nếu đã fetch rồi hoặc đang fetch thì không làm gì nữa
    if (isFetching || hasFetchedUser) return;

    set({ isFetching: true });

    try {
    } catch (error) {
      console.error("Failed to fetch user data from backend:", error);
    } finally {
      set({ isFetching: false });
    }
  },
}));
