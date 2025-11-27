import { render, fireEvent } from '@angular/core/testing';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  beforeEach(async () => {
    await render(TodoLabelComponent, {
      componentProperties: {
        text: 'Todo Label',
        isCompleted: false,
      },
    });
  });

  it('should render the todo label correctly', () => {
    expect(screen.getByTestId('todo-label')).toBeInTheDocument();
    expect(screen.getByTestId('todo-label')).toHaveTextContent('Todo Label');
    expect(screen.getByTestId('todo-label')).not.toHaveClass('completed');
  });

  it('should render the todo label as completed when isCompleted is true', async () => {
    await render(TodoLabelComponent, {
      componentProperties: {
        text: 'Todo Label',
        isCompleted: true,
      },
    });
    expect(screen.getByTestId('todo-label')).toHaveClass('completed');
  });

  it('should call the startEdit function when the label is double clicked', () => {
    const label = screen.getByTestId('todo-label');
    fireEvent.dblclick(label);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Edit started');
  });
});