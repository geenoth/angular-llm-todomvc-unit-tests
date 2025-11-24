// add-todo-input.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  let component;
  let fixture;
  let inputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Since the component is standalone, we import it directly.
      // We don't need to import FormsModule here because the component itself imports it.
      imports: [AddTodoInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoInputComponent);
    component = fixture.componentInstance;
    
    // Select the input element using its data-testid attribute for robust testing
    const inputDebugElement = fixture.debugElement.query(By.css('[data-testid="add-todo-input"]'));
    inputElement = inputDebugElement.nativeElement;
    
    // Trigger initial data binding
    fixture.detectChanges();
  });

  it('should create the component and render initial UI', () => {
    expect(component).toBeTruthy();

    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('todos');

    expect(inputElement).toBeTruthy();
    expect(inputElement.placeholder).toBe('What needs to be done?');
    expect(inputElement.value).toBe('');
  });

  it('should update component title property on user input', fakeAsync(() => {
    const testValue = 'My new todo';
    
    // Simulate user typing into the input field
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    
    // Wait for the ngModel two-way binding to update the component property
    tick(); 
    
    expect(component.title).toBe(testValue);
  }));

  it('should call addTodo, log to console, and clear title when Enter is pressed with valid text', fakeAsync(() => {
    const consoleSpy = jest.spyOn(console, 'log');
    const newTodoTitle = 'Learn Jest';
    
    // Set the input value and update the component's state
    inputElement.value = newTodoTitle;
    inputElement.dispatchEvent(new Event('input'));
    tick();
    
    // Ensure state is correct before the event
    expect(component.title).toBe(newTodoTitle);
    
    // Simulate pressing the 'Enter' key
    const enterKeyEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterKeyEvent);
    tick();
    fixture.detectChanges();
    
    // Verify that the addTodo logic was executed correctly
    expect(consoleSpy).toHaveBeenCalledWith('Todo added:', newTodoTitle);
    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
    
    // Clean up spy
    consoleSpy.mockRestore();
  }));

  it('should NOT call addTodo when Enter is pressed and title is empty', fakeAsync(() => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.title = '';
    fixture.detectChanges();
    tick();

    const enterKeyEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterKeyEvent);
    tick();

    expect(consoleSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
    
    consoleSpy.mockRestore();
  }));

  it('should NOT call addTodo when Enter is pressed and title contains only whitespace', fakeAsync(() => {
    const consoleSpy = jest.spyOn(console, 'log');
    const whitespaceTitle = '   ';
    
    // Simulate user inputting only spaces
    inputElement.value = whitespaceTitle;
    inputElement.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    
    expect(component.title).toBe(whitespaceTitle);
    
    // Simulate pressing the 'Enter' key
    const enterKeyEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterKeyEvent);
    tick();

    // The addTodo method should not proceed, so the state remains unchanged
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(component.title).toBe(whitespaceTitle);
    expect(inputElement.value).toBe(whitespaceTitle);
    
    consoleSpy.mockRestore();
  }));
});