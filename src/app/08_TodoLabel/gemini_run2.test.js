import { render, screen, fireEvent } from '@testing-library/angular';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  // Test 1: Component should render with default props
  test('should create and render the initial text', async () => {
    await render(TodoLabelComponent, {
      componentProperties: { text: 'Learn Jest' },
    });

    const label = screen.getByTestId('todo-label');
    expect(label).toBeInTheDocument();
    expect(label.textContent).toContain('Learn Jest');
  });

  // Test 2: Should not have 'completed' class when isCompleted is false
  test('should not have "completed" class when isCompleted is false', async () => {
    await render(TodoLabelComponent, {
      componentProperties: { isCompleted: false },
    });

    const label = screen.getByTestId('todo-label');
    expect(label).not.toHaveClass('completed');
  });

  // Test 3: Should have 'completed' class when isCompleted is true
  test('should have "completed" class when isCompleted is true', async () => {
    await render(TodoLabelComponent, {
      componentProperties: { isCompleted: true },
    });

    const label = screen.getByTestId('todo-label');
    expect(label).toHaveClass('completed');
  });

  // Test 4: Test prop updates
  test('should update text and completed class when props change', async () => {
    const { rerender } = await render(TodoLabelComponent, {
      componentProperties: { text: 'Initial Text', isCompleted: false },
    });

    const label = screen.getByTestId('todo-label');
    expect(label.textContent).toContain('Initial Text');
    expect(label).not.toHaveClass('completed');

    // Rerender with new props
    await rerender({ text: 'Updated Text', isCompleted: true });

    expect(label.textContent).toContain('Updated Text');
    expect(label).toHaveClass('completed');
  });

  // Test 5: Test user interaction (double click)
  test('should call startEdit on double click', async () => {
    const { fixture } = await render(TodoLabelComponent);
    const componentInstance = fixture.componentInstance;

    // Spy on the startEdit method
    const startEditSpy = jest.spyOn(componentInstance, 'startEdit');

    const label = screen.getByTestId('todo-label');
    await fireEvent.dblClick(label);

    expect(startEditSpy).toHaveBeenCalled();
    expect(startEditSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    startEditSpy.mockRestore();
  });

  // Test 6: Verify console log is called on startEdit
  test('should log to console when startEdit is called', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { fixture } = await render(TodoLabelComponent);
    const componentInstance = fixture.componentInstance;

    // Directly call the method
    componentInstance.startEdit();

    expect(consoleLogSpy).toHaveBeenCalledWith('Edit started');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });
});