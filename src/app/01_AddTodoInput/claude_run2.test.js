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

  it('should render header with correct title', () => {
    const header = fixture.nativeElement.querySelector('.header');
    const h1 = fixture.nativeElement.querySelector('h1');
    
    expect(header).toBeTruthy();
    expect(h1.textContent).toBe('todos');
  });

  it('should render input with correct attributes', () => {
    expect(inputElement).toBeTruthy();
    expect(inputElement.classList.contains('new-todo')).toBe(true);
    expect(inputElement.getAttribute('placeholder')).toBe('What needs to be done?');
    expect(inputElement.hasAttribute('autofocus')).toBe(true);
    expect(inputElement.getAttribute('data-testid')).toBe('add-todo-input');
  });

  it('should have empty title initially', () => {
    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
  });

  it('should update title when input value changes', async () => {
    inputElement.value = 'New Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.title).toBe('New Todo');
  });

  it('should update input value when title changes', async () => {
    component.title = 'Updated Todo';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.value).toBe('Updated Todo');
  });

  it('should call addTodo when Enter key is pressed', () => {
    const addTodoSpy = jest.spyOn(component, 'addTodo');
    
    inputElement.value = 'Test Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    
    expect(addTodoSpy).toHaveBeenCalled();
  });

  it('should log todo and clear input when addTodo is called with non-empty title', () => {
    component.title = 'Test Todo';
    
    component.addTodo();
    
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', 'Test Todo');
    expect(component.title).toBe('');
  });

  it('should not log or clear input when addTodo is called with empty title', () => {
    component.title = '';
    
    component.addTodo();
    
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('');
  });

  it('should not log or clear input when addTodo is called with whitespace only', () => {
    component.title = '   ';
    
    component.addTodo();
    
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('   ');
  });

  it('should trim whitespace when checking title in addTodo', () => {
    component.title = '  Test Todo  ';
    
    component.addTodo();
    
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', '  Test Todo  ');
    expect(component.title).toBe('');
  });

  it('should handle full user flow: input text and press enter', async () => {
    inputElement.value = 'Complete Task';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.title).toBe('Complete Task');
    
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(consoleLogSpy).toHaveBeenCalledWith('Todo added:', 'Complete Task');
    expect(component.title).toBe('');
    expect(inputElement.value).toBe('');
  });
});