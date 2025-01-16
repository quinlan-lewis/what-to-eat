import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IconSymbol } from './IconSymbol';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ 
    value, 
    onChangeText, 
    placeholder = "Search recipes..." 
}) => {
    return (
        <View style={styles.container}>
            <IconSymbol name="magnifyingglass" size={20} color="#666" />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#000',
    },
});
