export const ADD_THEME: string = 'ADD_THEME';

export const addTheme = (data: string) => {
    return {
        type: ADD_THEME,
        payload: data
    };
};
