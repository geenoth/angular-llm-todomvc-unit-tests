import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoInputComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input field with correct placeholder', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('placeholder')).toBe('What needs to be done?');
  });

  it('should update title property when typing in input', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    inputElement.value = 'New Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.title).toBe('New Todo');
  });

  it('should call addTodo method on Enter key press', () => {
    jest.spyOn(component, 'addTodo');
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    inputElement.value = 'New Todo';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
    expect(component.addTodo).toHaveBeenCalled();
  });

  it('should log todo and clear input when addTodo is called with non-empty title', () => {
    console.log = jest.fn();
    component.title = 'Test Todo';
    component.addTodo();
    expect(console.log).toHaveBeenCalledWith('Todo added:', 'Test Todo');
    expect(component.title).toBe('');
  });

  it('should not log or clear input when addTodo is called with empty title', () => {
    console.log = jest.fn();
    component.title = '';
    component.addTodo();
    expect(console.log).not.toHaveBeenCalled();
    expect(component.title).toBe('');
  });

  it('should not log or clear input when addTodo is called with whitespace-only title', () => {
    console.log = jest.fn();
    component.title = '   ';
    component.addTodo();
    expect(console.log).not.toHaveBeenCalled();
    expect(component.title).toBe('   ');
  });

  it('should have autofocus on input field', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    expect(inputElement.hasAttribute('autofocus')).toBeTruthy();
  });
});