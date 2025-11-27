import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render checkbox with correct initial checked state as false', () => {
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    expect(checkbox.checked).toBe(false);
  });

  it('should render checkbox with correct initial checked state as true when isChecked is true', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    expect(checkbox.checked).toBe(true);
  });

  it('should toggle isChecked state when checkbox is clicked', () => {
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    expect(component.isChecked).toBe(false);
    checkbox.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
    expect(checkbox.checked).toBe(true);
  });

  it('should call toggleCheckbox method on checkbox click', () => {
    jest.spyOn(component, 'toggleCheckbox');
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    checkbox.click();
    expect(component.toggleCheckbox).toHaveBeenCalled();
  });

  it('should log to console when checkbox is toggled', () => {
    jest.spyOn(console, 'log');
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    checkbox.click();
    expect(console.log).toHaveBeenCalledWith('Checkbox toggled:', true);
  });
});