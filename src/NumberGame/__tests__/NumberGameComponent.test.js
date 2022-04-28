import { render, screen, fireEvent } from '@testing-library/react';

import NumberGameComponent from '../NumberGameComponent';

describe('NumberGameComponent', () => {

    it('should number of button element and after 3.5 sec should show question mark', () => {
        render(<NumberGameComponent />);

        const buttonIndexElement = screen.getByTestId('button0');
        let buttonText = buttonIndexElement.textContent;
        expect(buttonIndexElement.textContent).not.toEqual('?');
        setTimeout(() => {
            expect(buttonIndexElement.textContent).toEqual('?');
        }, 3500);
        
    });

    it('should show number to search', () => {
        render(<NumberGameComponent />);

        const spanNumberElement = screen.queryByTestId('span-number');
        expect(spanNumberElement).toBeNull();
        setTimeout(() => {
            const spanNumberElement = screen.queryByTestId('span-number');
            expect(spanNumberElement).toBeInTheDocument();
        }, 3500);    
    });

    it('update score after click', () => {
        render(<NumberGameComponent />);

        const buttonIndexElement = screen.getByTestId('button0');
        let buttonText = buttonIndexElement.textContent;
        
        setTimeout(() => {
            const spanNumberElement = screen.queryByTestId('span-number');
            let spanNumber = spanNumberElement.textContent;
            fireEvent.click(buttonIndexElement)

            const spanScoreElement = screen.queryByTestId('span-score');
            if (spanNumber === buttonText) {
                expect(spanScoreElement.textContent).toEqual('4');
            } else {
                expect(spanScoreElement.textContent).toEqual('-1');
            }
        }, 3500);
        
    });

    it('win the game', () => {
        render(<NumberGameComponent />);

        setTimeout(() => {
            const spanNumberElement = screen.queryByTestId('span-number');
            let spanNumber = spanNumberElement.textContent;
            for (let i = 0; i < 9; i++) {
                const buttonIndexElement = screen.getByTestId('button' + i);
                fireEvent.click(buttonIndexElement);
                let buttonText = buttonIndexElement.textContent;
                if (buttonText === spanNumber) {
                    break;
                }
            }

            const divElement = screen.getByText(/You won!/i);
            expect(divElement).toBeInTheDocument();

            const buttonElement = screen.getByText(/New game/i);
            expect(buttonElement).toBeInTheDocument();
            
        }, 3500);
        
    });

});