import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Recipe = {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
}

type PopupProps = {
    visible: boolean;
    onClose: () => void;
    recipe: Recipe;
}

export const RecipePage: React.FC<PopupProps> = ({ visible, onClose, recipe }) => {
    return (
      <Modal
        animationType="fade" // Can be "slide", "fade", or "none"
        transparent={true}
        visible={visible}
        onRequestClose={onClose} // Handles back button on Android
      >
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose}>
                        <IconSymbol name="chevron.left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{recipe.name}</Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {recipe.ingredients.map((ingredient, index) => (
                            <Text key={index} style={styles.listItem}>• {ingredient}</Text>
                        ))}
                    </View>
                    
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        <Text style={styles.instructions}>{recipe.instructions}</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
      </Modal>
    );
  };

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
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
    listItem: {
        fontSize: 16,
        color: 'black',
        marginBottom: 8,
        paddingLeft: 8,
    },
    instructions: {
        fontSize: 16,
        color: 'black',
        lineHeight: 24,
        paddingLeft: 8,
    }
});
