export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    mealType: MealType;
    checked: boolean;
} 