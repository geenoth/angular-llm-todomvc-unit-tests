import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';
let consoleLogSpy: jest.SpyInstance;

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemCheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render checkbox with initial checked state', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]'));
    expect(checkbox.nativeElement.checked).toBe(true);
  });

  it('should call toggleCheckbox on click', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]'));
    checkbox.nativeElement.click();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Checkbox toggled:', false);
  });

  it('should update isChecked state on toggleCheckbox call', () => {
    component.isChecked = true;
    component.toggleCheckbox();
    expect(component.isChecked).toBe(false);
  });
});