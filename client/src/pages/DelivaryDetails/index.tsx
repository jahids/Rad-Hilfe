import { Box, Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { bicycleParts, delivery } from '../../features/cyclist/order-slice';
import { time } from '../../features/cyclist/order-slice';
import { getPlan, order } from '../../services/order';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { profile } from '../../services/authentication';
interface Slots {
  id: any;
  day: string;
  time: string;
  chosen: boolean;
}
const DelivaryDetails = () => {
  const dispatch = useAppDispatch();

  const [slots, setSlots] = useState<Slots[]>([]);
  const [name, setName] = useState('');

  const [carePlan, setCarePlan] = useState('Basic');

  useEffect(() => {
    const getData = async () => {
      const planService = await getPlan();
      const plan = planService;

      setCarePlan(plan);
    };

    getData();
  }, []);

  const deliverySlots = [
    {
      id: 1,
      day: 'Thurs 23 Aug',
      time: '17:00 - 18:00',
      chosen: false,
    },
    {
      id: 2,
      day: 'Thurs 23 Aug',
      time: '19:00 - 20:00',
      chosen: false,
    },
    {
      id: 3,
      day: 'Fri 24 Aug',
      time: '19:00 - 20:00',
      chosen: false,
    },
    {
      id: 4,
      day: 'Fri 24 Aug',
      time: '19:00 - 20:00',
      chosen: false,
    },
  ];
  useEffect(() => {
    const getData = async () => {
      const cyclist = await profile();

      setName(cyclist.name);
      console.log(profile);
    };
    getData();

    setSlots(deliverySlots);
  }, []);
  const handleSlotClick = (slot: Slots) => {
    setSlots((prevSlots) => {
      const updatedSlots = prevSlots.map((s) => ({
        ...s,
        chosen: s.id === slot.id ? true : false,
      }));
      const chosenTime = updatedSlots.filter((item) => item.chosen).map((item) => item.time);
      const slotObj = { slot: chosenTime[0] };

      dispatch(time(slotObj));

      return updatedSlots;
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const dataObj = {
      [name]: value,
    };

    dispatch(delivery(dataObj));
  };

  const totalPrice = useAppSelector((state) => state.order.totalPrice);
  let orderForCase = useAppSelector((state) => state.order);

  const handleClick = () => {
    const fetchData = async () => {
      const orderCase = await order(orderForCase);
      const orderId = orderCase._id;
      localStorage.setItem('orderId', orderId);
      // dispatch(bicycleParts(subpartsArray))
      // console.log('passiveCase', orderCase);
    };
    fetchData();
  };
  return (
    <Box p={4} mt={'-10'}>
      <Stack spacing={6} mt={20}>
        <Heading color={'accent'} fontSize={'1.25rem'}>
          Delivery details
        </Heading>
        <Text
          p={2}
          color={'accent'}
          fontSize={''}
          fontWeight={'semibold'}
          opacity={'80%'}
          border={'2px solid'}
          borderRadius={'10px'}
          borderColor={'accent'}
        >
          {name}
        </Text>
        <InputField
          id='deliveryaddress'
          isRequired={true}
          type='text'
          placeholder='Delivery address'
          onChange={handleChange}
          name='deliveryAddress'
          borderColor='accent'
          _placeholder={{ color: 'accent', opacity: '60%' }}
          color={'accent'}
          borderRadius={''}
        />{' '}
        <InputField
          id='contactnumber'
          isRequired={true}
          type='text'
          placeholder='Contact number'
          onChange={handleChange}
          name='contactNumber'
          borderColor='accent'
          _placeholder={{ color: 'accent', opacity: '60%' }}
          color={'accent'}
          borderRadius={''}
        />{' '}
        <InputField
          id='note'
          isRequired={true}
          type='text'
          placeholder='Note for delivery driver'
          onChange={handleChange}
          name='note'
          borderColor='accent'
          _placeholder={{ color: 'accent', opacity: '60%' }}
          color={'accent'}
          borderRadius={''}
        />
      </Stack>
      <Text my={5} color={'accent'} fontSize={'xl'} fontWeight={'600'}>
        Choose your delivery slot
      </Text>
      <Flex flexWrap='wrap' gap={4}>
        {slots.map((slot, index) => (
          <Box
            onClick={() => handleSlotClick(slot)}
            bg={slot.chosen ? 'accent' : 'secondary'}
            key={index}
            px={3}
            py={4}
            color={slot.chosen ? 'secondary' : 'accent'}
            border={'1px solid '}
            width='calc(50% - 8px)'
            borderColor={'accent'}
            borderRadius={'1rem'}
          >
            <Center>
              {' '}
              <Text>{slot.day}</Text>
            </Center>
            <Center>
              <Text fontWeight={'500'} fontSize={'xl'}>
                {slot.time}
              </Text>
            </Center>
          </Box>
        ))}
      </Flex>
      <ChakraLink as={ReactRouterLink} to='/expert-call'>
        <Center marginTop={'3rem'}>
          <Button
            onClick={handleClick}
            loadingText='Submitting'
            size='lg'
            bg='accent'
            w='14rem'
            color='secondary'
            // mt={'20px'}
            borderRadius={16}
            fontWeight={'700'}
          >
            Buy now | €{carePlan === 'Slipstream' ? 0 : totalPrice}
          </Button>
        </Center>
      </ChakraLink>
    </Box>
  );
};

export default DelivaryDetails;
