import { render, screen, fireEvent } from '@testing-library/angular';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  const setup = async (props: Partial<TodoLabelComponent> = {}) => {
    const defaultProps: Partial<TodoLabelComponent> = {
      text: 'Test Todo',
      isCompleted: false,
    };
    return render(TodoLabelComponent, {
      componentProperties: { ...defaultProps, ...props },
    });
  };

  test('should render the label with the correct text', async () => {
    const testText = 'My Todo Item';
    await setup({ text: testText });
    const label = screen.getByTestId('todo-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(testText);
  });

  test('should not have the "completed" class when isCompleted is false', async () => {
    await setup({ isCompleted: false });
    const label = screen.getByTestId('todo-label');
    expect(label).not.toHaveClass('completed');
  });

  test('should have the "completed" class when isCompleted is true', async () => {
    await setup({ isCompleted: true });
    const label = screen.getByTestId('todo-label');
    expect(label).toHaveClass('completed');
  });

  test('should call startEdit on double click', async () => {
    const { fixture } = await setup();
    const componentInstance = fixture.componentInstance;
    const startEditSpy = jest.spyOn(componentInstance, 'startEdit');

    const label = screen.getByTestId('todo-label');
    await fireEvent.dblClick(label);

    expect(startEditSpy).toHaveBeenCalledTimes(1);
  });
  
  test('should update text when text prop changes', async () => {
    const { rerender } = await setup({ text: 'Initial Text' });
    let label = screen.getByTestId('todo-label');
    expect(label).toHaveTextContent('Initial Text');

    await rerender({ text: 'Updated Text' });
    label = screen.getByTestId('todo-label');
    expect(label).toHaveTextContent('Updated Text');
  });

  test('should update completed class when isCompleted prop changes', async () => {
    const { rerender } = await setup({ isCompleted: false });
    let label = screen.getByTestId('todo-label');
    expect(label).not.toHaveClass('completed');

    await rerender({ isCompleted: true });
    label = screen.getByTestId('todo-label');
    expect(label).toHaveClass('completed');
  });
});