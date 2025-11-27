import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditTodoInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
  });

  it('renders correctly', () => {
    component.initialValue = 'Initial value';
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    expect(inputElement.nativeElement.value).toBe('Initial value');
  });

  it('updates editTitle on input change', () => {
    component.initialValue = 'Initial value';
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    inputElement.nativeElement.value = 'New value';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.editTitle).toBe('New value');
  });

  it('calls updateTodo on enter key press', () => {
    component.initialValue = 'Initial value';
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    const updateTodoSpy = jest.spyOn(component, 'updateTodo');
    inputElement.nativeElement.value = 'New value';
    inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
    fixture.detectChanges();
    expect(updateTodoSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleBlur on blur event', () => {
    component.initialValue = 'Initial value';
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]'));
    const handleBlurSpy = jest.spyOn(component, 'handleBlur');
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(handleBlurSpy).toHaveBeenCalledTimes(1);
  });
});