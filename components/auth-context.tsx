'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${session.expires_in}; SameSite=Lax; Secure`;
      } else {
        document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax; Secure`;
      }
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${session.expires_in}; SameSite=Lax; Secure`;
      } else {
        document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax; Secure`;
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax; Secure`;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
