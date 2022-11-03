import { Box, FormControl, FormHelperText, FormLabel, HopeProvider, Input } from '@hope-ui/solid';
import type { Component } from 'solid-js';
import { useAppContext } from './AppProvider';

const AppComponent: Component = () => {
  const appContext = useAppContext();
  return (
    <HopeProvider>
      <Box>
        <FormControl required>
          <FormLabel for="text">Name</FormLabel>
          <Input id="text" type="text" value={appContext.context().parameters.name.raw} />
          <FormHelperText>Product name.</FormHelperText>
        </FormControl>
        <FormControl required>
          <FormLabel for="text">Price</FormLabel>
          <Input id="text" type="text" value={appContext.context().parameters.price.raw} />
          <FormHelperText>Product price.</FormHelperText>
        </FormControl>
      </Box>
    </HopeProvider>
  );
};

export default AppComponent;
