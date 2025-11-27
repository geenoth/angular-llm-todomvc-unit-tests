import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with initial value from input property', () => {
    component.initialValue = 'Test Todo';
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
    expect(inputElement.value).toBe('Test Todo');
  });

  it('should update editTitle when input value changes', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
    inputElement.value = 'Updated Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.editTitle).toBe('Updated Todo');
  });

  it('should call updateTodo on Enter key press with non-empty input', () => {
    jest.spyOn(console, 'log');
    component.editTitle = 'New Todo';
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    expect(console.log).toHaveBeenCalledWith('Todo updated:', 'New Todo');
  });

  it('should not call updateTodo on Enter key press with empty input', () => {
    jest.spyOn(console, 'log');
    component.editTitle = '';
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(enterEvent);
    expect(console.log).not.toHaveBeenCalledWith('Todo updated:', '');
  });

  it('should call handleBlur on input blur', () => {
    jest.spyOn(console, 'log');
    const inputElement = fixture.nativeElement.querySelector('[data-testid="edit-todo-input"]');
    inputElement.dispatchEvent(new Event('blur'));
    expect(console.log).toHaveBeenCalledWith('Edit finished');
  });

  it('should initialize editTitle with initialValue on component init', () => {
    component.initialValue = 'Initial Todo';
    component.ngOnInit();
    expect(component.editTitle).toBe('Initial Todo');
  });
});

