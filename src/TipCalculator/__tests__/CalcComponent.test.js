import { render, screen, fireEvent } from '@testing-library/react';
import CalcComponent from '../CalcComponent';

describe('CalcComponent', () => {

    it('should render title element', () => {
        render(<CalcComponent />);
        const divElement = screen.getByText(/Tip Calculator/i);
        expect(divElement).toBeInTheDocument();
    });

    //bill
    it('should render the bill input element', () => {
        render(
            <CalcComponent />
        );
        const billInputElement = screen.getByPlaceholderText(/How much was your bill?/i);
        expect(billInputElement).toBeInTheDocument();
    });

    it('should be able to type bill into input', () => {
        render(
            <CalcComponent />
        );
        const billInputElement = screen.getByPlaceholderText(/How much was your bill?/i);
        fireEvent.click(billInputElement)
        fireEvent.change(billInputElement, { target: { value: 80 } });
        expect(billInputElement.value).toBe('80');
    });

    //people
    it('should render number of people in the input element', () => {
        render(
            <CalcComponent />
        );
        const peopleInputElement = screen.getByPlaceholderText(/How many people sharing the bill?/i);
        expect(peopleInputElement).toBeInTheDocument();
    });

    it('should be able to type number of people in the input', () => {
        render(
            <CalcComponent />
        );
        const peopleInputElement = screen.getByPlaceholderText(/How many people sharing the bill?/i);
        fireEvent.click(peopleInputElement)
        fireEvent.change(peopleInputElement, { target: { value: 2 } });
        expect(peopleInputElement.value).toBe('2');
    });

    // errors
    it('error when the bill is empty', () => {
        render(
            <CalcComponent />
        );

        const buttonElement = screen.getByRole("button", { name: /Calculate/i });
        fireEvent.click(buttonElement);

        const errorBillElement = screen.getByText(/The sum of bill cannot be blank/i);
        expect(errorBillElement).toBeInTheDocument();
    });

    it('error when number of people is empty', () => {
        render(
            <CalcComponent />
        );

        const billInputElement = screen.getByPlaceholderText(/How much was your bill?/i);
        fireEvent.click(billInputElement)
        fireEvent.change(billInputElement, { target: { value: 80 } });

        const buttonElement = screen.getByRole("button", { name: /Calculate/i });
        fireEvent.click(buttonElement);

        const errorPeopleElement = screen.getByText(/The number of people cannot be blank/i);
        expect(errorPeopleElement).toBeInTheDocument();
    });

    it ('can select different values of service', () => {
        render(
            <CalcComponent />
        );

        const selectElement = screen.getByTestId("select-element");
        expect(selectElement).toHaveTextContent("Excellent");

        fireEvent.click(selectElement)
        fireEvent.change(selectElement, { target: { value: 'Good' } });
        expect(selectElement).toHaveTextContent("Good");
    })

    it('calculate corrected result', () => {
        render(
            <CalcComponent />
        );

        const billInputElement = screen.getByPlaceholderText(/How much was your bill?/i);
        fireEvent.click(billInputElement)
        fireEvent.change(billInputElement, { target: { value: 80 } });

        const peopleInputElement = screen.getByPlaceholderText(/How many people sharing the bill?/i);
        fireEvent.click(peopleInputElement)
        fireEvent.change(peopleInputElement, { target: { value: 2 } });

        const buttonElement = screen.getByRole("button", { name: /Calculate/i });
        fireEvent.click(buttonElement);
        
        const spanTipElement = screen.getByTestId("tip");
        expect(spanTipElement.textContent).toEqual('12'); 

        const spanBillElement = screen.getByTestId("bill-tip");
        expect(spanBillElement.textContent).toEqual('92');

        const spanPersonElement = screen.getByTestId("per-person");
        expect(spanPersonElement.textContent).toEqual('46');
    });
});