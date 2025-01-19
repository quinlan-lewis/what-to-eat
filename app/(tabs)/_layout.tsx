import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Recipe } from '@/types/Recipe';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import StandardRecipes from '@/constants/StandardRecipes.json';
import { theme } from '@/constants/theme';

// Overall context for all recipes
export const RecipesContext = React.createContext<{
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}>({ recipes: [], setRecipes: () => {} });

// Keeping track of the selected recipes in our kitchen
export const KitchenContext = React.createContext<{
  kitchenRecipes: Recipe[];
  setKitchenRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}>({ kitchenRecipes: [], setKitchenRecipes: () => {} });

function TabBarIcon({ name, color }: { name: string; color: string }) {
    const iconName = name === 'kitchen' ? 'refrigerator' :
                    name === 'calendar' ? 'calendar' :
                    name === 'book' ? 'text.book.closed' :
                    'questionmark';
    
    return <IconSymbol name={iconName} size={24} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>(StandardRecipes.recipes as Recipe[]);
  const [kitchenRecipes, setKitchenRecipes] = useState<Recipe[]>(StandardRecipes.kitchenRecipes as Recipe[]);

  useEffect(() => {
    const initializeStorage = async () => {
        try {
            const existingRecipes = await AsyncStorage.getItem('recipes');
            if (!existingRecipes) {
                console.log('Initializing with standard recipes:', StandardRecipes);
                await AsyncStorage.setItem('recipes', JSON.stringify(StandardRecipes));
                setRecipes(StandardRecipes.recipes as Recipe[]);
                setKitchenRecipes(StandardRecipes.kitchenRecipes as Recipe[]);
            } else {
                const parsedRecipes = JSON.parse(existingRecipes);
                console.log('Loading existing recipes:', parsedRecipes);
                setRecipes(parsedRecipes.recipes as Recipe[]);
                setKitchenRecipes(parsedRecipes.kitchenRecipes as Recipe[]);
            }
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    };

    initializeStorage();
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      <KitchenContext.Provider value={{ kitchenRecipes, setKitchenRecipes }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.paper,
              borderTopColor: theme.colors.border,
              ...theme.shadows.small,
            },
            tabBarActiveTintColor: theme.colors.accent,
            tabBarInactiveTintColor: theme.colors.secondary,
            tabBarLabelStyle: {
              fontFamily: theme.fonts.regular,
              fontSize: 12,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'My Kitchen',
              tabBarIcon: ({ color }) => <TabBarIcon name="kitchen" color={color} />,
            }}
          />
          <Tabs.Screen
            name="myweek"
            options={{
              title: 'My Week',
              tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
            }}
          />
          <Tabs.Screen
            name="recipes"
            options={{
              title: 'Recipes',
              tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
            }}
          />
        </Tabs>
      </KitchenContext.Provider>
    </RecipesContext.Provider>
  );
}
