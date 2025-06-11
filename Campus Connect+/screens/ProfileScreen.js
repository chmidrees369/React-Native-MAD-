// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/theme';
import * as Animatable from 'react-native-animatable';

const ProfileScreen = () => {
  const { colors, toggleTheme, isDarkMode } = useTheme();
  const [preferences, setPreferences] = useState([]);

  const options = ['Tech', 'Sports', 'Workshop', 'Seminar', 'Social'];

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('preferences');
      if (saved) setPreferences(JSON.parse(saved));
    })();
  }, []);

  const togglePreference = async (pref) => {
    const updated = preferences.includes(pref)
      ? preferences.filter((p) => p !== pref)
      : [...preferences, pref];
    setPreferences(updated);
    await AsyncStorage.setItem('preferences', JSON.stringify(updated));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animatable.View animation="fadeInDown" delay={100} style={styles.header}>
        <Avatar
          rounded
          size="large"
          title="A"
          containerStyle={{ backgroundColor: colors.primary }}
        />
        <Text style={[styles.name, { color: colors.text }]}>Alex Johnson</Text>
        <Text style={[styles.email, { color: colors.text }]}>alex.j@university.edu</Text>
      </Animatable.View>

      {/* Preferences */}
      <Animatable.View animation="fadeInUp" delay={200} style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Preferences</Text>
        <View style={styles.preferencesWrapper}>
          {options.map((item, index) => (
            <Animatable.View
              animation="zoomIn"
              delay={index * 100}
              key={item}
              style={styles.prefItemWrapper}
            >
              <TouchableOpacity
                onPress={() => togglePreference(item)}
                style={[
                  styles.prefButton,
                  {
                    backgroundColor: preferences.includes(item)
                      ? colors.primary
                      : colors.background,
                    borderColor: preferences.includes(item)
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              >
                <Text style={{ color: preferences.includes(item) ? '#fff' : colors.text }}>
                  {item}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </Animatable.View>

      {/* Theme Switch */}
      <Animatable.View animation="fadeInUp" delay={300} style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>App Settings</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Icon name="brightness-6" color={colors.text} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <TouchableOpacity onPress={toggleTheme}>
            <Icon
              name={isDarkMode ? 'toggle-on' : 'toggle-off'}
              color={colors.primary}
              size={36}
            />
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  email: {
    fontSize: 14,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  preferencesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  prefItemWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  prefButton: {
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default ProfileScreen;
