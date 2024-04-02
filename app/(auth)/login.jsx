import { Text, View, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/auth';

export default function LogIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder='email'
          autoCapitalize='none'
          nativeID='email'
          onChangeText={setEmail}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          nativeID='password'
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>
      <Button
        onPress={async () => {
          const resp = await signIn(email, password);
          if (resp?.user) {
            // Redirect to the index page of (tabs) segment.
            router.replace('/(tabs)');
          } else {
            console.log(resp.error);
            Alert.alert('Login Error', resp.error?.message);
          }
        }}
        title='Login'
      />
      <Button
        onPress={() => router.push('/create-account')}
        title='Create account'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: '#455fff',
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#455fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
});
