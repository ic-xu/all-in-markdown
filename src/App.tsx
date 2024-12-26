import {AuthProvider} from './context/AuthContext';
import {XMPPProvider} from './context/XMPPContext';
// import {ThemeProvider} from './context/ThemeContext';
import { ThemeProvider } from '@/themes/ThemeContext';
import LoginPage from './pages/LoginPage';
import {useAuth} from './context/AuthContext';
import React from 'react';
import HomePage from "@/pages/HomePage";
import {PluginManagerProvider} from '@/context/PluginManagerContext';

const AppContent: React.FC = () => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <HomePage/> : <LoginPage/>;
};

function App() {
    return (
        <PluginManagerProvider>
            <ThemeProvider>
                <AuthProvider>
                    <XMPPProvider>
                        <AppContent/>
                    </XMPPProvider>
                </AuthProvider>
            </ThemeProvider>
        </PluginManagerProvider>
    );
}

export default App;