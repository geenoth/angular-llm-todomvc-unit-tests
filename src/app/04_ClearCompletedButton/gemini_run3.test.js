import { render, screen, fireEvent } from '@testing-library/angular';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';

describe('ClearCompletedButtonComponent', () => {
  // Test 1: Component should render the button when isVisible is true
  test('should render the button when isVisible is true', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: true },
    });

    const clearButton = screen.getByTestId('clear-completed-button');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent('Clear Completed');
  });

  // Test 2: Component should not render the button when isVisible is false
  test('should not render the button when isVisible is false', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: false },
    });

    const clearButton = screen.queryByTestId('clear-completed-button');
    expect(clearButton).not.toBeInTheDocument();
  });

  // Test 3: The clearCompleted method should be called on click
  test('should call clearCompleted method on button click', async () => {
    const { fixture } = await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: true },
    });

    const componentInstance = fixture.componentInstance;
    // Spy on the component's method
    const clearCompletedSpy = jest.spyOn(componentInstance, 'clearCompleted');

    const clearButton = screen.getByTestId('clear-completed-button');
    fireEvent.click(clearButton);

    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    
    // Clean up the spy
    clearCompletedSpy.mockRestore();
  });

  // Test 4: Component visibility should toggle based on the isVisible input property
  test('should toggle button visibility when isVisible input changes', async () => {
    const { rerender } = await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: true },
    });

    // Initially visible
    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument();

    // Rerender with isVisible set to false
    await rerender({ componentProperties: { isVisible: false } });

    // Should not be visible
    expect(screen.queryByTestId('clear-completed-button')).not.toBeInTheDocument();
    
    // Rerender with isVisible set to true again
    await rerender({ componentProperties: { isVisible: true } });

    // Should be visible again
    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument();
  });

  // Test 5: Check button's class and type attributes
  test('should have the correct class and type attributes', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: true },
    });
    
    const clearButton = screen.getByTestId('clear-completed-button');
    expect(clearButton).toHaveClass('clear-completed');
    expect(clearButton).toHaveAttribute('type', 'button');
  });
});