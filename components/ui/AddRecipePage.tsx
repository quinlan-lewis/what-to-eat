import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    SafeAreaView, 
    Modal, 
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { theme } from '@/constants/theme';

type AddRecipePageProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (recipe: {
        name: string;
        ingredients: string[];
        instructions: string;
    }) => void;
}

export const AddRecipePage: React.FC<AddRecipePageProps> = ({ visible, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState('');

    const addIngredient = () => {
        if (currentIngredient.trim()) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        if (name.trim() && ingredients.length > 0 && instructions.trim()) {
            onSave({
                name: name.trim(),
                ingredients,
                instructions: instructions.trim()
            });
            // Reset form
            setName('');
            setIngredients([]);
            setInstructions('');
            onClose();
        }
    };

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
                            <Text style={styles.title}>Add New Recipe</Text>
                        </View>
                        
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Recipe Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter recipe name"
                                />
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ingredients</Text>
                                <View style={styles.ingredientInput}>
                                    <TextInput
                                        style={[styles.input, { flex: 1 }]}
                                        value={currentIngredient}
                                        onChangeText={setCurrentIngredient}
                                        placeholder="Add an ingredient"
                                        onSubmitEditing={addIngredient}
                                    />
                                    <TouchableOpacity 
                                        style={styles.addButton}
                                        onPress={addIngredient}
                                    >
                                        <Text style={styles.addButtonText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                                {ingredients.map((ingredient, index) => (
                                    <View key={index} style={styles.ingredientItem}>
                                        <Text style={styles.listItem}>• {ingredient}</Text>
                                        <TouchableOpacity onPress={() => removeIngredient(index)}>
                                            <Text style={styles.removeText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Instructions</Text>
                                <TextInput
                                    style={[styles.input, styles.instructionsInput]}
                                    value={instructions}
                                    onChangeText={setInstructions}
                                    placeholder="Enter cooking instructions"
                                    multiline
                                    numberOfLines={4}
                                />
                            </View>

                            <TouchableOpacity 
                                style={styles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>Save Recipe</Text>
                            </TouchableOpacity>
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
    title: {
        flex: 1,
        fontSize: 28,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        textAlign: 'center',
        marginLeft: -24,  // Compensate for back button to center title
    },
    scrollContainer: {
        flex: 1,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        marginBottom: theme.spacing.sm,
    },
    input: {
        backgroundColor: theme.colors.paperDark,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
        ...theme.shadows.small,
    },
    ingredientInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    addButton: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.small,
    },
    addButtonText: {
        color: theme.colors.paper,
        fontFamily: theme.fonts.script,
        fontSize: 16,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.subtle,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.sm,
        marginBottom: theme.spacing.xs,
    },
    listItem: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
        flex: 1,
    },
    removeText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        paddingHorizontal: theme.spacing.sm,
    },
    instructionsInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        ...theme.shadows.medium,
    },
    saveButtonText: {
        color: theme.colors.paper,
        fontSize: 18,
        fontFamily: theme.fonts.script,
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
});
