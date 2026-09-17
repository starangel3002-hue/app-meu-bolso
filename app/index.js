import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import AppInput from '../src/componentes/AppInput';
import AppButton from '../src/componentes/AppButton';
import { supabase } from '../src/componentes/services/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      return Alert.alert('Atenção', 'Preencha todos os campos.');
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      return Alert.alert('Erro ao entrar', error.message);
    }

    router.replace('/home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View>
        <Text style={styles.title}>Meu Bolso</Text>
        <Text style={styles.subtitle}>controle suas finanças.</Text>

        <AppInput
          label="e-mail"
          placeholder="digite seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <AppInput
          label="senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="digite sua senha"
        />

        <AppButton title="entrar" loading={loading} onPress={handleLogin} />

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>criar nova conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2f3640',
    textAlign: 'center',
  },
  subtitle: {
    color: '#7f8fa6',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  link: {
    color: '#008f22',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
  },
});