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
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the checkbox with the correct initial checked state', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    expect(checkboxElement.checked).toBe(true);

    component.isChecked = false;
    fixture.detectChanges();

    expect(checkboxElement.checked).toBe(false);
  });

  it('should call toggleCheckbox() and toggle isChecked on click', () => {
    component.isChecked = false;
    fixture.detectChanges();

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const checkboxElement = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    checkboxElement.click();
    fixture.detectChanges();

    expect(component.isChecked).toBe(true);
    expect(consoleLogSpy).toHaveBeenCalledWith('Checkbox toggled:', true);

    checkboxElement.click();
    fixture.detectChanges();

    expect(component.isChecked).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith('Checkbox toggled:', false);

    consoleLogSpy.mockRestore();
  });

  it('should have the `checked` property bound to the isChecked input', () => {
    component.isChecked = false;
    fixture.detectChanges();

    let checkboxElement = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    expect(checkboxElement.checked).toBe(false);

    component.isChecked = true;
    fixture.detectChanges();

    checkboxElement = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    expect(checkboxElement.checked).toBe(true);
  });
});