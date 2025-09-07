import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function AuthScreen() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    try {
      setBusy(true);
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) {
          Alert.alert('確認メールを送信しました', 'メールのリンクから認証してください。');
        }
      }
    } catch (e: any) {
      Alert.alert('エラー', e?.message ?? '認証に失敗しました');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{mode === 'signin' ? 'ログイン' : 'アカウント作成'}</Text>

        <TextInput
          placeholder="email@address.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable
          onPress={onSubmit}
          disabled={busy}
          style={({ pressed }) => [styles.button, (pressed || busy) && { opacity: 0.8 }]}
        >
          <Text style={styles.buttonText}>{mode === 'signin' ? 'Sign in' : 'Sign up'}</Text>
        </Pressable>

        <Pressable
          style={styles.link}
          onPress={() => setMode((m) => (m === 'signin' ? 'signup' : 'signin'))}
          disabled={busy}
        >
          <Text style={styles.linkText}>
            {mode === 'signin' ? 'アカウントが無い？新規登録' : 'アカウントあり？ログイン'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101114', alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: 'white', borderRadius: 12, padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, height: 48, backgroundColor: '#fff' },
  button: { height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', marginTop: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  link: { alignItems: 'center', marginTop: 8 },
  linkText: { color: '#2563eb', fontSize: 13 },
});
