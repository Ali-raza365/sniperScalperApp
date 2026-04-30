import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { normalizeWidth, screenHeight } from '../utils/Scaling';

export const bottomBarStyles = StyleSheet.create({
  // Glassmorphic tab bar container
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: 'rgba(19, 19, 19, 0.6)',
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  // Individual tab item
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 12,
  },
  // Active tab highlight pill
  tabItemActive: {
    backgroundColor: 'rgba(255, 140, 0, 0.10)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabLabel: {
    fontSize: 9,
    fontFamily: 'Inter',
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  tabLabelInactive: {
    color: 'rgba(221, 193, 174, 0.60)',
  },
  // Legacy: kept for any remaining references
  customMiddleButton: {
    backgroundColor: Colors.card,
    borderRadius: 60,
    padding: normalizeWidth(8),
    elevation: 5,
    shadowOpacity: 0.4,
    bottom: screenHeight * 0.004,
  },
  tabIcon: {
    width: 26,
    height: 26,
  },
});

export default { bottomBarStyles };
