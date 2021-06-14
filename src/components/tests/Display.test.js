import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import mockFetchShow from '../../api/fetchShow'
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import { testShow } from './Show.test';

jest.mock('../../api/fetchShow')

test("renders Display with no errors", () => {
    render(<Display />)
})


test('On fetch button press, show component appears', async () => {
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow);
    const fetchButton = screen.queryByRole('button');
    userEvent.click(fetchButton);
    expect(await screen.findByTestId('show-container')).toBeInTheDocument();

})


test('On fetch button press, select options match test seasons.', async () => {
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow);
    const fetchButton = screen.queryByRole('button');
    userEvent.click(fetchButton);
    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons).toHaveLength(testShow.seasons.length)
})

test('Verify DisplayFunc is valled on press', async () => {
    const myDisplayFunc = jest.fn();
    render(<Display displayFunc={myDisplayFunc}/>)
    mockFetchShow.mockResolvedValueOnce(testShow);
    const fetchButton = screen.queryByRole('button');
    userEvent.click(fetchButton);

    await waitFor(() => {
		expect(myDisplayFunc).toHaveBeenCalled();
	});
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.