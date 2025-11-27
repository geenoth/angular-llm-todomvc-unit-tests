import { render, screen, fireEvent } from '@testing-library/angular';
import { DestroyButtonComponent } from './destroy-button.component';

describe('DestroyButtonComponent', () => {
  /**
   * Renders the component before each test.
   * @returns A promise that resolves with the render result.
   */
  async function setup() {
    return render(DestroyButtonComponent, {});
  }

  // Test case 1: Component should render correctly
  test('should create the component and render the button', async () => {
    await setup();
    const button = screen.getByTestId('destroy-button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('destroy');
  });

  // Test case 2: User interaction (click) should trigger the component method
  test('should call removeTodo() when the button is clicked', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;
    
    // Spy on the removeTodo method to check if it gets called
    const removeTodoSpy = jest.spyOn(componentInstance, 'removeTodo');

    const button = screen.getByTestId('destroy-button');
    fireEvent.click(button);

    // Assert that the removeTodo method was called exactly once
    expect(removeTodoSpy).toHaveBeenCalled();
    expect(removeTodoSpy).toHaveBeenCalledTimes(1);
  });
  
  // Test case 3: Console log should be called on click (verifies original method implementation)
  test('should log "Todo removed" to the console when removeTodo is called', async () => {
    await setup();

    // Spy on console.log to ensure it's called with the correct message
    const consoleLogSpy = jest.spyOn(console, 'log');

    const button = screen.getByTestId('destroy-button');
    fireEvent.click(button);

    // Assert that console.log was called with the expected string
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo removed');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy after the test
    consoleLogSpy.mockRestore();
  });
});