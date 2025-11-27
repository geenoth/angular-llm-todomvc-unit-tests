import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemCheckboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('renders checkbox correctly', () => {
    component.isChecked = true;
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]'));
    expect(checkboxElement.nativeElement.checked).toBe(true);
  });

  it('calls toggleCheckbox on click', () => {
    component.isChecked = false;
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]'));
    const toggleCheckboxSpy = jest.spyOn(component, 'toggleCheckbox');
    checkboxElement.nativeElement.click();
    expect(toggleCheckboxSpy).toHaveBeenCalledTimes(1);
  });

  it('toggles isChecked on click', () => {
    component.isChecked = false;
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]'));
    checkboxElement.nativeElement.click();
    expect(component.isChecked).toBe(true);
  });
});