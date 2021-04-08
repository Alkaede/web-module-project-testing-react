import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import mockFetchShow from './../../api/fetchShow';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

jest.mock('./../../api/fetchShow.js');

const testShow = {
  //add in approprate test data structure here.
  name: 'Testo',
  summary: 'man this is crazy',
  seasons: [
      {
          id: 0,
          name:'Testo',
          episodes: []
      },
      {
          id: 1,
          name:'Testo Deux',
          episodes: []
      }
  ],
}

test('render display component without errors', () => {
  render(<Display />);
})

// no idea why this isnt working
// fixed it by having mockFetchShow NOT in {} for import
test('show component will display when fetch button is pressed', async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);

  const btn = screen.getByRole('button');
  userEvent.click(btn);

  await waitFor(()=>{
    const show = screen.getByTestId('show-container');
    expect(show).toBeInTheDocument();
  })

  // const show = await screen.findByTestId("show-container");
	// expect(show).toBeInTheDocument();
})

test('amount of select options rendered is equal to seasons in test data when fetch button is called', async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);

  const btn = screen.getByRole('button');
  userEvent.click(btn);
  
  await waitFor(()=>{
    const seasonOptions = screen.queryAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(2);
  })
})

test('display function is called when fetch button is pressed', async () => {
	mockFetchShow.mockResolvedValueOnce(testShow);
	const displayFunc = jest.fn();

	render(<Display displayFunc={displayFunc} />);
	const button = screen.getByRole("button");
	userEvent.click(button);

	await waitFor(() => {
		expect(displayFunc).toHaveBeenCalled();
	})
})


///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.