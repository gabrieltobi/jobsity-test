import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('add new reminder', () => {
  const { getByText, getByTestId } = render(<App />);
  const day = getByTestId('day-15')
  day.click();

  const reminder = getByTestId('reminder')
  fireEvent.change(reminder, { target: { value: 'test-reminder' } })

  const city = getByTestId('city')
  fireEvent.change(city, { target: { value: 'Brasília' } })

  const time = getByTestId('time')
  fireEvent.change(time, { target: { value: '12:34' } })

  const color = getByTestId('color')
  fireEvent.change(color, { target: { value: '#ffffff' } })

  fireEvent.submit(getByTestId('form'));

  const testReminderElement = getByText(/test-reminder/i);
  expect(testReminderElement).toBeInTheDocument();
});
