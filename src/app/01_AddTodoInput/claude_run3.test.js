import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
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
    fixture.detectChanges();
    
    inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with title "todos"', () => {
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toBe('todos');
  });

  it('should render input with correct attributes', () => {
    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('placeholder')).toBe('What needs to be done?');
    expect(inputElement.getAttribute('data-testid')).toBe('add-todo-input');
    expect(inputElement.hasAttribute('autofocus')).toBe(true);
    expect(inputElement.classList.contains('new-todo')).toBe(true);
  });

  it('should initialize title as empty string', () => {
    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
  });

  it('should update title property when input value changes', async () => {
    inputElement.value = 'New Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.title).toBe('New Todo');
  });

  it('should bind component title to input value', async () => {
    component.title = 'Test Todo';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toBe('Test Todo');
  });

  it('should call addTodo when Enter key is pressed', () => {
    const addTodoSpy = jest.spyOn(component, 'addTodo');
    
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    
    expect(addTodoSpy).toHaveBeenCalled();
  });

  it('should not call addTodo when other keys are pressed', () => {
    const addTodoSpy = jest.spyOn(component, 'addTodo');
    
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    
    expect(addTodoSpy).not.toHaveBeenCalled();
  });

  describe('addTodo method', () => {
    it('should log todo and clear input when title has value', () => {
      component.title = 'Test Todo';
      
      component.addTodo();
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', 'Test Todo');
      expect(component.title).toBe('');
    });

    it('should log todo and clear input when title has value with spaces', () => {
      component.title = '  Test Todo  ';
      
      component.addTodo();
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', '  Test Todo  ');
      expect(component.title).toBe('');
    });

    it('should not log or clear input when title is empty', () => {
      component.title = '';
      
      component.addTodo();
      
      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(component.title).toBe('');
    });

    it('should not log or clear input when title contains only spaces', () => {
      component.title = '   ';
      
      component.addTodo();
      
      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(component.title).toBe('   ');
    });
  });

  it('should handle full user flow: type and press enter', async () => {
    // Type in the input
    inputElement.value = 'New Todo Item';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    // Press Enter
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
    await fixture.whenStable();

    // Verify the todo was added and input cleared
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', 'New Todo Item');
    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
  });

  it('should not add todo when pressing enter with empty input', async () => {
    // Ensure input is empty
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    // Press Enter
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

    // Verify nothing was logged
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it('should have header element with correct class', () => {
    const headerElement = fixture.nativeElement.querySelector('.header');
    expect(headerElement).toBeTruthy();
    expect(headerElement.tagName.toLowerCase()).toBe('header');
  });
});