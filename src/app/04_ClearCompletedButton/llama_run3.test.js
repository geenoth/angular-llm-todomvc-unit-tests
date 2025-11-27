import { render, fireEvent } from '@angular/core/testing';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

describe('ClearCompletedButtonComponent', () => {
  it('should render the button when isVisible is true', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: {
        isVisible: true,
      },
    });
    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument();
  });

  it('should not render the button when isVisible is false', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: {
        isVisible: false,
      },
    });
    expect(screen.queryByTestId('clear-completed-button')).not.toBeInTheDocument();
  });

  it('should trigger the clearCompleted function on button click', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: {
        isVisible: true,
      },
    });
    const buttonElement = screen.getByTestId('clear-completed-button');
    fireEvent.click(buttonElement);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Completed todos cleared');
  });
});