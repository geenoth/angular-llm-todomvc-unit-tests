// todo-item-checkbox.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';
import { By } from '@angular/platform-browser';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemCheckboxComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders checkbox input', () => {
    const checkboxInput = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    expect(checkboxInput).toBeTruthy();
  });

  it('renders checkbox with initial isChecked state', () => {
    const checkboxInput = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    expect(checkboxInput.nativeElement.checked).toBe(false);
  });

  it('toggles checkbox state on click', () => {
    const checkboxInput = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkboxInput.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isChecked).toBe(true);
  });

  it('logs message to console on toggle', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const checkboxInput = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkboxInput.triggerEventHandler('click', null);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Checkbox toggled:', true);
  });

  it('updates checkbox state when isChecked input changes', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkboxInput = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    expect(checkboxInput.nativeElement.checked).toBe(true);
  });
});