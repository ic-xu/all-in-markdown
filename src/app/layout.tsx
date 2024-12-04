import { PluginManagerProvider } from '@/app/contexts/PluginManagerContext';
import { ThemeProvider } from '@/app/themes/ThemeContext';
import '@/app/styles/globals.css';
import './globals.css';

export const metadata = {
  title: 'Markdown Editor',
  description: 'A powerful markdown editor with file system integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen">
      <body className="h-full">
        <PluginManagerProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </PluginManagerProvider>
      </body>
    </html>
  );
}