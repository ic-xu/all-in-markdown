import { PluginManagerProvider } from '@/app/contexts/PluginManagerContext';
import '@/app/styles/globals.css';

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
    <html lang="en" className='h-screen'>
      <body>
        <PluginManagerProvider>
          {children}
        </PluginManagerProvider>
      </body>
    </html>
  );
}