import { render, screen, fireEvent } from '@testing-library/react';

import WordGameComponent, { ALPHABET } from '../WordGameComponent';

function clickLetter(letter) {
  const buttonElement = screen.getByTestId("button-alphabet-" + letter);
  fireEvent.click(buttonElement);
};

describe('AppWordGame', () => {

    it('renders div element of scores', () => {
      render(<WordGameComponent />);
      const divElement = screen.getByText(/Your scores are:/i);
      expect(divElement).toBeInTheDocument();
    });

    it('win text does not exist', () => {
      render(<WordGameComponent />);
      const divElement = screen.queryByTestId("win-element");
      expect(divElement).toBeNull();
    });

    it('renders div element of alphabet', () => {
      render(<WordGameComponent />);
      const divElement = screen.getByTestId("alphabet-element");
      expect(divElement).toBeInTheDocument();
    });

    it('show the score after clicking letter', () => {
      render(<WordGameComponent />);
  
      clickLetter('a');
  
      const spanElement = screen.getByText(/1/i);
      expect(spanElement).toBeInTheDocument();
    });

    it('disable letter after clicking it', () => {
      render(<WordGameComponent />);
  
      clickLetter('a');
  
      const buttonElement = screen.getByTestId("button-alphabet-a");
      expect(buttonElement).toBeDisabled()
    });

    it('get win message and new game button', () => {
      render(<WordGameComponent />);

      ALPHABET.forEach(el => clickLetter(el))
  
      const divElement = screen.getByTestId("win-element");
      expect(divElement).toBeInTheDocument()

      const buttonElement = screen.getByTestId("new-game");
      expect(buttonElement).toBeInTheDocument()
    });
});