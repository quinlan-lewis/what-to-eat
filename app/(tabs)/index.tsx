import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { KitchenContext } from './_layout';
import { RecipePage } from '@/components/ui/RecipePage';
import { IngredientListModal } from '@/components/ui/IngredientListModal';
import { UpdateKitchenPage } from '@/components/ui/UpdateKitchenPage';

// TODO: add columns for breakfast, lunch, dinner, and snacks
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
                                <View style={styles.recipeRow}>
                                    <Pressable
                                        onPress={() => toggleRecipeChecked(recipe.id)}
                                        style={styles.checkbox}>
                                        {recipe.checked ? <Text>✓</Text> : null}
                                    </Pressable>
                                    <Text
                                        style={[
                                            styles.listItem,
                                            { color: '#007AFF' },
                                            recipe.checked && styles.checkedText
                                        ]}
                                        onPress={() => setVisibleRecipeId(recipe.id)}>
                                        • {recipe.name}
                                    </Text>
                                </View>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    recipeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedText: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    listItem: {
        fontSize: 18,
        color: 'black',
        flex: 1,
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
    },
    updateButton: {
        backgroundColor: '#007AFF',
    },
    ingredientsButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});