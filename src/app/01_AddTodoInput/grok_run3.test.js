import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddTodoInputComponent } from './add-todo-input.component';

describe('AddTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoInputComponent, FormsModule],
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

  it('should call addTodo and clear input on Enter key press with non-empty input', () => {
    jest.spyOn(console, 'log');
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    component.title = 'Test Todo';
    fixture.detectChanges();
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    expect(console.log).toHaveBeenCalledWith('Todo added:', 'Test Todo');
    expect(component.title).toBe('');
  });

  it('should not call addTodo on Enter key press with empty input', () => {
    jest.spyOn(console, 'log');
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    component.title = '';
    fixture.detectChanges();
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should not call addTodo on Enter key press with only whitespace input', () => {
    jest.spyOn(console, 'log');
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    component.title = '   ';
    fixture.detectChanges();
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should have autofocus on input field', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    expect(inputElement.getAttribute('autofocus')).toBe('');
  });
});