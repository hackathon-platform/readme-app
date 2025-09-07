// src/app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabase';
import DebugAuthBadge from '@/components/DebugAuthBadge';

export default function TabHome() {
  return (
    <View style={styles.container}>
      <DebugAuthBadge />
      <Pressable style={styles.btn} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.btnText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center' },
  btn: { backgroundColor: '#111827', paddingHorizontal: 16, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: 'white', fontWeight: '600' },
});
