import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Modal, 
    SafeAreaView, 
    TouchableOpacity, 
    ScrollView,
    Share
} from 'react-native';
import { IconSymbol } from './IconSymbol';

type IngredientListModalProps = {
    visible: boolean;
    onClose: () => void;
    recipes: any[];
}

export const IngredientListModal: React.FC<IngredientListModalProps> = ({ 
    visible, 
    onClose, 
    recipes 
}) => {
    const allIngredients = recipes.reduce((acc: string[], recipe) => {
        return [...acc, ...recipe.ingredients];
    }, []);

    const shareIngredients = async () => {
        try {
            const message = `Shopping List:\n\n${allIngredients.map((ing: any) => `• ${ing}`).join('\n')}`;
            await Share.share({
                message,
            });
        } catch (error) {
            console.error('Error sharing ingredients:', error);
        }
    };

    return (
        <Modal
            animationType="slide"
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
                        <Text style={styles.title}>Shopping List</Text>
                    </View>

                    <ScrollView style={styles.scrollContainer}>
                        {allIngredients.map((ingredient:any, index:any) => (
                            <Text key={index} style={styles.ingredient}>
                                • {ingredient}
                            </Text>
                        ))}
                    </ScrollView>

                    <TouchableOpacity 
                        style={styles.shareButton}
                        onPress={shareIngredients}
                    >
                        <Text style={styles.shareButtonText}>Share List</Text>
                    </TouchableOpacity>
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
    ingredient: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    shareButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    shareButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 