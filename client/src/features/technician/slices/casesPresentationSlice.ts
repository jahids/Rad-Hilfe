import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongoose';

export interface TabularCase {
	'Case No': string;
	'Case Type': string;
	Status: string;
	'Client Name': string;
	'Date Created': Date | string;
	'Bicycle Health': Number;
	'Case Id': ObjectId | string;
}

const initialState: TabularCase[] = [
	{
		'Case No': '',
		'Case Type': '',
		Status: '',
		'Client Name': '',
		'Date Created': '',
		'Bicycle Health': 0,
		'Case Id': '',
	},
];

const casesPresentationSlice = createSlice({
	name: 'presentableCases',
	initialState,
	reducers: {
		createPresentableCases: (state, action) => [...action.payload],
		updatePresentableCaseStatus: (state, action: PayloadAction<{ index: number; status: string }>) => {
			const { index, status } = action.payload;
			state[index].Status = status;
		},
	},
});

export const { createPresentableCases, updatePresentableCaseStatus } = casesPresentationSlice.actions;
export default casesPresentationSlice.reducer;
