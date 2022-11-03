import { Box, FormControl, FormHelperText, FormLabel, HopeProvider, Input } from '@hope-ui/solid';
import { Component, createEffect, createMemo, createSignal, on } from 'solid-js';
import { useAppContext } from './AppProvider';

const AppEntry: Component = () => {
  const { 
    rawInputs: {
      name, price
    }, 
    outputs,
    setOutputs,
  } = useAppContext();
  const [quantity, setQuantity] = createSignal(0);
  const invoiceAmount = createMemo(() => price() * quantity());
  createEffect(on(invoiceAmount, (invoiceAmount) => {
    setOutputs((state) => ({
      ...state,
      invoiceAmount,
    }));
  }));

  return (
    <HopeProvider>
      <Box>
        <FormControl required>
          <FormLabel for="name">Name</FormLabel>
          <Input id="name" type="text" value={name()} />
          <FormHelperText>Product name.</FormHelperText>
        </FormControl>
        <FormControl required>
          <FormLabel for="price">Price</FormLabel>
          <Input id="price" type="text" value={price()} />
          <FormHelperText>Product price.</FormHelperText>
        </FormControl>
        <FormControl required>
          <FormLabel for="quantity">Quantity</FormLabel>
          <Input id="quantity" type="number" value={quantity()} onChange={(ev) => setQuantity(parseInt(ev.currentTarget.value))} />
          <FormHelperText>Product quantity.</FormHelperText>
        </FormControl>
        <p>Result:</p>
        <p>{JSON.stringify(outputs())}</p>
      </Box>
    </HopeProvider>
  );
};

export default AppEntry;
