import React from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { theme } from '@/constants/theme';

type RecipePageProps = {
    recipe: {
        name: string;
        ingredients: string[];
        instructions: string;
    };
    visible: boolean;
    onClose: () => void;
}

export const RecipePage: React.FC<RecipePageProps> = ({ recipe, visible, onClose }) => {
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
                            <Text style={styles.title}>{recipe.name}</Text>
                        </View>

                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ingredients</Text>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <View key={index} style={styles.ingredientItem}>
                                        <Text style={styles.ingredientText}>• {ingredient}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Instructions</Text>
                                <View style={styles.instructionsContainer}>
                                    <Text style={styles.instructionsText}>{recipe.instructions}</Text>
                                </View>
                            </View>
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
    backButton: {
        padding: theme.spacing.sm,
        marginLeft: -theme.spacing.sm,
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
    section: {
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.md,
    },
    ingredientItem: {
        marginBottom: theme.spacing.sm,
        backgroundColor: theme.colors.paper,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
    },
    ingredientText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
    },
    instructionsContainer: {
        backgroundColor: theme.colors.paper,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.md,
    },
    instructionsText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
        lineHeight: 24,
    },
});
