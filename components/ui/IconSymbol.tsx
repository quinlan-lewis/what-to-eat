// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'questionmark': 'question-mark',
  'text.book.closed': 'menu-book',
  'refrigerator': 'kitchen',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'xmark': 'close',
  'magnifyingglass': 'search',
  'plus': 'add',
  'calendar': 'event',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

type IconName = 
    | 'refrigerator'
    | 'text.book.closed'
    | 'questionmark'
    | 'chevron.left'
    | 'chevron.right'
    | 'xmark'
    | 'magnifyingglass'
    | 'plus'
    | 'calendar';  // Added calendar

interface IconSymbolProps {
    name: IconName;
    size?: number;
    color?: string;
}

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
