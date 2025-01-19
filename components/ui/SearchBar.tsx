import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { theme } from '@/constants/theme';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <IconSymbol name="magnifyingglass" size={20} color={theme.colors.ink} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search recipes..."
                placeholderTextColor={theme.colors.secondary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.paper,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        ...theme.shadows.small,
    },
    input: {
        flex: 1,
        marginLeft: theme.spacing.sm,
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.ink,
    },
});
