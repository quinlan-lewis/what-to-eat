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
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RecipesContext } from '@/app/(tabs)/_layout';
import { KitchenContext } from '@/app/(tabs)/_layout';
import { SearchBar } from './SearchBar';

type UpdateKitchenPageProps = {
    visible: boolean;
    onClose: () => void;
}

export const UpdateKitchenPage: React.FC<UpdateKitchenPageProps> = ({ visible, onClose }) => {
    const { recipes } = useContext(RecipesContext);
    const { kitchenRecipes, setKitchenRecipes } = useContext(KitchenContext);
    const [selectedRecipes, setSelectedRecipes] = useState<any[]>([]);
    const [showRandomOptions, setShowRandomOptions] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (visible) {
            setSelectedRecipes(kitchenRecipes);
        }
    }, [visible]);

    const isSelected = (recipeId: string) => {
        return selectedRecipes.some(recipe => recipe.id === recipeId);
    };

    const toggleRecipeSelection = (recipe: any) => {
        if (isSelected(recipe.id)) {
            setSelectedRecipes(prev => 
                prev.filter(selectedRecipe => selectedRecipe.id !== recipe.id)
            );
            setShowWarning(false);
        } else {
            if (selectedRecipes.length >= selectedNumber) {
                setShowWarning(true);
                return;
            }
            setSelectedRecipes(prev => [...prev, { ...recipe, checked: false }]);
        }
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
                        <Text style={styles.title}>Update Kitchen</Text>
                        <TouchableOpacity 
                            style={[
                                styles.counterContainer,
                                selectedRecipes.length > selectedNumber && styles.counterWarning
                            ]}
                            onPress={() => setShowRandomOptions(true)}
                        >
                            <Text style={styles.counter}>
                                {selectedRecipes.length}/{selectedNumber}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {showWarning && (
                        <View style={styles.warningContainer}>
                            <Text style={styles.warningText}>
                                You've planned too many meals!
                            </Text>
                        </View>
                    )}
                    
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    
                    <ScrollView style={styles.scrollContainer}>
                        {filteredAndSortedRecipes.map((recipe: any) => (
                            <TouchableOpacity
                                key={recipe.id}
                                style={styles.recipeItem}
                                onPress={() => toggleRecipeSelection(recipe)}
                            >
                                <Text style={styles.recipeName}>• {recipe.name}</Text>
                                <View style={[
                                    styles.checkbox,
                                    isSelected(recipe.id) && styles.checkboxChecked
                                ]}>
                                    {isSelected(recipe.id) && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.clearButton}
                            onPress={clearSelection}
                        >
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.randomButton}
                            onPress={selectRandomRecipes}
                        >
                            <Text style={styles.randomButtonText}>Random {selectedNumber}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>

                    <RNModal
                        animationType="slide"
                        transparent={true}
                        visible={showRandomOptions}
                        onRequestClose={() => setShowRandomOptions(false)}
                    >
                        <View style={styles.pickerModalOverlay}>
                            <View style={styles.pickerModalContent}>
                                <View style={styles.pickerHeader}>
                                    <Text style={styles.pickerTitle}>
                                        Select Number of Recipes
                                    </Text>
                                </View>
                                
                                <Picker
                                    selectedValue={selectedNumber}
                                    onValueChange={(value) => setSelectedNumber(value)}
                                    style={styles.picker}
                                >
                                    {pickerItems.map((num) => (
                                        <Picker.Item 
                                            key={num} 
                                            label={`${num} Recipe${num > 1 ? 's' : ''}`} 
                                            value={num} 
                                        />
                                    ))}
                                </Picker>

                                <View style={styles.pickerButtons}>
                                    <TouchableOpacity 
                                        style={[styles.pickerButton, styles.cancelButton]}
                                        onPress={() => setShowRandomOptions(false)}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.pickerButton, styles.selectButton]}
                                        onPress={() => setShowRandomOptions(false)}
                                    >
                                        <Text style={styles.selectButtonText}>Select</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </RNModal>
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
        justifyContent: 'space-between',
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
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    recipeName: {
        fontSize: 18,
        color: '#007AFF',
        flex: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        justifyContent: 'center',
    },
    clearButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FF3B30',
        backgroundColor: 'white',
    },
    clearButtonText: {
        color: '#FF3B30',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    randomButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
        backgroundColor: 'white',
    },
    randomButtonText: {
        color: '#007AFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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
    pickerModalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pickerModalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    pickerHeader: {
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    pickerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    picker: {
        height: 200,
    },
    pickerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10,
    },
    pickerButton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    selectButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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
    counterWarning: {
        backgroundColor: '#FF3B30',
    },
});
