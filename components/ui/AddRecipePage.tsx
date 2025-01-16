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
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <IconSymbol name="chevron.left" size={24} color="black" />
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
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: -1,
    },
    scrollContainer: {
        flex: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    ingredientInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    listItem: {
        fontSize: 16,
        color: 'black',
        flex: 1,
    },
    removeText: {
        color: '#FF3B30',
        fontSize: 14,
    },
    instructionsInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
