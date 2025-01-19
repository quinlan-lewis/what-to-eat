import React from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { theme } from '@/constants/theme';

type IngredientListModalProps = {
    visible: boolean;
    onClose: () => void;
    recipes: any[];
}

export const IngredientListModal: React.FC<IngredientListModalProps> = ({ visible, onClose, recipes }) => {
    const uncheckedRecipes = recipes.filter(recipe => !recipe.checked);
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <SafeAreaView style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.innerContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity 
                                onPress={onClose}
                                style={styles.backButton}
                            >
                                <IconSymbol name="chevron.left" size={24} color={theme.colors.ink} />
                            </TouchableOpacity>
                            <Text style={styles.title}>Shopping List</Text>
                        </View>

                        <ScrollView style={styles.scrollContainer}>
                            {uncheckedRecipes.map((recipe, index) => (
                                <View key={recipe.id} style={styles.recipeSection}>
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                    <View style={styles.ingredientsContainer}>
                                        {recipe.ingredients.map((ingredient: string, i: number) => (
                                            <View key={i} style={styles.ingredientItem}>
                                                <Text style={styles.ingredientText}>• {ingredient}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                            
                            {uncheckedRecipes.length === 0 && (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No ingredients needed!</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: theme.colors.paper,
        marginTop: 50,
        borderTopLeftRadius: theme.borderRadius.lg,
        borderTopRightRadius: theme.borderRadius.lg,
        ...theme.shadows.medium,
    },
    innerContainer: {
        flex: 1,
        padding: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        position: 'relative',
    },
    backButton: {
        padding: theme.spacing.md,
        marginLeft: -theme.spacing.sm,
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.full,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.small,
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        textAlign: 'center',
        marginLeft: -24,
    },
    scrollContainer: {
        flex: 1,
    },
    recipeSection: {
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.small,
    },
    recipeName: {
        fontSize: 20,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.sm,
    },
    ingredientsContainer: {
        backgroundColor: theme.colors.paper,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
    },
    ingredientItem: {
        marginBottom: theme.spacing.xs,
    },
    ingredientText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
        lineHeight: 24,
    },
    emptyContainer: {
        padding: theme.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.small,
    },
    emptyText: {
        fontSize: 18,
        fontFamily: theme.fonts.script,
        color: theme.colors.secondary,
        textAlign: 'center',
    },
}); 