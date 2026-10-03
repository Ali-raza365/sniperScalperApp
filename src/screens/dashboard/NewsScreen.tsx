/**
 * NewsScreen — market news feed
 * Matches pro-assets/screens/news.png + Design System UI kit
 */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';
import { TopBar, NewsCard } from '../../components/ds';
import { ProImages } from '../../assets/images/pro';
import { newsRepository } from '../../data/repository';
import type { RootStackParamList } from '../../navigation/types';
import { showToast } from '../../utils/CustomToast';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const imageMap = {
  newsSample1: ProImages.newsSample1,
  newsSample2: ProImages.newsSample2,
  courseChart: ProImages.courseChart,
} as const;

const NewsScreen: FC = () => {
  const navigation = useNavigation<Nav>();
  const feed = newsRepository.getFeed();
  const tickerAnim = useRef(new Animated.Value(0)).current;
  const [tickerWidth] = useState(720);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(tickerAnim, {
        toValue: -tickerWidth,
        duration: 16000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [tickerAnim, tickerWidth]);

  const tickerText = feed.tickerItems.join('  ·  ') + '  ·  ';

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <TopBar
        title="Sniper Scalper"
        showBack
        onBack={() => navigation.navigate('BottomTab', { screen: 'Home' })}
        leadingAvatar={ProImages.avatar}
        icons={[
          { name: 'refresh', onPress: () => showToast.success('Feed refreshed.') },
          { name: 'menu', onPress: () => showToast.success('Menu opened.') },
        ]}
      />

      <View style={s.ticker}>
        <View style={s.tickerBadge}>
          <Text style={s.tickerBadgeTxt}>BREAKING</Text>
        </View>
        <View style={s.tickerScroll}>
          <Animated.View style={[s.tickerInner, { transform: [{ translateX: tickerAnim }] }]}>
            <Text style={s.tickerItem}>{tickerText}</Text>
            <Text style={s.tickerItem}>{tickerText}</Text>
          </Animated.View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {feed.articles.map(art => (
          <NewsCard
            key={art.id}
            source={art.source}
            timestamp={art.time}
            tag={art.tag ?? art.tickers[0] ?? '$BUSINESS'}
            image={art.imageKey ? imageMap[art.imageKey] : undefined}
            headline={art.title}
            excerpt={art.summary}
          />
        ))}
        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  ticker: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Colors.surfaceContainerLow,
    minHeight: 48,
  },
  tickerBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  tickerBadgeTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textOnAccent,
    letterSpacing: 1.5,
  },
  tickerScroll: { flex: 1, overflow: 'hidden', justifyContent: 'center' },
  tickerInner: { flexDirection: 'row', alignItems: 'center' },
  tickerItem: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: 0.5,
    paddingHorizontal: 12,
    textTransform: 'uppercase',
  },
  scroll: {
    paddingHorizontal: Spacing.pageMargin,
    paddingTop: 18,
    gap: 16,
  },
});

export default NewsScreen;
