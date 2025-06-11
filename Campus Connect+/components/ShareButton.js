// components/ShareButton.js
import React from 'react';
import { View, StyleSheet, Alert, Share } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useTheme } from '../constants/theme';

const ShareButton = ({ event }) => {
  const { colors } = useTheme();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `📢 Check out this event!\n\nTitle: ${event.title}\nDate: ${event.date}\nVenue: ${event.venue}\n\nGet more events on CampusConnect+ 📱`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not share event. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Share Event"
        icon={<Icon name="share" type="feather" size={20} color="#fff" style={{ marginRight: 10 }} />}
        onPress={handleShare}
        buttonStyle={{ backgroundColor: colors.primary, borderRadius: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
});

export default ShareButton;
