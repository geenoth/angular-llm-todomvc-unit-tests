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

  it('should render checkbox with correct initial checked state based on input', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    expect(checkbox.checked).toBe(true);

    component.isChecked = false;
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false);
  });

  it('should toggle checkbox state when clicked', () => {
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');
    expect(component.isChecked).toBe(false);

    checkbox.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
    expect(checkbox.checked).toBe(true);

    checkbox.click();
    fixture.detectChanges();
    expect(component.isChecked).toBe(false);
    expect(checkbox.checked).toBe(false);
  });

  it('should log toggle state to console when checkbox is clicked', () => {
    jest.spyOn(console, 'log');
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-item-checkbox"]');

    checkbox.click();
    expect(console.log).toHaveBeenCalledWith('Checkbox toggled:', true);

    checkbox.click();
    expect(console.log).toHaveBeenCalledWith('Checkbox toggled:', false);
  });
});