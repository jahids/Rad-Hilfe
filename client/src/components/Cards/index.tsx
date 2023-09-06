import { Box, Card, Center, CircularProgress, Flex, Text } from '@chakra-ui/react';
import HealthRadialChart from '../../components/HealthRadialChart';

const setCard = ({
  health,
  name,
  w,
  h,
  bg,
  py,
  px,
  color,
  textStyle,
  fontWeight,
  fontSize,
}: {
  health?: number;
  name: string;
  w: string;
  h: string;
  bg: string;
  color: string;
  textStyle: string;
  py: string;
  px: string;
  fontWeight: string;
  fontSize: string;
}) => {
  return (
    <Card
      w={w}
      h={h}
      color={color}
      bg={bg}
      fontSize={fontSize}
      fontWeight={fontWeight}
      sx={{ borderRadius: '20px' }}
    >
      {name === 'My bike health' ? (
        <>
          <Flex justifyContent='space-between' alignItems='center' mt={'.20rem'}>
            <Text textStyle={textStyle} px={px} py={py}>
              {' '}
              {name}
            </Text>

            <Text fontSize={'1rem'} position={'absolute'} right={'43px'}>
              {health}%
            </Text>

            <CircularProgress color={'#001F3F'} value={health} size='5.5rem' mr={5} />
          </Flex>
        </>
      ) : (
        <Text textAlign={'left'} textStyle={textStyle} px={px} py={py}>
          {' '}
          {name}
        </Text>
      )}
    </Card>
  );
};

export default setCard;
