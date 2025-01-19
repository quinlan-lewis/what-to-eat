import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { KitchenContext } from './_layout';
import { Recipe, MealType } from '@/types/Recipe';
import { theme } from '@/constants/theme';

type DayMeals = {
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
    snack: Recipe | null;
};

type WeekPlan = {
    [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday']: DayMeals;
};

export default function MyWeek() {
    const { kitchenRecipes } = useContext(KitchenContext);
    const [weekPlan, setWeekPlan] = React.useState<WeekPlan>({
        monday: { breakfast: null, lunch: null, dinner: null, snack: null },
        tuesday: { breakfast: null, lunch: null, dinner: null, snack: null },
        wednesday: { breakfast: null, lunch: null, dinner: null, snack: null },
        thursday: { breakfast: null, lunch: null, dinner: null, snack: null },
        friday: { breakfast: null, lunch: null, dinner: null, snack: null },
    });

    const getRandomRecipe = (recipes: Recipe[], mealType: MealType, usedRecipes: Set<string>): Recipe | null => {
        const filtered = recipes.filter(r => r.mealType === mealType);
        
        // First try to find unused recipes
        const unusedRecipes = filtered.filter(r => !usedRecipes.has(r.id));
        
        if (unusedRecipes.length > 0) {
            const recipe = unusedRecipes[Math.floor(Math.random() * unusedRecipes.length)];
            usedRecipes.add(recipe.id);
            return recipe;
        }
        
        // If all recipes are used, fall back to any recipe of the correct type
        return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : null;
    };

    const randomizeWeek = () => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;
        const usedRecipes = new Set<string>();
        
        const newPlan = { ...weekPlan };
        
        days.forEach(day => {
            newPlan[day] = {
                breakfast: getRandomRecipe(kitchenRecipes, 'breakfast', usedRecipes),
                lunch: getRandomRecipe(kitchenRecipes, 'lunch', usedRecipes),
                dinner: getRandomRecipe(kitchenRecipes, 'dinner', usedRecipes),
                snack: getRandomRecipe(kitchenRecipes, 'snack', usedRecipes),
            };
        });

        setWeekPlan(newPlan);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>My Week</Text>
                
                <View style={styles.weekHeader}>
                    <TouchableOpacity 
                        style={[styles.button, styles.randomizeButton]}
                        onPress={randomizeWeek}
                    >
                        <Text style={styles.buttonText}>Randomize Week</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {Object.entries(weekPlan).map(([day, meals]) => (
                        <View key={day} style={styles.dayCard}>
                            <Text style={styles.dayTitle}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </Text>
                            {Object.entries(meals).map(([mealType, recipe]) => (
                                <View key={mealType} style={styles.mealSlot}>
                                    <Text style={styles.mealType}>
                                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                                    </Text>
                                    <Text style={styles.recipeName}>
                                        {recipe ? recipe.name : 'No meal planned'}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.paper,
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: 20,
        textAlign: 'center',
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
    },
    randomizeButton: {
        backgroundColor: theme.colors.accent,
    },
    buttonText: {
        color: theme.colors.paper,
        fontSize: 16,
        fontFamily: theme.fonts.script,
    },
    dayCard: {
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    dayTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.sm,
    },
    mealSlot: {
        backgroundColor: theme.colors.paper,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.xs,
    },
    mealType: {
        fontSize: 14,
        fontFamily: theme.fonts.script,
        color: theme.colors.secondary,
        marginBottom: theme.spacing.xs,
    },
    recipeName: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
    },
}); 