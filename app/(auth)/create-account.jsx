import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useRef, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../../context/auth.jsx';

export default function CreateAccount() {
  const { createAccount } = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen
        options={{ title: 'Create Account', headerLeft: () => <></> }}
      />
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='email'
          nativeID='email'
          onChangeText={setEmail}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder='firstName'
          nativeID='firstName'
          onChangeText={setFirstName}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder='lastName'
          nativeID='lastName'
          onChangeText={setLastName}
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
        style={{ marginBottom: 8 }}
        title='Create new user'
        onPress={async () => {
          const resp = await createAccount({
            email,
            password,
            name: `${firstName} ${lastName}`,
            // PocketBase requires a pass confirm field
            passwordConfirm: password,
          });
          console.log(resp);
          if (resp?.user) {
            router.replace('/(tabs)/home');
          } else {
            console.log(resp.error);
            Alert.alert('Sign Up Error', resp.error?.message);
          }
        }}
      />

      <Button
        onPress={() => {
          router.back();
        }}
        title='Cancel'
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
