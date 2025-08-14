import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = ({ size = 'large', iconOnly = false }) => {
  const logoSize = size === 'large' ? styles.largeLogo : styles.smallLogo;
  const textSize = size === 'large' ? styles.largeText : styles.smallText;
  const subtitleSize = size === 'large' ? styles.largeSubtitle : styles.smallSubtitle;

  return (
    <View style={[styles.container, logoSize, iconOnly && styles.iconOnlyContainer]}>
      <View style={[styles.iconContainer, iconOnly && styles.iconOnlyStyle]}>
        <View style={[styles.outerCircle, iconOnly && styles.smallerCircle]}>
          <View style={[styles.innerCircle, iconOnly && styles.smallerInnerCircle]}>
            <View style={[styles.heart, iconOnly && styles.smallerHeart]} />
          </View>
        </View>
      </View>
      {!iconOnly && (
        <>
          <Text style={[styles.title, textSize]}>Quickies</Text>
          {size === 'large' && (
            <Text style={[styles.subtitle, subtitleSize]}>Quick Dates, Real Vibes</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeLogo: {
    marginVertical: 40,
  },
  smallLogo: {
    marginVertical: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1B5EBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    width: 20,
    height: 20,
    backgroundColor: '#FF1744',
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  largeText: {
    fontSize: 28,
  },
  smallText: {
    fontSize: 24,
  },
  subtitle: {
    color: '#666666',
  },
  largeSubtitle: {
    fontSize: 16,
  },
  smallSubtitle: {
    fontSize: 14,
  },
  iconOnlyContainer: {
    marginVertical: 10,
  },
  iconOnlyStyle: {
    marginBottom: 0,
  },
  smallerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  smallerInnerCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  smallerHeart: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Logo;