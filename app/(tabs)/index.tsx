import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { KitchenContext } from './_layout';
import { RecipePage } from '@/components/ui/RecipePage';
import { IngredientListModal } from '../../components/ui/IngredientListModal';
import { RecipeModal } from '../../components/ui/RecipeModal';
import { theme } from '../../constants/theme';
import { Recipe, MealType } from '../../types/Recipe';
import * as Clipboard from 'expo-clipboard';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// TODO: add columns for breakfast, lunch, dinner, and snacks
export default function MyKitchen() {
    const { kitchenRecipes, setKitchenRecipes } = useContext(KitchenContext);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [showIngredients, setShowIngredients] = useState(false);

    const handleRecipePress = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const removeRecipe = (recipeId: string) => {
        setKitchenRecipes(prevRecipes => 
            prevRecipes.filter(recipe => recipe.id !== recipeId)
        );
    };

    const renderRightActions = (recipeId: string) => {
        return (
            <TouchableOpacity
                style={styles.deleteAction}
                onPress={() => removeRecipe(recipeId)}
            >
                <MaterialIcons name="delete" size={24} color={theme.colors.paper} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>My Kitchen</Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.ingredientsButton]}
                        onPress={() => setShowIngredients(true)}
                    >
                        <Text style={styles.buttonText}>View Shopping List</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView>
                        {kitchenRecipes.map((recipe) => (
                            <Swipeable
                                key={recipe.id}
                                renderRightActions={() => renderRightActions(recipe.id)}
                                rightThreshold={40}
                            >
                                <TouchableOpacity 
                                    style={styles.recipeCard}
                                    onPress={() => handleRecipePress(recipe)}
                                >
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                </TouchableOpacity>
                            </Swipeable>
                        ))}
                    </ScrollView>
                </View>

                {selectedRecipe && (
                    <RecipeModal
                        recipe={selectedRecipe}
                        visible={selectedRecipe !== null}
                        onClose={() => setSelectedRecipe(null)}
                    />
                )}

                <IngredientListModal
                    visible={showIngredients}
                    onClose={() => setShowIngredients(false)}
                    recipes={kitchenRecipes}
                />
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
    recipeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: theme.colors.accent,
        borderRadius: theme.borderRadius.sm,
        marginRight: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.paper,
    },
    recipeName: {
        fontSize: 18,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        flex: 1,
    },
    checkedText: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: theme.colors.ink,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    ingredientsButton: {
        backgroundColor: theme.colors.secondary,
    },
    buttonText: {
        color: theme.colors.paper,
        fontSize: 16,
        fontFamily: theme.fonts.script,
        textAlign: 'center',
    },
    recipeCard: {
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },
    checkedCard: {
        backgroundColor: theme.colors.subtle,
        opacity: 0.8,
    },
    weekSection: {
        marginBottom: theme.spacing.md,
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    weekTitle: {
        fontSize: 24,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
    },
    randomizeButton: {
        backgroundColor: theme.colors.accent,
    },
    dayCard: {
        width: 280,
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginRight: theme.spacing.md,
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
    deleteAction: {
        backgroundColor: theme.colors.error,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        borderTopRightRadius: theme.borderRadius.md,
        borderBottomRightRadius: theme.borderRadius.md,
    },
});