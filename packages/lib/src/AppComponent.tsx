import { Box, FormControl, FormHelperText, FormLabel, HopeProvider, Input } from '@hope-ui/solid';
import type { Component } from 'solid-js';
import { useAppContext } from './AppProvider';

const AppComponent: Component = () => {
  const appContext = useAppContext();
  setInterval(() => {
    console.log('VALUE: ', appContext.context().parameters.sampleProperty.raw);
  }, 1000)
  return (
    <HopeProvider>
      <Box>
        <FormControl required>
          <FormLabel for="text">Input Component</FormLabel>
          <Input id="text" type="text" value={appContext.context().parameters.sampleProperty.raw} />
          <FormHelperText>This is text helper.</FormHelperText>
        </FormControl>
      </Box>
    </HopeProvider>
  );
};

export default AppComponent;
