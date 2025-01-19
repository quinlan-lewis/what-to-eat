import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { RecipesContext, KitchenContext } from './_layout';
import { RecipePage } from '@/components/ui/RecipePage';
import { AddRecipePage } from '@/components/ui/AddRecipePage';
import { SearchBar } from '@/components/ui/SearchBar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { theme } from '@/constants/theme';
import { Recipe } from '../../types/Recipe';
import { RecipeModal } from '../../components/ui/RecipeModal';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

// // buttons for testing
// function RecipeButtons() {
//     const handleGet = async () => {
//         try {
//             const keys = await AsyncStorage.getAllKeys();
//             const recipes = await AsyncStorage.getItem('recipes');
//             if (recipes) {
//                 console.log('all recipes', JSON.parse(recipes).recipes);
//             }
//             console.log('All stored keys:', keys);
//             for (const key of keys) {
//                 const value = await AsyncStorage.getItem(key);
//                 console.log(`${key}:`, value);
//             }
//         } catch (error) {
//             console.error('Error getting keys:', error);
//         }
//     };

//     const handleClean = async () => {
//         try {
//             const keys = await AsyncStorage.getAllKeys();
//             await AsyncStorage.multiRemove(keys);
//             console.log('Storage cleaned');
//         } catch (error) {
//             console.error('Error cleaning storage:', error);
//         }
//     };

//     return (
//         <View>
//             <Button title="Get All Data" onPress={handleGet} color="#007AFF" />
//             <Button title="Clean Storage" onPress={handleClean} color="#007AFF" />
//         </View>
//     );
// }

export default function MyRecipes() {
    const { recipes, setRecipes } = useContext(RecipesContext);
    const { kitchenRecipes, setKitchenRecipes } = useContext(KitchenContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddRecipeVisible, setAddRecipeVisible] = useState(false);
    const [visibleRecipeId, setVisibleRecipeId] = useState<string | null>(null);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const handleSaveRecipe = (newRecipe: any) => {
        setRecipes([...recipes, {
            id: Date.now().toString(),
            ...newRecipe,
        }]);
        setAddRecipeVisible(false);
    };

    const addToKitchen = (recipe: Recipe) => {
        if (!kitchenRecipes.some(r => r.id === recipe.id)) {
            setKitchenRecipes(prev => [...prev, { ...recipe }]);
        }
    };

    const handleRecipePress = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const removeRecipe = (recipeId: string) => {
        setRecipes(prevRecipes => 
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

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Recipes</Text>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => setAddRecipeVisible(true)}
                    >
                        <IconSymbol name="plus" size={24} color={theme.colors.paper} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                {/* <RecipeButtons /> */}
                <View style={styles.scrollContainer}>
                    <ScrollView>
                        {filteredRecipes.map((recipe: any) => (
                            <Swipeable
                                key={recipe.id}
                                renderRightActions={() => renderRightActions(recipe.id)}
                                rightThreshold={40}
                            >
                                <TouchableOpacity
                                    style={styles.recipeCard}
                                    onPress={() => handleRecipePress(recipe)}
                                >
                                    <Text style={styles.recipeName}>
                                        {recipe.name}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            addToKitchen(recipe);
                                        }}
                                    >
                                        <IconSymbol name="plus" size={24} color={theme.colors.paper} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Swipeable>
                        ))}
                    </ScrollView>
                </View>

                <AddRecipePage
                    visible={isAddRecipeVisible}
                    onClose={() => setAddRecipeVisible(false)}
                />

                {selectedRecipe && (
                    <RecipeModal
                        recipe={selectedRecipe}
                        visible={selectedRecipe !== null}
                        onClose={() => setSelectedRecipe(null)}
                    />
                )}
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
        padding: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.lg,
        textAlign: 'center',
    },
    searchContainer: {
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.md,
        ...theme.shadows.small,
    },
    searchInput: {
        fontFamily: theme.fonts.regular,
        fontSize: 16,
        color: theme.colors.ink,
    },
    addButton: {
        backgroundColor: theme.colors.success,
        borderRadius: theme.borderRadius.full,
        padding: 8,
        marginLeft: theme.spacing.sm,
    },
    addButtonText: {
        color: theme.colors.paper,
        fontFamily: theme.fonts.script,
        fontSize: 18,
    },
    listItem: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 10,
    },
    recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.paperDark,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.sm,
    },
    recipeName: {
        fontSize: 18,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        flex: 1,
    },
    recipeDescription: {
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        color: theme.colors.ink,
        opacity: 0.8,
    },
    recipeInfo: {
        flex: 1,
        paddingRight: theme.spacing.sm,
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