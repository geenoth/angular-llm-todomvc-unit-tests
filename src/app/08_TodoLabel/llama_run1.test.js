// todo-label.component.spec.ts
import { render, fireEvent, waitFor } from '@angular/core/testing';
import { TodoLabelComponent } from './todo-label.component';
import { TestBed } from '@angular/core/testing';

describe('TodoLabelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoLabelComponent],
    }).compileComponents();
  });

  it('renders correctly', async () => {
    const { getByTestId } = await render(TodoLabelComponent, {
      componentProperties: {
        text: 'Todo label',
      },
    });
    const label = getByTestId('todo-label');
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe('Todo label');
  });

  it('applies completed class when isCompleted is true', async () => {
    const { getByTestId } = await render(TodoLabelComponent, {
      componentProperties: {
        text: 'Todo label',
        isCompleted: true,
      },
    });
    const label = getByTestId('todo-label');
    expect(label).toHaveClass('completed');
  });

  it('calls startEdit on double click', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const { getByTestId } = await render(TodoLabelComponent, {
      componentProperties: {
        text: 'Todo label',
      },
    });
    const label = getByTestId('todo-label');
    fireEvent.dblclick(label);
    await waitFor(() => expect(consoleLogSpy).toHaveBeenCalledTimes(1));
    expect(consoleLogSpy).toHaveBeenCalledWith('Edit started');
  });

  it('updates text when input changes', async () => {
    const { getByTestId, component } = await render(TodoLabelComponent, {
      componentProperties: {
        text: 'Old text',
      },
    });
    const label = getByTestId('todo-label');
    component.text = 'New text';
    await waitFor(() => expect(label.textContent).toBe('New text'));
  });
});