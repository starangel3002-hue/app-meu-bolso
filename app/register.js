import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import AppInput from '../src/componentes/AppInput';
import AppButton from '../src/componentes/AppButton';
import { supabase } from '../src/componentes/services/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  // trim é uma função/método usado para remover espaços em branco
  async function handleRegister() {
    if (!email.trim() || !password || !confirm) {
      return Alert.alert('Atenção', 'Preencha todos os campos.');
    }
    if (password.length < 6) {
      return Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres.');
    }
    if (password !== confirm) {
      return Alert.alert('Atenção', 'As senhas não conferem.');
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      return Alert.alert('Erro ao criar conta', error.message);
    }

    Alert.alert('Sucesso', 'Conta criada com sucesso!');
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Criar conta</Text>

      <AppInput
        label="e-mail"
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
      />

      <AppInput
        label="confirmar senha"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <AppButton title="criar conta" onPress={handleRegister} loading={loading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2f3640',
    marginBottom: 28,
  },
});