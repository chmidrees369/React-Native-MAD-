import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../constants/theme';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const CheckInScreen = ({ route }) => {
  const { event } = route.params;
  const { colors, isDark } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fake user for now (replace with actual API or AsyncStorage fetch later)
    const fetchUser = async () => {
      const fakeUser = {
        id: 'user_001',
        name: 'Alex Johnson',
        email: 'alex.j@university.edu',
      };
      setUser(fakeUser);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.text }}>
          Loading your event pass...
        </Text>
      </View>
    );
  }

  const qrPayload = JSON.stringify({
    userId: user.id,
    eventId: event.id,
    timestamp: new Date().toISOString(),
  });

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={200}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Card
        containerStyle={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: isDark ? '#000' : '#999',
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {event.title}
        </Text>

        <View style={styles.infoRow}>
          <Icon name="person" color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>{user.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="event" color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            {moment(event.date).format('MMM Do, YYYY — h:mm A')}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="place" color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>{event.venue}</Text>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={qrPayload}
            size={200}
            color={isDark ? '#fff' : '#000'}
            backgroundColor="transparent"
          />
        </View>

        <Text style={[styles.note, { color: colors.text }]}>
          Please show this QR code at the event check-in desk.
        </Text>
      </Card>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 18,
    padding: 22,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  qrContainer: {
    marginTop: 20,
    marginBottom: 12,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  note: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default CheckInScreen;
