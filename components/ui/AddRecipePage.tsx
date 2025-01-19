import React, { useContext, useState } from 'react';
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
import { RecipesContext } from '../../app/(tabs)/_layout';
import { Recipe, MealType } from '../../types/Recipe';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const AddRecipePage: React.FC<Props> = ({ visible, onClose }) => {
    const { recipes, setRecipes } = useContext(RecipesContext);
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState('');
    const [selectedMealType, setSelectedMealType] = useState<MealType>('dinner');

    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

    const handleSave = () => {
        if (recipeName.trim() === '') return;

        const newRecipe: Recipe = {
            id: Date.now().toString(),
            name: recipeName,
            ingredients: ingredients.filter(i => i.trim() !== ''),
            instructions: instructions.trim(),
            mealType: selectedMealType,
            checked: false
        };

        setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setRecipeName('');
        setIngredients(['']);
        setInstructions('');
        setSelectedMealType('dinner');
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const updateIngredient = (text: string, index: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = text;
        setIngredients(newIngredients);
    };

    return (
        <Modal
            animationType="slide"
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
                                    value={recipeName}
                                    onChangeText={setRecipeName}
                                    placeholder="Enter recipe name"
                                />
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ingredients</Text>
                                <View style={styles.ingredientInput}>
                                    <TextInput
                                        style={[styles.input, { flex: 1 }]}
                                        value={ingredients[0]}
                                        onChangeText={(text) => updateIngredient(text, 0)}
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
                                        <TouchableOpacity onPress={() => updateIngredient('', index)}>
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
                                    placeholder="Enter preparation instructions"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Meal Type</Text>
                                <View style={styles.mealTypeSelector}>
                                    {mealTypes.map((mealType) => (
                                        <TouchableOpacity
                                            key={mealType}
                                            style={selectedMealType === mealType ? styles.selectedMealType : styles.mealType}
                                            onPress={() => setSelectedMealType(mealType)}
                                        >
                                            <Text style={styles.mealTypeText}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={onClose}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.button, styles.saveButton]}
                                    onPress={handleSave}
                                >
                                    <Text style={styles.buttonText}>Save Recipe</Text>
                                </TouchableOpacity>
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
    mealTypeSelector: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    mealType: {
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.subtle,
    },
    mealTypeText: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
    },
    selectedMealType: {
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.accent,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.lg,
    },
    button: {
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.subtle,
        ...theme.shadows.small,
    },
    cancelButton: {
        backgroundColor: theme.colors.error,
    },
    saveButton: {
        backgroundColor: theme.colors.accent,
    },
    buttonText: {
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
    instructionsInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 8,
    },
});
