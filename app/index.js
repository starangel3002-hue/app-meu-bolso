import React, { use, useState } from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

    export default function Longin() {
    const [email, setEmail] = useState('');
    const[passaword, setPassword]= useState('');
    const [loading, setLoading] = useState(false);

        return (
      <View style={StyleSheet.container}>
        <Text>Meu Bolso</Text>
          <Text>controle suas finanças.</Text>
          <AppInput label="e-mail" placeholder="digite seu e-mail"
          autoCapitalize="none" keyboardType="email-address"
          value={email} onChangeText={setEmail}/>

          <AppInput label="senha" secureTextEntry value={password}
          onChangeText={setPassword} placeholder="digite sua senha" />

          <AppButton title="entrar" loading={loading}/>
          <TouchableOpacity>
            <Text>criar nova conta </Text>
          </TouchableOpacity>
      </View>

        );
    }