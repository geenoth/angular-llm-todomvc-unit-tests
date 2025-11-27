import { render, fireEvent } from '@angular/core/testing';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  beforeEach(async () => {
    await render(DestroyButtonComponent);
  });

  it('should render the component correctly', () => {
    expect(screen.getByTestId('destroy-button')).toBeInTheDocument();
  });

  it('should trigger the removeTodo function on button click', async () => {
    const buttonElement = screen.getByTestId('destroy-button');
    fireEvent.click(buttonElement);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Todo removed');
  });
});