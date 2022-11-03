import { Box, FormControl, FormHelperText, FormLabel, HopeProvider, Input } from '@hope-ui/solid';
import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <HopeProvider>
      <Box>
        <FormControl required>
          <FormLabel for="email">Email address</FormLabel>
          <Input id="email" type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
    </HopeProvider>
  );
};

export default App;
