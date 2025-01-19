import React, { useContext } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Recipe } from '@/types/Recipe';
import { theme } from '@/constants/theme';
import { KitchenContext } from '../../app/(tabs)/_layout';

interface Props {
    recipe: Recipe;
    visible: boolean;
    onClose: () => void;
}

export const RecipeModal: React.FC<Props> = ({ recipe, visible, onClose }) => {
    const { kitchenRecipes, setKitchenRecipes } = useContext(KitchenContext);
    const isInKitchen = kitchenRecipes.some(r => r.id === recipe?.id);

    const toggleKitchen = (recipe: Recipe) => {
        if (isInKitchen) {
            setKitchenRecipes(prevRecipes => 
                prevRecipes.filter(r => r.id !== recipe.id)
            );
        } else {
            setKitchenRecipes(prevRecipes => [...prevRecipes, recipe]);
        }
    };

    return (
        <Modal
            visible={visible && recipe !== null}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.modalContainer} 
                activeOpacity={1} 
                onPress={onClose}
            >
                <TouchableOpacity 
                    style={styles.modalContent} 
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Text style={styles.title}>{recipe?.name}</Text>
                    <Text style={styles.mealType}>
                        {recipe?.mealType ? 
                            recipe.mealType.charAt(0).toUpperCase() + recipe.mealType.slice(1) 
                            : 'No meal type'}
                    </Text>

                    <ScrollView style={styles.scrollContainer}>
                        <Text style={styles.sectionTitle}>Ingredients:</Text>
                        {recipe?.ingredients.map((ingredient, index) => (
                            <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
                        ))}

                        <Text style={[styles.sectionTitle, styles.instructionsTitle]}>Instructions:</Text>
                        <Text style={styles.instructions}>{recipe?.instructions || 'No instructions provided'}</Text>
                    </ScrollView>

                    <TouchableOpacity 
                        style={[
                            styles.kitchenButton,
                            isInKitchen && styles.removeButton
                        ]}
                        onPress={() => toggleKitchen(recipe)}
                    >
                        <Text style={styles.buttonText}>
                            {isInKitchen ? 'Remove from Kitchen' : 'Add to Kitchen'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: theme.colors.paper,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
    },
    title: {
        fontSize: 24,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.xs,
    },
    mealType: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.secondary,
        marginBottom: theme.spacing.md,
    },
    scrollContainer: {
        maxHeight: '70%',
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.sm,
    },
    instructionsTitle: {
        marginTop: theme.spacing.lg,
    },
    ingredient: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
        marginBottom: theme.spacing.xs,
        paddingLeft: theme.spacing.sm,
    },
    instructions: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
        lineHeight: 24,
        marginBottom: theme.spacing.lg,
    },
    closeButton: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    kitchenButton: {
        backgroundColor: theme.colors.success,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginVertical: theme.spacing.md,
    },
    removeButton: {
        backgroundColor: theme.colors.error,
    },
    buttonText: {
        color: theme.colors.paper,
        fontSize: 16,
        fontFamily: theme.fonts.script,
    },
}); 