import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { appendToList } from '../utils/storage';
import { useTheme } from '../constants/theme';

const RegistrationForm = ({ eventId, onRegistered }) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registering, setRegistering] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });

  /**
   * Validate form fields and set error messages
   */
  const validate = () => {
    const newErrors = { name: '', email: '' };
    if (!name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  /**
   * Handle registration logic
   */
  const handleRegister = async () => {
    if (!validate()) return;

    setRegistering(true);
    Keyboard.dismiss();

    const registration = {
      id: Date.now().toString(),
      eventId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
    };

    try {
      await appendToList(`registrations_${eventId}`, registration);
      Alert.alert('Success', 'You are registered for the event!');
      setName('');
      setEmail('');
      onRegistered && onRegistered();
    } catch (e) {
      console.error('Registration error:', e);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <View style={[styles.form, { backgroundColor: colors.card }]}>      
      <Text style={[styles.label, { color: colors.text }]}>Name</Text>
      <TextInput
        value={name}
        onChangeText={text => {
          setName(text);
          errors.name && setErrors(prev => ({ ...prev, name: '' }));
        }}
        placeholder="Enter your name"
        placeholderTextColor={colors.placeholder}
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        autoCapitalize="words"
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={[styles.label, { color: colors.text }]}>Email</Text>
      <TextInput
        value={email}
        onChangeText={text => {
          setEmail(text);
          errors.email && setErrors(prev => ({ ...prev, email: '' }));
        }}
        placeholder="Enter your email"
        placeholderTextColor={colors.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Button
        title="Register"
        onPress={handleRegister}
        loading={registering}
        disabled={registering}
        buttonStyle={{ backgroundColor: colors.primary, borderRadius: 8 }}
        containerStyle={{ marginTop: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
});

export default RegistrationForm;
