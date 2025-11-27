import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTodoInputComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input field with initial value', () => {
    component.initialValue = 'Initial todo title';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    expect(inputField.nativeElement.value).toBe('Initial todo title');
  });

  it('should update editTitle on input change', () => {
    const inputField = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    inputField.nativeElement.value = 'New todo title';
    inputField.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.editTitle).toBe('New todo title');
  });

  it('should call updateTodo on enter key press', () => {
    const inputField = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    inputField.nativeElement.value = 'New todo title';
    const updateTodoSpy = jest.spyOn(component, 'updateTodo');
    inputField.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(updateTodoSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleBlur on blur event', () => {
    const inputField = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    const handleBlurSpy = jest.spyOn(component, 'handleBlur');
    inputField.nativeElement.dispatchEvent(new Event('blur'));
    expect(handleBlurSpy).toHaveBeenCalledTimes(1);
  });
});