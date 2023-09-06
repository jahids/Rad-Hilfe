import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Box, Button, Center, Flex, Select, Text } from '@chakra-ui/react';
import { statusColor } from '../../data/statusColorDictionary';
import FullHealthBar from '../Bicycle Full Health Bar';
import { formatText } from './../../utils/formatText';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { createPresentableCases } from '../../features/technician/slices/casesPresentationSlice';
import { ChangeEvent } from 'react';

const TableComponent = ({ handleActionChange }: { handleActionChange: (input: string, index: number) => void }) => {
	const cases = useAppSelector((state: any) => state.presentableCases);
	const navigate = useNavigate();

	const handleChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
		event.preventDefault();
		const input = event.target.value;

		if (input) handleActionChange(input, index);
	};

	if (cases.length === 0) {
		return (
			<Text
				fontSize="1.5rem"
				textAlign="center"
				mt={8}>
				No cases found!
			</Text>
		);
	}

	return (
		<>
			<TableContainer
				bg="primary"
				borderRadius={'.5rem'}
				boxShadow={'0 .5rem .5rem 0 rgba(0, 0, 0, 0.25);'}
				overflow={'hidden'}>
				<Table
					variant="simple"
					size="md">
					<Thead
						bg={'#e2e8f0'}
						height={'8.5vh'}>
						<Tr>
							{Object.keys(cases[0]).map((header, index) => {
								if (header !== 'Case Id') {
									return (
										<>
											<Th
												maxWidth={'1vw'}
												p={'1vh 1vw 1vh 1vw'}
												key={index}
												borderBottom={'0'}
												textTransform="capitalize"
												letterSpacing={0}
												color="secondary"
												textAlign="center"
												fontFamily="Inter"
												fontSize="1.25rem"
												fontWeight="600"
												lineHeight="0.5rem">
												{header}
											</Th>
										</>
									);
								} else {
									return (
										<>
											<Th
												maxWidth={'1vw'}
												p={'1vh 1vw 1vh 1vw'}
												key={index}
												borderBottom={'0'}
												textTransform="capitalize"
												letterSpacing={0}
												color="secondary"
												textAlign="center"
												fontFamily="Inter"
												fontSize="1.25rem"
												fontWeight="600"
												lineHeight="0.5rem">
												Action
											</Th>
										</>
									);
								}
							})}
						</Tr>
					</Thead>
					<Tbody>
						{cases.map((Case: any, index1: number) => (
							<Tr key={index1}>
								{Object.values(Case).map((value, index2: number) => {
									if (typeof value === 'string' && index2 < 6) {
										return (
											<Td
												key={index2}
												p={'1rem 1rem 1rem 1rem'}
												w={'11.65vw'}
												borderBottom={'0'}>
												<Box
													bg={(statusColor as { [key: string]: string })[value] || 'transparent'}
													fontFamily="Inter"
													fontSize="1.20rem"
													fontStyle={'normal'}
													fontWeight={'400'}
													lineHeight={'2rem'}
													borderRadius={'1rem'}>
													<Center>{index2 === 2 ? <Text as="b">{formatText(value)}</Text> : <Text>{formatText(value)}</Text>}</Center>
												</Box>
											</Td>
										);
									} else if (typeof value === 'number') {
										return (
											<Td
												p={'1rem 1rem 1rem 1rem'}
												w={'11.65vw'}
												borderBottom={0}>
												<FullHealthBar health={value} />
											</Td>
										);
									} else {
										return (
											<Td
												w={'10vw'}
												p={'2.5vh 1vw 2.5vh 1vw'}
												key={index2}
												borderBottom={'0'}>
												<Flex
													justify={'center'}
													alignItems={'center'}>
													<Select
														variant="unstyled"
														_hover={{ background: '#d1fbbd', color: 'secondary', outlineColor: 'secondary' }}
														w={'20'}
														h={'10'}
														_placeholder={{ backgroundColor: 'white' }}
														size="md"
														fontFamily={'Inter'}
														fontSize={'1rem'}
														fontWeight={'600'}
														focusBorderColor="secondary"
														iconSize="25"
														textAlign={'end'}
														mr={2}
														borderRadius={15}
														bg={'secondary'}
														color={'accent'}
														onChange={(event) => handleChange(event, index1)}>
														<option
															value="Raised"
															style={{ backgroundColor: 'white' }}>
															Raise
														</option>
														<option
															value="Closed"
															style={{ backgroundColor: 'white' }}>
															Close
														</option>
													</Select>
													<Button
														onClick={() => navigate(`/individual-case/${value}`)}
														_hover={{ background: 'primary', color: 'secondary', outlineColor: 'third' }}
														w={'20'}
														h={'10'}
														size={'10'}
														bg={'third'}
														borderRadius={15}
														color={'secondary'}>
														View
													</Button>
												</Flex>
											</Td>
										);
									}
								})}
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default TableComponent;
