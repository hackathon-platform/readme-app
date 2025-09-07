// src/components/DebugAuthBadge.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuth } from '@/providers/SupabaseProvider';

export default function DebugAuthBadge() {
  const { user, session, loading } = useAuth();

  if (loading) return <Text style={styles.muted}>Checking session…</Text>;
  if (!session) return <Text style={styles.bad}>Not logged in</Text>;

  return (
    <View>
      <Text style={styles.good}>Logged in ✅</Text>
      <Text style={styles.muted}>
        {user?.email} · {user?.id?.slice(0, 8)}…
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  muted: { color: '#6b7280' },
  good: { color: '#16a34a', fontWeight: '600' },
  bad: { color: '#dc2626', fontWeight: '600' },
});
