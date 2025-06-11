// components/QRCodeGenerator.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../constants/theme';

const QRCodeGenerator = ({ value, label = 'Your QR Code' }) => {
  const { colors } = useTheme();

  if (!value) {
    return (
      <View style={[styles.wrapper, { backgroundColor: colors.card }]}>
        <Text style={{ color: colors.text }}>No QR value provided</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={styles.qrBox}>
        <QRCode value={value} size={180} backgroundColor="transparent" color={colors.text} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  qrBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default QRCodeGenerator;
