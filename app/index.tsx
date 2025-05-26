import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the login screen
  return <Redirect href="/(auth)/login" />;
}