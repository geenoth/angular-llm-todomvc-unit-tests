import { render, screen, fireEvent } from '@testing-library/angular';
import { ClearCompletedButtonComponent } from './clear-completed-button.component';
import '@testing-library/jest-dom';

describe('ClearCompletedButtonComponent', () => {
  // Test 1: Component should render the button by default (when isVisible is true)
  test('should render the "Clear Completed" button when isVisible is true', async () => {
    await render(ClearCompletedButtonComponent);
    const button = screen.getByTestId('clear-completed-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Clear Completed');
  });

  // Test 2: Component should not render the button when isVisible is false
  test('should not render the button when isVisible is set to false', async () => {
    await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: false },
    });
    const button = screen.queryByTestId('clear-completed-button');
    expect(button).not.toBeInTheDocument();
  });

  // Test 3: Test the click interaction
  test('should call the clearCompleted method when the button is clicked', async () => {
    const { fixture } = await render(ClearCompletedButtonComponent);
    const componentInstance = fixture.componentInstance;

    // Spy on the clearCompleted method
    const clearCompletedSpy = jest.spyOn(componentInstance, 'clearCompleted');

    const button = screen.getByTestId('clear-completed-button');
    await fireEvent.click(button);

    expect(clearCompletedSpy).toHaveBeenCalled();
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    clearCompletedSpy.mockRestore();
  });

  // Test 4: Test state changes via props
  test('should toggle button visibility when the isVisible input property changes', async () => {
    const { rerender } = await render(ClearCompletedButtonComponent, {
      componentProperties: { isVisible: true },
    });

    // Initially visible
    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument();

    // Re-render the component with isVisible set to false
    await rerender({ componentProperties: { isVisible: false } });
    expect(screen.queryByTestId('clear-completed-button')).not.toBeInTheDocument();
    
    // Re-render the component with isVisible set to true again
    await rerender({ componentProperties: { isVisible: true } });
    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument();
  });

  // Test 5: Check for correct class on the button
  test('should have the "clear-completed" class on the button', async () => {
    await render(ClearCompletedButtonComponent);
    const button = screen.getByTestId('clear-completed-button');
    expect(button).toHaveClass('clear-completed');
  });
});