import { MaterialIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerLabelStyle: {
              marginLeft: -16,
            },
            headerTintColor: isDark ? '#fff' : '#000',
            drawerActiveTintColor: '#0066cc',
            drawerInactiveTintColor: isDark ? '#999' : '#666',
            drawerStyle: {
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
            },
            headerStyle: {
              backgroundColor: isDark ? '#1a1a1a' : '#fff',
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'Flickr Gallery',
              drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
