// import React, {createContext, useContext, useState, useEffect} from 'react';
// import {ThemeContextType, ThemeDefinition} from '@/themes/types';
// import {useEditorStore} from '@/store/editorStore';
// import {usePluginManager} from "@/hooks/usePluginManager";
// import {Sun} from "lucide-react";
//
// const defaultTheme: ThemeDefinition = {
//     id: 'default',
//     name: 'Default Theme',
//     icon: Sun,
//     styles: {
//         background: {
//             primary: 'bg-white',
//             secondary: 'bg-gray-50',
//             hover: 'hover:bg-gray-100',
//         },
//         text: {
//             primary: 'text-gray-900',
//             secondary: 'text-gray-600',
//             accent: 'text-blue-600',
//         },
//         border: {
//             primary: 'border-gray-200',
//             secondary: 'border-gray-300',
//         },
//     },
// }
//
// const ThemeContext = createContext<ThemeContextType>({
//   currentTheme: defaultTheme,
//   setTheme: () => { },
//   getThemeClass: () => '',
// });
//
//
// export const useTheme = () => useContext(ThemeContext);
//
// export function ThemeProvider({children}: { children: React.ReactNode }) {
//     const {theme: storeTheme, setTheme: setStoreTheme} = useEditorStore();
//     const pluginManager = usePluginManager();
//     const themes = pluginManager.getThemes();
//     const [currentTheme, setCurrentTheme] = useState<ThemeDefinition>(useTheme().currentTheme);
//
//     useEffect(() => {
//         console.log('storeTheme', themes.get(storeTheme));
//         const theme = themes.get(storeTheme) || defaultTheme;
//         setCurrentTheme(theme);
//         document.body.className = `${theme.id} bg-gradient-to-br from-background to-background-secondary min-h-screen`;
//     }, [storeTheme]);
//
//     const setTheme = (themeId: string) => {
//         setStoreTheme(themeId as 'default' | 'dark' | 'green');
//     };
//
//     const getThemeClass = (type: keyof ThemeDefinition['styles'], variant: string): string => {
//         return currentTheme.styles[type][variant as keyof typeof currentTheme.styles[typeof type]] || '';
//     };
//
//     return (
//         <ThemeContext.Provider value={{currentTheme, setTheme, getThemeClass}}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }