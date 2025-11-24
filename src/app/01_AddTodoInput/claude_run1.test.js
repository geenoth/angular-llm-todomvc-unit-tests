import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  let component;
  let fixture;
  let inputElement;
  let consoleLogSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoInputComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('[data-testid="add-todo-input"]'));
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with correct title', () => {
    const h1Element = fixture.debugElement.query(By.css('h1'));
    expect(h1Element.nativeElement.textContent).toBe('todos');
  });

  it('should render input with correct attributes', () => {
    const input = inputElement.nativeElement;
    expect(input).toBeTruthy();
    expect(input.classList.contains('new-todo')).toBe(true);
    expect(input.getAttribute('placeholder')).toBe('What needs to be done?');
    expect(input.hasAttribute('autofocus')).toBe(true);
    expect(input.getAttribute('data-testid')).toBe('add-todo-input');
  });

  it('should initialize with empty title', () => {
    expect(component.title).toBe('');
    expect(inputElement.nativeElement.value).toBe('');
  });

  it('should update title when input changes', async () => {
    const testValue = 'New todo item';
    inputElement.nativeElement.value = testValue;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.title).toBe(testValue);
  });

  it('should bind input value to component title property', async () => {
    const testValue = 'Test todo';
    component.title = testValue;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.nativeElement.value).toBe(testValue);
  });

  it('should call addTodo when Enter key is pressed', () => {
    const addTodoSpy = jest.spyOn(component, 'addTodo');
    inputElement.nativeElement.value = 'Test todo';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.nativeElement.dispatchEvent(event);

    expect(addTodoSpy).toHaveBeenCalled();
  });

  it('should log todo and clear input when addTodo is called with non-empty title', () => {
    component.title = 'Test todo item';
    component.addTodo();

    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', 'Test todo item');
    expect(component.title).toBe('');
  });

  it('should not log or clear input when addTodo is called with empty title', () => {
    component.title = '';
    component.addTodo();

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('');
  });

  it('should not log or clear input when addTodo is called with whitespace-only title', () => {
    component.title = '   ';
    component.addTodo();

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('   ');
  });

  it('should trim whitespace when checking title in addTodo', () => {
    component.title = '  Test with spaces  ';
    component.addTodo();

    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', '  Test with spaces  ');
    expect(component.title).toBe('');
  });

  it('should handle Enter key press with empty input', () => {
    inputElement.nativeElement.value = '';
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.nativeElement.dispatchEvent(event);

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('');
  });

  it('should handle complete flow: type, press Enter, and verify reset', async () => {
    const testValue = 'Complete todo item';
    
    // Type in input
    inputElement.nativeElement.value = testValue;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.title).toBe(testValue);

    // Press Enter
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    await fixture.whenStable();

    // Verify console.log was called and input was cleared
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', testValue);
    expect(component.title).toBe('');
    expect(inputElement.nativeElement.value).toBe('');
  });
});