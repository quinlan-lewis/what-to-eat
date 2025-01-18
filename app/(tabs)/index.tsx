import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { KitchenContext } from './_layout';
import { RecipePage } from '@/components/ui/RecipePage';
import { IngredientListModal } from '@/components/ui/IngredientListModal';
import { UpdateKitchenPage } from '@/components/ui/UpdateKitchenPage';
import { theme } from '@/constants/theme';

export default function MyKitchen() {
    const { kitchenRecipes, setKitchenRecipes } = useContext(KitchenContext);
    const [visibleRecipeId, setVisibleRecipeId] = useState<string | null>(null);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showUpdateKitchen, setShowUpdateKitchen] = useState(false);
    
    const toggleRecipeChecked = (recipeId: string) => {
        setKitchenRecipes(prevRecipes => {
            const updatedRecipes = prevRecipes.map(recipe => 
                recipe.id === recipeId 
                    ? { ...recipe, checked: !recipe.checked }
                    : recipe
            );
            return updatedRecipes.sort((a, b) => {
                if (a.checked === b.checked) return 0;
                return a.checked ? 1 : -1;
            });
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>My Kitchen</Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.updateButton]}
                        onPress={() => setShowUpdateKitchen(true)}
                    >
                        <Text style={styles.buttonText}>Update Kitchen</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.ingredientsButton]}
                        onPress={() => setShowIngredients(true)}
                    >
                        <Text style={styles.buttonText}>View Shopping List</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView>
                        {kitchenRecipes.map((recipe: any) => (
                            <React.Fragment key={recipe.id}>
                                <TouchableOpacity 
                                    style={[
                                        styles.recipeCard,
                                        recipe.checked && styles.checkedCard
                                    ]}
                                    onPress={() => setVisibleRecipeId(recipe.id)}
                                >
                                    <View style={styles.recipeRow}>
                                        <Pressable
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                toggleRecipeChecked(recipe.id);
                                            }}
                                            style={styles.checkbox}>
                                            {recipe.checked ? <Text>✓</Text> : null}
                                        </Pressable>
                                        <Text
                                            style={[
                                                styles.recipeName,
                                                recipe.checked && styles.checkedText
                                            ]}>
                                            {recipe.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <RecipePage
                                    recipe={recipe}
                                    visible={visibleRecipeId === recipe.id}
                                    onClose={() => setVisibleRecipeId(null)}
                                />
                            </React.Fragment>
                        ))}
                    </ScrollView>
                </View>

                <UpdateKitchenPage
                    visible={showUpdateKitchen}
                    onClose={() => setShowUpdateKitchen(false)}
                />

                <IngredientListModal
                    visible={showIngredients}
                    onClose={() => setShowIngredients(false)}
                    recipes={kitchenRecipes}
                />

                <Text style={{ fontFamily: 'Satisfy' }}>Testing Satisfy Font</Text>
                <Text style={{ fontFamily: 'Lora' }}>Testing Lora Font</Text>
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
    updateButton: {
        backgroundColor: theme.colors.accent,
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
});