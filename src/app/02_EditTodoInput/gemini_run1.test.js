import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;
  let inputElement;

  // Runs before each test
  beforeEach(async () => {
    // Configure a testing module for the component
    await TestBed.configureTestingModule({
      imports: [FormsModule, EditTodoInputComponent], // Import standalone component and FormsModule
    }).compileComponents(); // Compile component's template and CSS

    // Create an instance of the component
    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;

    // Get the input element from the DOM for later use
    // query by the data-testid attribute
    const inputDebugElement = fixture.debugElement.query(
      By.css('[data-testid="edit-todo-input"]')
    );
    inputElement = inputDebugElement.nativeElement;
  });

  // Test case 1: Component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Initial rendering and props
  it('should initialize with the correct initialValue', () => {
    // Set the input property
    component.initialValue = 'My test todo';
    
    // Trigger change detection to run ngOnInit
    fixture.detectChanges();

    // Assert that the component's internal state is set
    expect(component.editTitle).toBe('My test todo');
    // Assert that the input element's value is set
    expect(inputElement.value).toBe('My test todo');
  });

  // Test case 3: User input interaction
  it('should update editTitle when user types in the input', () => {
    fixture.detectChanges(); // Initial data binding

    // Simulate user typing
    inputElement.value = 'A new value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert the component's property has been updated
    expect(component.editTitle).toBe('A new value');
  });

  // Test case 4: Keypress interaction (Enter)
  it('should call updateTodo when Enter key is pressed', () => {
    // Spy on the updateTodo method to check if it gets called
    jest.spyOn(component, 'updateTodo');
    fixture.detectChanges();

    // Simulate a 'keyup.enter' event
    const enterKeyEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterKeyEvent);

    // Assert that the spied method was called
    expect(component.updateTodo).toHaveBeenCalled();
  });

  // Test case 5: Blur interaction
  it('should call handleBlur when the input loses focus', () => {
    // Spy on the handleBlur method
    jest.spyOn(component, 'handleBlur');
    fixture.detectChanges();

    // Simulate a 'blur' event
    inputElement.dispatchEvent(new Event('blur'));

    // Assert that the spied method was called
    expect(component.handleBlur).toHaveBeenCalled();
  });

  // Test case 6: State change and method logic for updateTodo (with valid input)
  it('updateTodo() should log a message if editTitle is not empty', () => {
    // Spy on console.log to check its output
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Set component state
    component.editTitle = '  A valid todo  '; // Include whitespace to test trimming
    
    // Call the method directly
    component.updateTodo();

    // Assert that console.log was called with the correct, trimmed value
    expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'A valid todo');

    // Clean up spy
    consoleSpy.mockRestore();
  });

  // Test case 7: State change and method logic for updateTodo (with invalid input)
  it('updateTodo() should not log a message if editTitle is empty or just whitespace', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    // Test with empty string
    component.editTitle = '';
    component.updateTodo();
    expect(consoleSpy).not.toHaveBeenCalled();

    // Test with only whitespace
    component.editTitle = '   ';
    component.updateTodo();
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  // Test case 8: Method logic for handleBlur
  it('handleBlur() should log "Edit finished"', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    // Call the method
    component.handleBlur();

    // Assert it logged the correct message
    expect(consoleSpy).toHaveBeenCalledWith('Edit finished');

    consoleSpy.mockRestore();
  });
});