import { render, screen, fireEvent } from '@testing-library/angular';
import { EditTodoInputComponent } from './edit-todo-input.component';
import { FormsModule } from '@angular/forms';

// Helper function to set up the component for rendering
async function setup(initialValue) {
  return render(EditTodoInputComponent, {
    imports: [FormsModule],
    componentProperties: { initialValue },
  });
}

describe('EditTodoInputComponent', () => {
  let consoleLogSpy: jest.SpyInstance;

  // Spy on console.log before each test and restore it afterwards
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create the component and render the input element', async () => {
    await setup();
    const inputElement = screen.getByTestId('edit-todo-input');
    expect(inputElement).toBeInTheDocument();
  });

  it('should initialize the input with the initialValue prop', async () => {
    const testValue = 'Initial Todo Title';
    await setup(testValue);
    const inputElement = screen.getByTestId('edit-todo-input') as HTMLInputElement;
    expect(inputElement.value).toBe(testValue);
  });

  it('should update the internal editTitle state when the user types in the input', async () => {
    const { fixture } = await setup('Initial');
    const inputElement = screen.getByTestId('edit-todo-input');
    const newText = 'Updated Todo Title';

    await fireEvent.change(inputElement, { target: { value: newText } });
    fixture.detectChanges();

    expect(fixture.componentInstance.editTitle).toBe(newText);
    expect(inputElement).toHaveValue(newText);
  });

  it('should call updateTodo() when the Enter key is pressed', async () => {
    const { fixture } = await setup('A valid todo');
    const component = fixture.componentInstance;
    const updateTodoSpy = jest.spyOn(component, 'updateTodo');
    const inputElement = screen.getByTestId('edit-todo-input');

    await fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    expect(updateTodoSpy).toHaveBeenCalledTimes(1);
  });

  it('should log the updated title when updateTodo() is called with non-empty text', async () => {
    const newTitle = 'Finish testing';
    await setup('Old title');
    const inputElement = screen.getByTestId('edit-todo-input');

    await fireEvent.change(inputElement, { target: { value: newTitle } });
    await fireEvent.keyUp(inputElement, { key: 'Enter' });

    expect(consoleLogSpy).toHaveBeenCalledWith('Todo updated:', newTitle);
  });

  it('should NOT log anything when updateTodo() is called with only whitespace', async () => {
    await setup('Some title');
    const inputElement = screen.getByTestId('edit-todo-input');

    // Change value to whitespace
    await fireEvent.change(inputElement, { target: { value: '   ' } });
    await fireEvent.keyUp(inputElement, { key: 'Enter' });

    // console.log for 'Todo updated:' should not have been called
    expect(consoleLogSpy).not.toHaveBeenCalledWith(expect.stringContaining('Todo updated:'));
  });

  it('should call handleBlur() when the input loses focus', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const handleBlurSpy = jest.spyOn(component, 'handleBlur');
    const inputElement = screen.getByTestId('edit-todo-input');

    await fireEvent.blur(inputElement);

    expect(handleBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should log "Edit finished" when the input is blurred', async () => {
    await setup();
    const inputElement = screen.getByTestId('edit-todo-input');

    await fireEvent.blur(inputElement);

    expect(consoleLogSpy).toHaveBeenCalledWith('Edit finished');
  });

  it('should correctly reflect the initial state in ngOnInit', async () => {
    const { fixture } = await setup('OnInit Test');
    const component = fixture.componentInstance;
    
    // ngOnInit is called automatically by Angular's lifecycle during rendering
    fixture.detectChanges(); // Ensures ngOnInit has completed
    
    expect(component.editTitle).toBe('OnInit Test');
    
    const inputElement = screen.getByTestId('edit-todo-input') as HTMLInputElement;
    expect(inputElement.value).toBe('OnInit Test');
  });
});