import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoItemCheckboxComponent } from './todo-item-checkbox.component';

describe('TodoItemCheckboxComponent', () => {
  let component: TodoItemCheckboxComponent;
  let fixture: ComponentFixture<TodoItemCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render checkbox with correct initial state', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]')).nativeElement;
    expect(checkboxElement.checked).toBeTrue();
  });

  it('should reflect "isChecked" state when changed', () => {
    component.isChecked = false;
    fixture.detectChanges();

    let checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]')).nativeElement;
    expect(checkboxElement.checked).toBeFalse();

    component.isChecked = true;
    fixture.detectChanges();

    checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]')).nativeElement;
    expect(checkboxElement.checked).toBeTrue();
  });

  it('should toggle "isChecked" state on checkbox click', () => {
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]')).nativeElement;

    checkboxElement.click();
    fixture.detectChanges();
    expect(component.isChecked).toBeTrue();

    checkboxElement.click();
    fixture.detectChanges();
    expect(component.isChecked).toBeFalse();
  });

  it('should call "toggleCheckbox" on click and change "isChecked"', () => {
    const toggleCheckboxSpy = jest.spyOn(component, 'toggleCheckbox');
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]')).nativeElement;

    checkboxElement.click();
    fixture.detectChanges();

    expect(toggleCheckboxSpy).toHaveBeenCalled();
    expect(component.isChecked).toBeTrue();

    checkboxElement.click();
    fixture.detectChanges();

    expect(toggleCheckboxSpy).toHaveBeenCalled();
    expect(component.isChecked).toBeFalse();
  });

  it('should log "Checkbox toggled" with new state when toggled', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const checkboxElement = fixture.debugElement.query(By.css('[data-testid="todo-item-checkbox"]')).nativeElement;

    checkboxElement.click();
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', true);

    checkboxElement.click();
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Checkbox toggled:', false);

    consoleSpy.mockRestore();
  });
});