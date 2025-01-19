import React, { useContext, useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    SafeAreaView, 
    Modal, 
    TouchableOpacity, 
    Modal as RNModal,
    Alert,
    TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RecipesContext, KitchenContext } from '@/app/(tabs)/_layout';
import { theme } from '@/constants/theme';
import { SearchBar } from './SearchBar';
import { Recipe, MealType } from '@/types/Recipe';

type UpdateKitchenPageProps = {
    visible: boolean;
    onClose: () => void;
}

export const UpdateKitchenPage: React.FC<UpdateKitchenPageProps> = ({ visible, onClose }) => {
    const { recipes } = useContext(RecipesContext);
    const { kitchenRecipes, setKitchenRecipes } = useContext(KitchenContext);
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
    const [showRandomOptions, setShowRandomOptions] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [selectedMealType, setSelectedMealType] = useState<MealType>('dinner');

    useEffect(() => {
        if (visible) {
            setSelectedRecipes(kitchenRecipes);
        }
    }, [visible]);

    const isSelected = (recipeId: string) => {
        return selectedRecipes.some(recipe => recipe.id === recipeId);
    };

    const toggleRecipeCheck = (recipeId: string) => {
        const updatedRecipes = kitchenRecipes.filter(recipe => recipe.id !== recipeId);
        setKitchenRecipes(updatedRecipes);
    };

    const handleSave = () => {
        setKitchenRecipes(selectedRecipes);
        onClose();
    };

    const selectRandomRecipes = () => {
        const shuffled = [...recipes].sort(() => 0.5 - Math.random());
        const randomSelection = shuffled.slice(0, Math.min(selectedNumber, recipes.length));
        setSelectedRecipes(randomSelection.map(recipe => ({ ...recipe, checked: false })));
        setShowWarning(false);
    };

    const pickerItems = Array.from(
        { length: recipes.length }, 
        (_, i) => i + 1
    );

    // Filter recipes based on search
    const filteredAndSortedRecipes = [...recipes]
        .filter(recipe => 
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const aSelected = isSelected(a.id);
            const bSelected = isSelected(b.id);
            if (aSelected === bSelected) return 0;
            return aSelected ? -1 : 1;
        });

    const clearSelection = () => {
        setSelectedRecipes([]);
        setShowWarning(false);
    };

    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

    const addRecipe = () => {
        if (recipeName.trim() === '') return;

        const newRecipe: Recipe = {
            id: Date.now().toString(),
            name: recipeName,
            ingredients: ingredients.filter(i => i.trim() !== ''),
            instructions: '',
            mealType: selectedMealType,
            checked: false
        };

        setKitchenRecipes(prevRecipes => [...prevRecipes, newRecipe]);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setRecipeName('');
        setIngredients(['']);
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

    const toggleRecipeSelection = (recipe: Recipe) => {
        const isSelected = selectedRecipes.some(r => r.id === recipe.id);
        if (isSelected) {
            setSelectedRecipes(selectedRecipes.filter(r => r.id !== recipe.id));
        } else {
            setSelectedRecipes([...selectedRecipes, recipe]);
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
                            <Text style={styles.title}>Update Kitchen</Text>
                        </View>

                        <ScrollView style={styles.scrollContainer}>
                            {filteredAndSortedRecipes.map((recipe: any) => (
                                <TouchableOpacity
                                    key={recipe.id}
                                    style={[
                                        styles.recipeCard,
                                        isSelected(recipe.id) && styles.selectedCard
                                    ]}
                                    onPress={() => toggleRecipeSelection(recipe)}
                                >
                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                    {isSelected(recipe.id) && (
                                        <IconSymbol 
                                            name="xmark" 
                                            size={20} 
                                            color={theme.colors.success} 
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
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
    recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.paperDark,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadows.small,
    },
    selectedCard: {
        backgroundColor: theme.colors.subtle,
        borderColor: theme.colors.success,
        borderWidth: 1,
    },
    recipeName: {
        fontSize: 18,
        fontFamily: theme.fonts.script,
        color: theme.colors.ink,
        flex: 1,
    },
    warningContainer: {
        backgroundColor: '#FFE5E5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    warningText: {
        color: '#FF3B30',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    counterContainer: {
        backgroundColor: '#007AFF',
        borderRadius: 15,
        minWidth: 45,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    counter: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    counterWarning: {
        backgroundColor: '#FF3B30',
    },
});
