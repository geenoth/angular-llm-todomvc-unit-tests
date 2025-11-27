import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTodoInputComponent } from './edit-todo-input.component';
import { By } from '@angular/platform-browser';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditTodoInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial value in the input field', () => {
    component.initialValue = 'Test Todo';
    component.ngOnInit();
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(
      By.css('[data-testid="edit-todo-input"]')
    );
    expect(inputElement.nativeElement.value).toBe('Test Todo');
  });

  it('should update the editTitle when input value changes', async () => {
    const inputElement = fixture.debugElement.query(
      By.css('[data-testid="edit-todo-input"]')
    );
    inputElement.nativeElement.value = 'Updated Todo';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.editTitle).toBe('Updated Todo');
  });

  it('should call updateTodo on pressing Enter key', () => {
    const spy = jest.spyOn(component, 'updateTodo');
    const inputElement = fixture.debugElement.query(
      By.css('[data-testid="edit-todo-input"]')
    );

    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleBlur on input blur event', () => {
    const spy = jest.spyOn(component, 'handleBlur');
    const inputElement = fixture.debugElement.query(
      By.css('[data-testid="edit-todo-input"]')
    );

    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not call updateTodo if input is empty or whitespace', () => {
    const spy = jest.spyOn(component, 'updateTodo');
    component.editTitle = ' ';
    const inputElement = fixture.debugElement.query(
      By.css('[data-testid="edit-todo-input"]')
    );

    inputElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    fixture.detectChanges();

    expect(spy).toBeCalledTimes(0);
  });

  it('should log messages correctly when updateTodo is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.editTitle = 'New Task';
    component.updateTodo();
    expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'New Task');

    consoleSpy.mockRestore();
  });

  it('should log edit finished when handleBlur is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.handleBlur();
    expect(consoleSpy).toHaveBeenCalledWith('Edit finished');

    consoleSpy.mockRestore();
  });
});