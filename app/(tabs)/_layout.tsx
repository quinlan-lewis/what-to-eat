import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import StandardRecipes from '@/constants/StandardRecipes.json';
import { theme } from '@/constants/theme';

// Overall context for all recipes
export const RecipesContext = React.createContext<{
  recipes: any[];
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
}>({ recipes: [], setRecipes: () => {} });

// Keeping track of the selected recipes in our kitchen
export const KitchenContext = React.createContext<{
  kitchenRecipes: any[];
  setKitchenRecipes: React.Dispatch<React.SetStateAction<any[]>>;
}>({ kitchenRecipes: [], setKitchenRecipes: () => {} });

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [kitchenRecipes, setKitchenRecipes] = useState<any[]>([]);

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        const existingRecipes = await AsyncStorage.getItem('recipes');
        if (!existingRecipes) {
          await AsyncStorage.setItem('recipes', JSON.stringify(StandardRecipes));
          setRecipes(StandardRecipes.recipes);
          console.log('Recipes initialized with standard recipes');
        } else {
          const parsedRecipes = JSON.parse(existingRecipes);
          setRecipes(parsedRecipes.recipes);
          console.log('Recipes already exist');
        }
      } catch (error) {
        console.error('Error initializing recipes:', error);
      }

      try {
        const existingKitchenRecipes = await AsyncStorage.getItem('kitchenRecipes');
        if (!existingKitchenRecipes) {
          await AsyncStorage.setItem('kitchenRecipes', JSON.stringify(StandardRecipes));
          setKitchenRecipes(StandardRecipes.kitchenRecipes);
          console.log('Kitchen recipes initialized with standard recipes');
        } else {
          const parsedRecipes = JSON.parse(existingKitchenRecipes);
          setKitchenRecipes(parsedRecipes.kitchenRecipes);
          console.log('Kitchen recipes already exist');
        }
      } catch (error) {
        console.error('Error initializing kitchen recipes:', error);
      }
    };

    // AsyncStorage.clear();
    initializeStorage();
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      <KitchenContext.Provider value={{ kitchenRecipes, setKitchenRecipes }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: theme.colors.accent,
            tabBarInactiveTintColor: theme.colors.secondary,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              ...Platform.select({
                ios: {
                  position: 'absolute',
                },
                default: {},
              }),
              backgroundColor: theme.colors.paperDark,
              borderTopColor: theme.colors.border,
              ...theme.shadows.small,
            },
            tabBarLabelStyle: {
              fontFamily: theme.fonts.regular,
              fontSize: 12,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'My Kitchen',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="refrigerator" color={color} />,
            }}
          />
          <Tabs.Screen
            name="recipes"
            options={{
              title: 'My Recipes',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.book.closed" color={color} />,
            }}
          />
        </Tabs>
      </KitchenContext.Provider>
    </RecipesContext.Provider>
  );
}
