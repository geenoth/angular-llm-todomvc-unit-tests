import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';
import { By } from '@angular/platform-browser';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the checkbox correctly', () => {
    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="todo-item-checkbox"]')
    );
    expect(checkboxElement).toBeTruthy();
    expect(checkboxElement.nativeElement.type).toBe('checkbox');
  });

  it('should set the checkbox to checked when isChecked is true', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="todo-item-checkbox"]')
    );
    expect(checkboxElement.nativeElement.checked).toBe(true);
  });

  it('should set the checkbox to unchecked when isChecked is false', () => {
    component.isChecked = false;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="todo-item-checkbox"]')
    );
    expect(checkboxElement.nativeElement.checked).toBe(false);
  });

  it('should toggle isChecked state when checkbox is clicked', () => {
    component.isChecked = false;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="todo-item-checkbox"]')
    );
    checkboxElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.isChecked).toBe(true);

    checkboxElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.isChecked).toBe(false);
  });

  it('should call toggleCheckbox and log when checkbox is clicked', () => {
    const spy = jest.spyOn(component, 'toggleCheckbox');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="todo-item-checkbox"]')
    );
    checkboxElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);

    checkboxElement.nativeElement.click();
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);

    consoleSpy.mockRestore();
  });
});